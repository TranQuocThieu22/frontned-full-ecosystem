import { IResource } from "@/shared/interfaces/resource/IResource";
import { IStandard } from "@/shared/interfaces/standard/Standard";
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useDisclosure, UseDisclosureReturnValue } from "@mantine/hooks";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { MRT_Row } from "mantine-react-table";
import { useEffect } from "react";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";

;

export default function ResourceTabCreateOrUpdate(
    {
        data,
        onClick,
        standardData
    }:
        {
            data?: MRT_Row<IResource>
            onClick: ({ childForm, disclosure, row }: {
                childForm: UseFormReturnType<IResource>,
                disclosure: UseDisclosureReturnValue,
                row?: MRT_Row<IResource>,
            }) => void,
            standardData?: IStandard[]
        }) {
    const SMDisclosure = useDisclosure(false);

    const ResourceTabForm = useForm<IResource>({
        initialValues: data?.original ?? {
            eaqStandardId: standardData?.at(0)?.id,
            activity: "",
            resourcesToMobilize: "",
            mobilizationTime: "",
            note: "",
        },
        validate: {
            eaqStandardId: (value) => value ? null : "Vui lòng chọn tiêu chuẩn",
            activity: (value) => value ? null : "Vui lòng điền nội dung hoạt động",
            resourcesToMobilize: (value) => value ? null : "Vui lòng điền nguồn lực cần huy động",
            mobilizationTime: (value) => value ? null : "Vui lòng điền thời điểm cần huy động",
        }
    });

    useEffect(() => {
        if (data && SMDisclosure[0]) {
            ResourceTabForm.setValues(data.original)
        } else if (data && !SMDisclosure[0]) {
            ResourceTabForm.reset();
            ResourceTabForm.clearErrors();
        }
    }, [data, SMDisclosure[0]])

    useEffect(() => {
        if (!data && SMDisclosure[0]) {
            const firstStandardId = standardData?.at(0)?.id;
            if (firstStandardId) {
                ResourceTabForm.setFieldValue("eaqStandardId", firstStandardId);
                ResourceTabForm.setFieldValue(
                    "eaqStandard",
                    standardData?.find(x => x.id === firstStandardId)
                );
            }
        }
    }, [SMDisclosure[0], data, standardData]);


    return (
        <CustomButtonModal
            modalProps={{ size: "80%", title: !!data ? "Chỉnh sửa dữ liệu" : "Thêm dữ liệu" }}
            isActionIcon={!!data}
            actionIconProps={{ children: <IconEdit color="orange" />, bg: "orange.1" }}
            buttonProps={{ children: "Thêm", leftSection: <IconPlus /> }}
            disclosure={SMDisclosure}
        >
            <SimpleGrid cols={2} spacing="md">
                <Stack>
                    <CustomSelect
                        searchable={true}
                        withAsterisk
                        data={standardData?.map(x => ({ value: x.id?.toString() ?? "", label: x.code + " - " + x.name })) || []}
                        label="Tiêu chuẩn:"
                        value={ResourceTabForm.getValues().eaqStandardId?.toString() ?? ""}
                        onChange={(value) => {
                            if (value) {
                                ResourceTabForm.setFieldValue("eaqStandardId", parseInt(value!));
                                ResourceTabForm.setFieldValue("eaqStandard", standardData?.find(x => x.id === parseInt(value!)));
                            }
                        }}
                        error={ResourceTabForm.errors.eaqStandardId}
                    />
                </Stack>
                <Stack>
                    <CustomTextInput
                        label="Thời điểm cần huy động:"
                        withAsterisk
                        {...ResourceTabForm.getInputProps("mobilizationTime")} />
                </Stack>
            </SimpleGrid>
            <CustomTextInput
                label="Hoạt động"
                withAsterisk
                {...ResourceTabForm.getInputProps("activity")} />
            <SimpleGrid cols={2} spacing="md">
                <Stack>
                    <CustomTextArea
                        label="Các nguồn lực cần huy động:"
                        withAsterisk

                        {...ResourceTabForm.getInputProps("resourcesToMobilize")} />
                </Stack>
                <Stack>
                    <CustomTextArea
                        label="Ghi chú:"
                        {...ResourceTabForm.getInputProps("note")} />
                </Stack>
            </SimpleGrid>

            <CustomButton
                actionType="save"
                onClick={() => onClick({
                    childForm: ResourceTabForm,
                    disclosure: SMDisclosure,
                    row: data
                })}
            />
        </CustomButtonModal>

    )
}
