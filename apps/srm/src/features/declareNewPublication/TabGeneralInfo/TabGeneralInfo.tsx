import { contractService } from "@/shared/APIs/contractService";
import { publicationService } from "@/shared/APIs/publicationService";
import { publicationTypeService } from "@/shared/APIs/publicationTypeService";
import { EnumlabelLangguage, EnumLangguage } from "@/shared/consts/enum/EnumLangguage";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { Grid, Stack } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface TabGeneralInfoProps {
    values?: SRMPublicationDeclaration;
    isUpdate?: boolean;
}

export interface TabGeneralInfoFormHandle {
    getValues: () => SRMPublicationDeclaration;
    validate: () => ReturnType<ReturnType<typeof useForm<SRMPublicationDeclaration>>['validate']>;
    resetForm: () => void;
    isDirty: () => boolean;
    setErrors: (errors: Record<string, string>) => void;
}

const TabGeneralInfo = forwardRef<TabGeneralInfoFormHandle, TabGeneralInfoProps>(
    ({ values, isUpdate }, ref) => {
        const store = useAcademicYearStore();

        const form = useForm<formValuesType<SRMPublicationDeclaration>>({
            mode: "uncontrolled",
            initialValues: values ?? {
                publicationYear: new Date().getFullYear(),
                language: 1,
            },
            validate: {
                code: (value) => (value ?? "").toString().trim() === "" ? "Mã công bố không được để trống" : null,
                name: (value) => (value ?? "").toString().trim() === "" ? "Tên công bố không được để trống" : null,
                srmPublicationTypeId: (value) => !value ? "Loại công bố không được để trống" : null,
                // FIXME: Nhóm công bố
                publicationYear: (value) => !value ? "Năm xuất bản không được để trống" : null,
            },
        });
        const [publicationId, setPublicationId] = useState<string>(form.getValues()?.srmPublicationType?.srmPublicationId?.toString() ?? "");

        useImperativeHandle(ref, () => {
            return {
                getValues: () => form.getValues(),
                validate: () => form.validate(),
                resetForm: () => form.reset(),
                isDirty: () => form.isDirty(),
                setErrors: (errors) => form.setErrors(errors),
            }
        });

        //Loại công bố
        const publicationTypeQuery = useCustomReactQuery({
            queryKey: ['publicationTypeQuery'],
            axiosFn: () => publicationTypeService.getAllIsActive(),
        });

        //Nhóm công bố
        const publicationQuery = useCustomReactQuery({
            queryKey: ['publicationQuery'],
            axiosFn: () => publicationService.getAll(),
        });

        //Đề tài liên quan
        const contractQuery = useCustomReactQuery({
            queryKey: ['contractQuery', store.state.academicYear?.id],
            axiosFn: () => contractService.GetAllByAcademicYear({ AcademicYearId: store.state.academicYear?.id || 0 })
        });

        // Set giá trị mặc định khi menuData load xong
        useEffect(() => {
            if (publicationQuery.data && !publicationId && publicationQuery.data.length > 0 && !isUpdate) {
                setPublicationId(publicationQuery.data[0]?.id?.toString() || "");
            }
        }, [publicationQuery.data, publicationId]);

        // Reset srmPublicationTypeId khi publicationId thay đổi
        useEffect(() => {
            if (publicationTypeQuery.data && publicationId) {
                const filteredData = publicationTypeQuery.data.filter(item => item.srmPublicationId === Number(publicationId));
                if (filteredData.length > 0) {
                    // Kiểm tra xem giá trị hiện tại có còn hợp lệ không
                    const currentValue = form.getValues()?.srmPublicationTypeId;
                    const isValid = filteredData.some(item => item.id === currentValue);

                    if (!isValid) {
                        // Nếu không hợp lệ, set về giá trị đầu tiên
                        form.setFieldValue("srmPublicationTypeId", filteredData[0]?.id);
                    }
                }
            }
        }, [publicationId, publicationTypeQuery.data, form]);

        return (
            <Stack pt={20}>
                <Grid pb={10} columns={12}>
                    <Grid.Col span={6}>
                        <CustomTextInput
                            withAsterisk
                            label="Mã công bố"
                            maxLength={200}
                            {...form.getInputProps("code")}
                            error={form.errors.code}
                            readOnly={isUpdate}
                        />
                        <CustomTextInput
                            withAsterisk
                            label="Tên công bố"
                            maxLength={1000}
                            {...form.getInputProps("name")}
                            error={form.errors.name}
                        />
                        <CustomSelect
                            withAsterisk
                            isLoading={publicationQuery.isLoading}
                            isError={publicationQuery.isError}
                            data={publicationQuery.data?.map(item => ({
                                label: item.code + " - " + item.name,
                                value: item.id?.toString()!
                            }))}
                            label={"Nhóm công bố"}
                            value={publicationId}
                            onChange={(value) => {
                                setPublicationId(value ?? "");
                                form.setFieldValue("srmPublicationTypeId", undefined);
                            }}
                        />
                        <CustomSelect
                            withAsterisk
                            isLoading={publicationTypeQuery.isLoading}
                            isError={publicationTypeQuery.isError}
                            {...form.getInputProps("srmPublicationTypeId")}
                            data={publicationTypeQuery.data?.filter(item => !publicationId || item.srmPublicationId === Number(publicationId))?.map(item => ({
                                label: item.code + " - " + item.name,
                                value: item.id?.toString()!
                            }))}
                            label={"Loại công bố"}
                            value={form.getValues()?.srmPublicationTypeId?.toString()}
                            error={form.errors.srmPublicationTypeId}
                            onChange={(value) => {
                                form.setFieldValue("srmPublicationTypeId", Number(value));
                            }}
                        />
                        <CustomTextInput
                            label="Đơn vị công tác của tác giả khi công bố"
                            {...form.getInputProps("affiliation")}
                            error={form.errors.affiliation}
                        />
                        <CustomSelect
                            isLoading={contractQuery.isLoading}
                            isError={contractQuery.isError}
                            {...form.getInputProps("srmContractId")}
                            data={contractQuery.data?.map(item => ({
                                label: item.code + " - " + item.name,
                                value: item.id?.toString()!
                            }))}
                            label={"Đề tài liên quan"}
                            value={form.getValues()?.srmContractId?.toString()}
                            error={form.errors.srmContractId}
                            onChange={(value) => {
                                form.setFieldValue("srmContractId", Number(value));
                            }}
                        />
                        <CustomTextArea
                            label="Tóm tắt (Abstract)"
                            pt={10}
                            minRows={5}
                            maxRows={5}
                            maxLength={3000}
                            {...form.getInputProps("abstract")}
                            error={form.errors.abstract}

                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <YearPickerInput
                            withAsterisk
                            placeholder="Chọn năm xuất bản"
                            label="Năm xuất bản"
                            valueFormat="YYYY"
                            locale="vi"
                            value={(typeof form.getValues()?.publicationYear === "number")
                                ? new Date(form.getValues()!.publicationYear as number, 0, 1)
                                : new Date()}
                            onChange={(value: any) => {
                                let pickedDate: Date | null = null;
                                if (value instanceof Date) {
                                    pickedDate = value;
                                } else if (typeof value === "string") {
                                    const parsed = new Date(value);
                                    pickedDate = isNaN(parsed.getTime()) ? null : parsed;
                                }
                                form.setFieldValue("publicationYear", pickedDate ? pickedDate.getFullYear() : undefined);
                            }}
                            error={form.errors.publicationYear}
                        />

                        {/* NOTE: Trích dẫn số trang: Chỉ hiển thị cho loại Bài báo. */}
                        <CustomTextInput
                            label="Trích dẫn số trang"
                            {...form.getInputProps("citation")}
                            error={form.errors.citation}
                        />
                        <CustomTextInput
                            label="Chỉ số trích dẫn (Scopus)"
                            {...form.getInputProps("citationIndex")}
                            error={form.errors.citationIndex}
                        />
                        <CustomTextInput
                            label="Liên kết toàn văn"
                            {...form.getInputProps("fullTextLink")}
                            error={form.errors.fullTextLink}
                        />
                        <CustomSelect
                            data={converterUtils.mapEnumToSelectData(EnumLangguage, EnumlabelLangguage)}
                            label={"Ngôn ngữ"}
                            value={form.getValues()?.language?.toString()}
                            error={form.errors.language}
                            onChange={(value) => {
                                form.setFieldValue("language", Number(value));
                            }}
                        />
                        <CustomFileInput
                            label="Đính kèm file"
                            pt={10}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            defaultValue={new File([], form.getValues()?.attachmentPath?.split("/").at(-1) || "")}
                            onChange={async (file) => {
                                if (!file) return;

                                const fileData = await fileUtils.fileToAQDocumentType(file);
                                form.setFieldValue(
                                    "attachmentDetail", fileData
                                );
                            }}
                            error={form.errors.attachmentDetail}
                        />
                    </Grid.Col>
                </Grid>
            </Stack>
        );
    }
);

TabGeneralInfo.displayName = "TabGeneralInfo";
export default TabGeneralInfo;