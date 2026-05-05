import { service_account } from "@/api/services/service_account";
import { service_studentActivityPlan } from "@/api/services/service_studentActivityPlan";
import { StudentActivityPlan } from "@/interfaces/StudentActivityPlan";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function SemesterStudentListUpdate({ values }: { values: StudentActivityPlan }) {
    const paginationState = useState({ pageIndex: 0, pageSize: 10 });
    const disc = useDisclosure()
    const form = useForm({
        initialValues: {
            ...values,
            facultyCode: values.user?.facultyCode || '',
            majorsCode: values.user?.majorsCode || '',
            classCode: values.user?.classCode || '',
        }
    })
    const activityPlanStore = useS_Shared_ActivityPlan()
    const [subLecturerId, setSubLecturerId] = useState<number | null>(values?.subLecturerId ?? null);

    const [advisorSearchInput, setAdvisorSearchInput] = useState("");

    const [debouncedAdvisorSearch] = useDebouncedValue(advisorSearchInput.length >= 2 ? advisorSearchInput : "", 800);

    const Q_AdminAccount = useCustomReactQuery({
        queryKey: ["Q_AdminAccount_Update", debouncedAdvisorSearch],
        axiosFn: () => service_account.getAdminAccount({
            paging: {
                pageNumber: paginationState[0].pageIndex + 1,
                pageSize: paginationState[0].pageSize
            },
            name: debouncedAdvisorSearch || undefined
        }),
        options: {
            enabled: disc[0],
            staleTime: 2 * 60 * 1000,
            refetchOnWindowFocus: false,
        }
    })
    return (
        <CustomButtonCreateUpdate
            isUpdate
            disclosure={disc}
            modalProps={{
                size: '60%'
            }}
            form={form}
            onSubmit={async () => {
                const res = await service_studentActivityPlan.update({
                    ...values,
                    activityPlanId: activityPlanStore.state.ActivityPlan?.id,
                    subLecturerId: subLecturerId ?? undefined,
                })
                setAdvisorSearchInput("")
                disc[1].close()
                return res
            }}
        >
            <Grid columns={12}>
                <Grid.Col span={6}>
                    <CustomTextInput
                        label="Mã sinh viên"
                        value={values?.user?.code ?? ''}
                        disabled
                    />
                    <CustomTextInput
                        label="Họ tên"
                        value={values?.user?.fullName ?? ''}
                        disabled
                    />
                    <CustomTextInput
                        label="Trạng thái"
                        disabled
                    // value={user?.isEnabled ? 'Hoạt động' : 'Không hoạt động'}
                    />
                    <CustomTextInput
                        label="Tên lớp"
                        disabled
                        value={values?.user?.className ?? ''}
                    />
                    <CustomTextInput
                        label="Tên ngành"
                        disabled
                        value={values?.user?.majorsName ?? ''}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <CustomDateInput
                        disabled
                        label="Ngày sinh"
                        value={values?.user?.dateOfBirth ?? ''}
                    />
                    <CustomSelect
                        label="Giới tính"
                        disabled
                        value={values?.user?.gender?.toString() ?? ''}
                        data={[{ label: 'Nam', value: '0' }, { label: 'Nữ', value: '1' }]}
                    />
                    <CustomSelect
                        label="Mã cố vấn học tập"
                        searchable
                        searchValue={advisorSearchInput}
                        onSearchChange={(value) => {
                            setAdvisorSearchInput(value);
                            // Only clear selection if input is completely cleared
                            if (value === '') {
                                setSubLecturerId(null);
                            }
                        }}
                        data={Q_AdminAccount.data?.map((item) => ({
                            label: `${item.code} - ${item.fullName}`,
                            value: item.id?.toString() ?? ''
                        })) || []}
                        value={subLecturerId?.toString() ?? null}
                        onChange={(value) => {
                            if (value) {
                                const foundLecturer = Q_AdminAccount.data?.find((item) => item.id?.toString() === value);
                                if (foundLecturer) {
                                    setSubLecturerId(foundLecturer.id ?? null);
                                    setAdvisorSearchInput(foundLecturer.code ?? '');
                                }
                            } else {
                                setSubLecturerId(null);
                                setAdvisorSearchInput('');
                            }
                        }}
                        placeholder="Nhập ít nhất 2 ký tự để tìm kiếm..."
                        nothingFoundMessage={advisorSearchInput.length > 0 && advisorSearchInput.length < 2 ?
                            "Nhập ít nhất 2 ký tự để tìm kiếm" :
                            Q_AdminAccount.isLoading ? "Đang tìm kiếm..." : "Không tìm thấy kết quả"
                        }
                        limit={20}
                        clearable
                    />
                    <CustomTextInput
                        label="Mã khoa"
                        disabled
                        value={values?.user?.facultyCode ?? ''}
                    />
                </Grid.Col>
            </Grid>
        </CustomButtonCreateUpdate>
    );
}
