"use client"
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { ActionIcon, Checkbox, Fieldset, Flex, Group, NumberInput, Radio, Stack, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyDataTable, MyFlexRow } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_05tb8fc3wi_CreateInSide from "./F_05tb8fc3wi_CreateInSide";

interface IDiscountCombo {
    id?: number
    comboName?: string,
    startDate?: string,
    expireDate?: string,
    comboType?: string,
    buyAmount: number,
    discountAmount: number,
    applyingCourseIds: number[],
    isEnded?: boolean
}

interface ICourse {
    id?: number
    courseCode?: string,
    courseName?: string,
    startDate?: string,
}

export default function F_05tb8fc3wi_UpdateActionIcon({ comboValues }: { comboValues: IDiscountCombo }) {
    const form = useForm<IDiscountCombo>({
        initialValues: {
            ...comboValues
        },

    });

    const AllCoursesQuery = useQuery<ICourse[]>({
        queryKey: [`F_05tb8fc3wi_UpdateActionIcon`],
        queryFn: async () => {
            return [
                {
                    id: 1,
                    courseCode: "TACB1",
                    courseName: "Tiếng Anh căn bản 1",
                    startDate: "2025-02-25",
                },
                {
                    id: 2,
                    courseCode: "TACB2",
                    courseName: "Tiếng Anh căn bản 2",
                    startDate: "2025-04-25",
                },
                {
                    id: 3,
                    courseCode: "TACB3",
                    courseName: "Tiếng Anh căn bản 3",
                    startDate: "2025-06-25",
                }
            ]
        }
    })

    const courseColumn = useMemo<MRT_ColumnDef<ICourse>[]>(() => [
        {
            accessorKey: "courseCode",
            header: "Mã khóa học",
        },
        {
            accessorKey: "courseName",
            header: "Tên khóa học",
        },
        {
            header: "Ngày khai giảng",
            accessorKey: "startDate",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.startDate!))
        }
    ], [])

    return (
        <>
            <MyActionIconUpdate
                modalSize="100%"
                onSubmit={() => { }}
                form={form}
            >
                <MyTextInput withAsterisk label="Tên combo khuyến mãi" {...form.getInputProps("comboName")} />
                <Checkbox label="Kết thúc" {...form.getInputProps("isEnded")} />
                <DateInput label="Ngày bắt đầu" {...form.getInputProps("startDate")} />
                <DateInput label="Ngày kết thúc" {...form.getInputProps("expireDate")} />
                <Radio.Group
                    value={form.values.comboType}
                    onChange={(value) => {
                        form.setFieldValue("comboType", value as "Giảm giá theo %" | "Giảm giá theo số tiền" | "Giảm giá đặc biệt");
                        form.setFieldValue("discountAmount", 0);
                    }}
                >
                    <Stack>
                        <Radio value="Giảm giá theo %" label="Giảm giá theo %" />
                        {form.values.comboType === "Giảm giá theo %" && (
                            <Fieldset legend="Mức ưu đãi">
                                <Flex align="center" direction="row" gap="xs">
                                    <Text>
                                        Mua
                                    </Text>
                                    <NumberInput
                                        {...form.getInputProps("buyAmount")}
                                        min={0}
                                        allowDecimal={false}
                                    />
                                    <Text>
                                        sản phẩm để được giảm
                                    </Text>
                                    <NumberInput
                                        {...form.getInputProps("discountAmount")}
                                        min={0}
                                        max={100}
                                    />
                                    <Text>
                                        % tổng tiền
                                    </Text>
                                </Flex>
                            </Fieldset>
                        )}
                        <Radio value="Giảm giá theo số tiền" label="Giảm giá theo số tiền" />
                        {form.values.comboType === "Giảm giá theo số tiền" && (
                            <Fieldset legend="Mức ưu đãi">
                                <Flex align="center" direction="row" gap="xs">
                                    <Text>
                                        Mua
                                    </Text>
                                    <NumberInput
                                        {...form.getInputProps("buyAmount")}
                                        min={0}
                                        allowDecimal={false}
                                    />
                                    <Text>
                                        sản phẩm để được giảm
                                    </Text>
                                    <NumberInput
                                        {...form.getInputProps("discountAmount")}
                                        min={0}
                                    />
                                    <Text>
                                        đ
                                    </Text>
                                </Flex>
                            </Fieldset>
                        )}
                        <Radio value="Giảm giá đặc biệt" label="Giảm giá đặc biệt" />
                        {form.values.comboType === "Giảm giá đặc biệt" && (
                            <Fieldset legend="Mức ưu đãi">
                                <Flex align="center" direction="row" gap="xs">
                                    <Text>
                                        Mua
                                    </Text>
                                    <NumberInput
                                        {...form.getInputProps("buyAmount")}
                                        min={0}
                                        allowDecimal={false}
                                    />
                                    <Text>
                                        sản phẩm chỉ với giá
                                    </Text>
                                    <NumberInput
                                        {...form.getInputProps("discountAmount")}
                                        min={0}
                                    />
                                    <Text>
                                        đ
                                    </Text>
                                </Flex>
                            </Fieldset>
                        )}
                    </Stack>
                </Radio.Group>
                <MyFieldset title={"Danh sách khóa học của combo khuyến mãi"}>
                    {AllCoursesQuery.isLoading ? "Đang tải dữ liệu..." :
                        <MyDataTable columns={courseColumn} data={AllCoursesQuery.data || []}
                            enableRowSelection={true}
                            renderTopToolbarCustomActions={({ table }) =>
                                <Group>
                                    <F_05tb8fc3wi_CreateInSide />
                                    <MyButton crudType="delete">Xóa</MyButton>
                                </Group>
                            }
                            renderRowActions={({ row, table }) =>
                                <MyFlexRow>
                                    <ActionIcon color="yellow"><IconEdit /></ActionIcon>
                                    <ActionIcon color="red"><IconTrash /></ActionIcon>
                                </MyFlexRow>
                            }
                        />
                    }
                </MyFieldset>
            </MyActionIconUpdate>
        </>
    )

}