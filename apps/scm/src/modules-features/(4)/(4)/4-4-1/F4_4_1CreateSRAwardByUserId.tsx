import MyFlexEnd from "@/components/Layouts/FlexEnd/MyFlexEnd";
import { U0MyValidateEmpty } from "@/utils/validateForm";
import { Button, Divider, FileInput, Group, Paper, Select, SelectProps, Space, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";

interface IUserInfoViewModel {
    id: number,
    code?: string,
    fullName?: string,
    highestDegree?: string,
    highestScientificTitle?: string,
    workingPlace?: string
}

interface ICreateSRAwardInput {
    userId?: number,
    awardCategory?: string,
    awardContent?: string,
    evidenceFile?: File
}

const mockData: IUserInfoViewModel = {
    id: 1,
    code: "GV001",
    fullName: "Nguyen Van A",
    highestDegree: "PhD",
    highestScientificTitle: "Associate Professor",
    workingPlace: "University of Science"
}

export default function F4_4_1CreateSRAwardByUserId(
    { userId }: { userId: number }
) {
    const progression = useQuery<IUserInfoViewModel>({
        queryKey: [`F4_4_1UserInfo`],
        queryFn: async () =>
            // (await baseAxios.get("userNCKHs?isExternal=false"))
            mockData
    })

    const form = useForm<ICreateSRAwardInput>({
        initialValues: {
            userId: userId,
            awardCategory: "",
            awardContent: "",
            evidenceFile: undefined
        },
        validate: {
            awardCategory: U0MyValidateEmpty(),
            awardContent: U0MyValidateEmpty(),
            evidenceFile: U0MyValidateEmpty()
        },
    });

    if (progression.isLoading) return "Đang tải dữ liệu..."
    if (progression.isError) return "Không có dữ liệu..."

    return (
        <>
            <form onSubmit={form.onSubmit((values) => {
                // todo

            })}>
                <Paper p={"md"}>
                    <Group>
                        <Text fw={700}>Đăng ký khen thưởng</Text>
                    </Group>
                    <Divider />
                    <Space mb={"30"} />
                    <Group>
                        <Group>
                            <Text><strong>Mã giảng viên:&nbsp;&nbsp;</strong>{progression.data?.code}</Text>
                        </Group>
                        <Space mr={"md"} />
                        <Group>
                            <Text ><strong>Họ tên giảng viên:&nbsp;&nbsp;</strong>{progression.data?.fullName}</Text>
                        </Group>
                        <Space mr={"md"} />
                        <Group>
                            <Text><strong>Học hàm/ Học vị:&nbsp;&nbsp;</strong>{progression.data?.highestDegree} - {progression.data?.highestScientificTitle}</Text>
                        </Group>
                        <Space mr={"md"} />
                        <Group>
                            <Text><strong>Đơn vị công tác:&nbsp;&nbsp;</strong>{progression.data?.workingPlace}</Text>
                        </Group>
                    </Group>
                    <Space mt={"md"} />
                    <SelectAwardCatergory
                        w={{ md: "50%" }}
                        searchable
                        clearable
                        {...form.getInputProps("awardCategory")}
                    />
                    <Space mt={"md"} />
                    <Textarea
                        autosize
                        minRows={5}
                        label="Nội dung khen thưởng"
                        placeholder="Nhập nội dung khen thưởng"
                        {...form.getInputProps("awardContent")}
                    />
                    <Space mt={"md"} />
                    <FileInput
                        w={{ md: "50%" }}
                        clearable
                        label="Đính kèm File minh chứng"
                        placeholder="Chọn file minh chứng" />
                    <Space mt={"40"} />
                    <MyFlexEnd
                    // w={'80%'}
                    >
                        <Button
                            size="md"
                            type="submit">
                            <Text fw={700}>Đăng ký</Text>
                        </Button>
                    </MyFlexEnd>
                </Paper>
            </form>
        </>
    )
}


interface ISelectComponent extends SelectProps { }

function SelectAwardCatergory({ ...rest }: ISelectComponent) {

    const awardCategoryOptions = [
        {
            id: 1,
            code: "ac1",
            value: "1",
            label: "Sáng chế được cục sở hữu trí tuệ cấp bằng"
        },
        {
            id: 2,
            code: "ac2",
            value: "2",
            label: "Sáng chế được nhà nước cấp bằng"
        }
    ]

    return (
        <Select
            label="Hạng mục đề nghị khen thưởng"
            placeholder="Chọn hạng mục khen thưởng"
            data={awardCategoryOptions.map((item) => {
                const data = {
                    value: item?.id.toString()!,
                    // label: `${item?.code} - ${item?.value}`,
                    label: item?.label,
                };
                return data;
            })}
            {...rest}
        />
    );
}