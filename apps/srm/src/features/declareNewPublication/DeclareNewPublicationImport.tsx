import { publicationDeclarationService } from "@/shared/APIs/publicationDeclarationService";
import { publicationTypeService } from "@/shared/APIs/publicationTypeService";
import { EnumlabelLangguage, EnumLangguage } from "@/shared/consts/enum/EnumLangguage";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Workbook } from "exceljs";


const config: IExcelColumnConfig<SRMPublicationDeclaration>[] = [
    // Tab 1: Thông tin chung (TabGeneralInfo)
    // Cột trái
    {
        fieldName: "Mã công bố",
        fieldKey: "code",
        isRequired: true,
    },
    {
        fieldName: "Tên công bố",
        fieldKey: "name",
        isRequired: true,
    },
    {
        fieldName: "Mã loại công bố",
        fieldKey: "srmPublicationTypeId",
        isRequired: true,
    },
    {
        fieldName: "Đơn vị công tác của tác giả khi công bố",
        fieldKey: "affiliation",
    },
    {
        fieldName: "Tóm tắt (Abstract)",
        fieldKey: "abstract",
    },
    // Cột phải
    {
        fieldName: "Năm xuất bản(YYYY)",
        fieldKey: "publicationYear",
        isRequired: true,
    },
    {
        fieldName: "Trích dẫn số trang",
        fieldKey: "citation",
    },
    {
        fieldName: "Chỉ số trích dẫn (Scopus)",
        fieldKey: "citationIndex",
    },
    {
        fieldName: "Liên kết toàn văn",
        fieldKey: "fullTextLink",
    },
    {
        fieldName: "Ngôn ngữ",
        fieldKey: "language",
    },

    // // Tab 2: Tạp chí/Hội thảo/NXB (TabPublicationVenue)
    // {
    //     fieldName: "Tạp chí/ Nhà xuất bản",
    //     fieldKey: "journal",
    // },
    // {
    //     fieldName: "ISN/ISBN",
    //     fieldKey: "issn",
    // },
    // {
    //     fieldName: "Cơ sở dữ liệu chỉ mục",
    //     fieldKey: "databaseIndex",
    // },
    // {
    //     fieldName: "Chỉ số tác động (Impact Factor)",
    //     fieldKey: "impactFactor",
    // },

    // // Tab 3: Bằng sáng chế (TabPatent)
    // {
    //     fieldName: "Số bằng độc quyền",
    //     fieldKey: "patentNumber",
    // },
    // {
    //     fieldName: "Ngày cấp bằng",
    //     fieldKey: "grantDate",
    // },
    // {
    //     fieldName: "Đơn vị cấp bằng",
    //     fieldKey: "issuingAuthority",
    // },
    // {
    //     fieldName: "Phạm vi bảo hộ",
    //     fieldKey: "protectionScope",
    // },

    // // Tab 4: Sách/Giáo trình (TabBookPublication)
    // {
    //     fieldName: "Tổng số trang",
    //     fieldKey: "totalPage",
    // },
    // {
    //     fieldName: "Tổng số chương",
    //     fieldKey: "totalChapter",
    // },
    // {
    //     fieldName: "Phiên bản/ Lần xuất bản",
    //     fieldKey: "version",
    // },
]

const config2: IExcelColumnConfig<{ value: string, label: string }>[] = [
    {
        fieldName: "Mã ngôn ngữ",
        fieldKey: "value",
    },
    {
        fieldName: "Tên ngôn ngữ",
        fieldKey: "label",
    }
]

const config3: IExcelColumnConfig<{ value: string, label: string }>[] = [
    {
        fieldName: "Mã loại công bố",
        fieldKey: "value",
    },
    {
        fieldName: "Tên loại công bố",
        fieldKey: "label",
    }
]


export default function DeclareNewPublicationImport() {
    const stack = useModalsStack<ModalImportId>([])
    const store = useAcademicYearStore();

    //Loại công bố
    const publicationTypeQuery = useCustomReactQuery({
        queryKey: ['publicationTypeQuery'],
        axiosFn: () => publicationTypeService.getAllIsActive(),
    });

    const importMutation = useCustomReactMutation({
        axiosFn: (body: SRMPublicationDeclaration[]) =>
            publicationDeclarationService.createOrUpdateList(body),
        mutationType: "import",
    });

    const validateRequiredFields = (data: any[]) => {
        const requiredFields = config.filter(field => field.isRequired);
        const errors: string[] = [];

        data.forEach((item, index) => {
            requiredFields.forEach(field => {
                const value = item[field.fieldKey];
                if (!value || (typeof value === 'string' && value.trim() === '')) {
                    errors.push(`Dòng ${index + 1}: Trường "${field.fieldName}" là bắt buộc`);
                }
            });
        });

        return errors;
    };

    const handleExport = async () => {
        const workbook = new Workbook()
        await excelUtils.addSheet({ workbook, config: config, sheetName: "Danh sách kê khai công bố", data: [] })
        await excelUtils.addSheet({
            workbook, config: config2,
            sheetName: "Danh sách ngôn ngữ",
            data: converterUtils.mapEnumToSelectData(EnumLangguage, EnumlabelLangguage),
        })
        await excelUtils.addSheet({
            workbook, config: config3,
            sheetName: "Danh sách loại công bố",
            data: publicationTypeQuery.data?.map(item => ({
                value: item.id?.toString() ?? "",
                label: item.name ?? "",
            })) || [],
        })
        await excelUtils.download({ workbook: workbook, name: "Danh_sach_ke_khai_cong_bo" })
    }
    return (
        <>
            <MyModalImport
                fieldDefinition={config.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                }))}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={(finalValues: any[]) => {
                    // Validate required fields
                    const validationErrors = validateRequiredFields(finalValues);

                    if (validationErrors.length > 0) {
                        // Show error notification
                        notifications.show({
                            title: 'Thông tin không hợp lệ',
                            message: (
                                <div>
                                    <p>Vui lòng kiểm tra lại dữ liệu:</p>
                                    <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                                        {validationErrors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            ),
                            color: 'red',
                            autoClose: 10000,
                        });
                        return;
                    }

                    const values = finalValues.map(item => ({
                        ...item,
                        academicYearId: store.state.academicYear?.id,
                    }));
                    importMutation.mutate(values, {
                        onSuccess: () => {
                            stack.closeAll();
                        },
                    });
                }}
            />
            <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
        </>
    );
}