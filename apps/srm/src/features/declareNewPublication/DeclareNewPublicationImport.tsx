"use client";

import { contractService } from "@/shared/APIs/contractService";
import { publicationDeclarationService } from "@/shared/APIs/publicationDeclarationService";
import { publicationService } from "@/shared/APIs/publicationService";
import { publicationTypeService } from "@/shared/APIs/publicationTypeService";
import { EnumlabelLangguage, EnumLangguage } from "@/shared/consts/enum/EnumLangguage";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { notifications } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { Workbook } from "exceljs";

type ImportRow = SRMPublicationDeclaration & {
    srmPublicationTypeCode?: string;
    publicationCode?: string;
    srmContractCode?: string;
};

const fields: FieldOption<ImportRow>[] = [
    { fieldKey: "code", fieldName: "Mã công bố", isRequired: true },
    { fieldKey: "name", fieldName: "Tên công bố", isRequired: true },
    { fieldKey: "publicationCode", fieldName: "Mã nhóm công bố" },
    { fieldKey: "srmPublicationTypeCode", fieldName: "Mã loại công bố", isRequired: true },
    { fieldKey: "srmContractCode", fieldName: "Mã đề tài liên quan" },
    { fieldKey: "affiliation", fieldName: "Đơn vị công tác của tác giả khi công bố" },
    { fieldKey: "abstract", fieldName: "Tóm tắt (Abstract)" },
    { fieldKey: "publicationYear", fieldName: "Năm xuất bản(YYYY)", isRequired: true, parseType: "number" },
    { fieldKey: "citation", fieldName: "Trích dẫn số trang" },
    { fieldKey: "citationIndex", fieldName: "Chỉ số trích dẫn (Scopus)" },
    { fieldKey: "fullTextLink", fieldName: "Liên kết toàn văn" },
    { fieldKey: "language", fieldName: "Ngôn ngữ" },
];

const config2: IExcelColumnConfig<{ value: string; label: string }>[] = [
    { fieldName: "Mã ngôn ngữ", fieldKey: "value" },
    { fieldName: "Tên ngôn ngữ", fieldKey: "label" },
];

function validateRequiredFields(data: any[], requiredKeys: string[], fieldNames: Record<string, string>): string[] {
    const errors: string[] = [];
    data.forEach((item, index) => {
        requiredKeys.forEach((key) => {
            const value = item[key];
            if (!value || (typeof value === "string" && value.trim() === "")) {
                errors.push(`Dòng ${index + 1}: Trường "${fieldNames[key] ?? key}" là bắt buộc`);
            }
        });
    });
    return errors;
}

export default function DeclareNewPublicationImport() {
    const store = useAcademicYearStore();

    return (
        <CustomButtonImport<ImportRow>
            fields={fields}
            fileName="Danh_sach_ke_khai_cong_bo"
            onPrepareWorkbook={async (workbook: Workbook) => {
                excelUtils.addSheet({
                    workbook,
                    config: config2,
                    sheetName: "Danh sách ngôn ngữ",
                    data: converterUtils.mapEnumToSelectData(EnumLangguage, EnumlabelLangguage),
                });
            }}
            onSubmit={async (finalValues): Promise<AxiosResponse<CustomApiResponse<ImportRow[]>>> => {
                const requiredKeys = ["code", "name", "srmPublicationTypeCode", "publicationYear"];
                const fieldNames: Record<string, string> = {
                    code: "Mã công bố",
                    name: "Tên công bố",
                    srmPublicationTypeCode: "Mã loại công bố",
                    publicationYear: "Năm xuất bản(YYYY)",
                };

                const validationErrors = validateRequiredFields(finalValues ?? [], requiredKeys, fieldNames);
                if (validationErrors.length > 0) {
                    notifications.show({
                        title: "Thông tin không hợp lệ",
                        message: `Vui lòng kiểm tra lại dữ liệu: ${validationErrors.join("; ")}`,
                        color: "red",
                        autoClose: 10000,
                    });
                    throw new Error(validationErrors.join("; "));
                }

                const [typeRes, publicationRes, contractRes] = await Promise.all([
                    publicationTypeService.getAllIsActive(),
                    publicationService.getAll(),
                    contractService.GetAllByAcademicYear({ AcademicYearId: store.state.academicYear?.id ?? 0 }),
                ]);

                const typeList = typeRes.data.data ?? [];
                const publicationList = publicationRes.data.data ?? [];
                const contractList = contractRes.data.data ?? [];

                const typeByCode = new Map<string, any>(
                    typeList.map((t: any) => [String(t.code ?? "").trim(), t]),
                );
                const publicationByCode = new Map<string, any>(
                    publicationList.map((p: any) => [String(p.code ?? "").trim(), p]),
                );
                const contractByCode = new Map<string, any>(
                    contractList.map((c: any) => [String(c.code ?? "").trim(), c]),
                );

                const errors: string[] = [];
                const mapped: SRMPublicationDeclaration[] = [];

                (finalValues ?? []).forEach((row, idx) => {
                    const rowIndex = idx + 1;

                    let srmPublicationTypeId: number | undefined;
                    if (row.srmPublicationTypeCode) {
                        const type = typeByCode.get(String(row.srmPublicationTypeCode).trim());
                        if (!type) {
                            errors.push(
                                `Dòng ${rowIndex}: Không tìm thấy Mã loại công bố "${row.srmPublicationTypeCode}"`,
                            );
                        } else {
                            srmPublicationTypeId = type.id;

                            if (row.publicationCode) {
                                const pub = publicationByCode.get(String(row.publicationCode).trim());
                                if (!pub) {
                                    errors.push(
                                        `Dòng ${rowIndex}: Không tìm thấy Nhóm công bố "${row.publicationCode}"`,
                                    );
                                } else if (type.srmPublicationId !== pub.id) {
                                    errors.push(
                                        `Dòng ${rowIndex}: Mã loại công bố "${row.srmPublicationTypeCode}" không thuộc Nhóm công bố "${row.publicationCode}"`,
                                    );
                                }
                            }
                        }
                    }

                    let srmContractId: number | undefined;
                    if (row.srmContractCode) {
                        const contract = contractByCode.get(String(row.srmContractCode).trim());
                        if (!contract) {
                            errors.push(
                                `Dòng ${rowIndex}: Không tìm thấy Đề tài liên quan "${row.srmContractCode}"`,
                            );
                        } else {
                            srmContractId = contract.id;
                        }
                    }

                    mapped.push({
                        ...row,
                        srmPublicationTypeId,
                        srmContractId,
                        academicYearId: store.state.academicYear?.id,
                    });
                });

                if (errors.length > 0) {
                    throw new Error(errors.join("\n"));
                }

                const response = await publicationDeclarationService.createList(mapped) as AxiosResponse<
                    CustomApiResponse<ImportRow[]>
                >;

                return response;
            }}
        />
    );
}
