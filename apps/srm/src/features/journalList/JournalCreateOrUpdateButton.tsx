
import { journalService } from "@/shared/APIs/journalService";
import { publicationTypeService } from "@/shared/APIs/publicationTypeService";
import { EnumJournalType, EnumLabelJournalType } from "@/shared/consts/enum/EnumJournalType";
import { SRMJournal } from "@/shared/interfaces/SRMJournal";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo } from "react";

interface Props {
    data?: SRMJournal
    loading?: boolean
}

export function JournalCreateOrUpdateButton({ data, loading }: Props) {
    const disc = useDisclosure();

    const form = useForm<SRMJournal>({
        mode: "uncontrolled",
        initialValues: data ? data
            : {
                note: "",
                type: EnumJournalType.Journal,
                isbn: "",
                srmPublicationTypeId: undefined,
            },
        validate: {
            code: (value) => (value?.trim() ? null : "Không được để trống"),
            name: (value) => (value?.trim() ? null : "Không được để trống"),
            srmPublicationTypeId: (value) => (value ? null : "Không được để trống"),
            type: (value) => (value ? null : "Không được để trống"),
        }
    });

    const publicationTypeQuery = useCustomReactQuery({
        queryKey: ["publication_type_list"],
        axiosFn: () => publicationTypeService.getAllIsActive(),
        options: {
            enabled: disc[0],
            refetchOnWindowFocus: false
        }
    });

    const publicationTypeOption = useMemo(() => {
        if (!data) {
            const dataFirst = publicationTypeQuery?.data?.[0];
            form.setFieldValue("srmPublicationTypeId", dataFirst?.id ? Number(dataFirst?.id) : undefined);
        }
        return publicationTypeQuery.data?.map((item) => ({
            label: `${item.code}-${item.name}`,
            value: String(item.id)
        })) || []
    }, [publicationTypeQuery.data])

    const handleSubmit = () => {
        if (data) {
            return journalService.update(form.getValues());
        }
        return journalService.create(form.getValues());
    }

    useEffect(() => {
        if (!data || !disc[0]) return;
        form.setValues(data);
    }, [data, disc[0]])

    return (
        <CustomButtonCreateUpdate
            disclosure={disc}
            isUpdate={!!data}
            modalProps={{
                size: "50%",
            }}
            actionIconProps={{
                loading: loading
            }}
            form={form}
            onSubmit={() => handleSubmit()}
        >
            <SimpleGrid cols={2}>
                <CustomTextInput
                    readOnly={!!data}
                    label="Mã danh mục"
                    {...form.getInputProps("code")}
                    withAsterisk
                />
                <CustomTextInput
                    label="Chỉ số ISBN/ISSN"
                    {...form.getInputProps("isbn")}
                />
                <CustomSelect
                    withAsterisk
                    label="Mã loại công bố"
                    data={publicationTypeOption}
                    key={String(form.getValues().srmPublicationTypeId)}
                    defaultValue={String(form.getValues().srmPublicationTypeId)}
                    onChange={(value) => {
                        form.setFieldValue("srmPublicationTypeId", Number(value))
                    }}
                    error={form.errors.srmPublicationTypeId}
                />

                <CustomSelect
                    withAsterisk
                    label="Loại danh mục"
                    data={converterUtils.mapEnumToSelectData(EnumJournalType, EnumLabelJournalType)}
                    defaultValue={String(form.getValues().type)}
                    onChange={(value) => {
                        form.setFieldValue("type", Number(value))
                    }}
                    error={form.errors.type}
                />
            </SimpleGrid>
            <CustomTextInput
                label="Tên"
                {...form.getInputProps("name")}
                withAsterisk
            />

            <CustomTextArea
                label="Ghi chú"
                {...form.getInputProps("note")}
            />

        </CustomButtonCreateUpdate>
    );
}