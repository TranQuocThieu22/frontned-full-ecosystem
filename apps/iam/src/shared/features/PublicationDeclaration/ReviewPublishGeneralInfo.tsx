import { EnumLabelLanguage, EnumLanguage } from "@/shared/consts/enum/EnumLanguage";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { SimpleGrid, Stack, Text } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";


export default function ReviewPublishGeneralInfo({ data }: { data?: SRMPublicationDeclaration }) {
    // const store = useShared_AcademicYear();

    // const contractQuery = useMyReactQuery({
    //     queryKey: ['contract', store.state.AcademicYear?.id],
    //     axiosFn: () => service_Contract.GetAllByAcademicYear({
    //         AcademicYearId: store.state.AcademicYear?.id || -1
    //     }) ,
    //     options: {
    //         enabled: Boolean(store.state.AcademicYear?.id),
    //     }
    // })

    // const publicationQuery = useMyReactQuery({
    //     queryKey: ['publicationGroup', store.state.AcademicYear?.id],
    //     axiosFn: () => service_PublicationType.getSRMPublicationTypeBySRMPublicationId({
    //         SRMPublicationId: form.values.srmPublicationTypeId
    //     }) ,
    //     options: {
    //         enabled:  !!form.values.srmPublicationTypeId,
    //     }
    // })
    const publicationGroup = data?.srmPublicationType?.srmPublication ? String((data?.srmPublicationType?.srmPublication?.code ?? "") + " - " + String((data?.srmPublicationType?.srmPublication?.name ?? ""))) : "";
    const publicationType = data?.srmPublicationType ? String((data?.srmPublicationType?.code ?? "") + " - " + String((data?.srmPublicationType?.name ?? ""))) : "";
    const affiliationUnit = data?.srmContract ? String((data?.srmContract?.code ?? "") + " - " + String((data?.srmContract?.name ?? ""))) : "";


    return (
        <Stack>
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <Stack>
                    <CustomTextInput label="Mã công bố" readOnly value={data?.code || ""} />
                    <CustomTextInput label="Tên công bố" readOnly value={data?.name || ""} />
                    <CustomSelect
                        label="Nhóm công bố"
                        data={[publicationGroup]}
                        value={publicationGroup}
                        readOnly />
                    <CustomSelect
                        label="Loại công bố"
                        data={[publicationType]}
                        value={publicationType}
                        readOnly />
                    <CustomTextInput label="Đơn vị công tác của tác giả khi công bố" readOnly value={data?.affiliation || ""} />
                    <CustomSelect
                        label="Đề tài liên quan"
                        data={[affiliationUnit]}
                        value={affiliationUnit}
                        readOnly />
                </Stack>

                <Stack>
                    <YearPickerInput label="Năm xuất bản" readOnly value={dateUtils.toDDMMYYYY(new Date(String(data?.publicationYear || "2000") + "-01-01"))} />
                    <CustomTextInput label="Trích dẫn số trang" readOnly value={data?.citation || ""} />
                    <CustomTextInput label="Chỉ số trích dẫn (Scopus)" readOnly value={data?.citationIndex || ""} />
                    <CustomTextInput label="Liên kết toàn văn" readOnly value={data?.fullTextLink || ""} />
                    <CustomSelect label="Ngôn ngữ" data={converterUtils.mapEnumToSelectData(EnumLanguage, EnumLabelLanguage)} readOnly value={String(data?.language || "")} />
                    <Stack gap={0}>
                        <Text fw={500} fz={14} pb={2}>Xem file</Text>
                        <CustomButtonViewFileAPI filePath={data?.attachmentPath || ""} />
                    </Stack>
                </Stack>
            </SimpleGrid>
            <CustomTextArea label="Tóm tắt (Abstract)" readOnly value={data?.abstract || ""} />
        </Stack>
    )
}
