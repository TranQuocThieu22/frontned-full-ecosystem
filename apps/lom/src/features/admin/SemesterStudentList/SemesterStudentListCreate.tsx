import { service_account } from "@/api/services/service_account";
import { service_studentActivityPlan } from "@/api/services/service_studentActivityPlan";
import { StudentList } from "@/interfaces/shared-interfaces/StudentList";
import useS_Shared_ActivityPlan from "@/shared/ActivityPlan/useS_Shared_ActivityPlan";
import { MyButtonCreate } from "@aq-fe/core-ui/shared/components/button/MyButtonCreate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { Grid, GridCol } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

export default function SemesterStudentListCreate() {
    const disc = useDisclosure()
    const form = useForm<StudentList>({
        validate: {
            code: (value) => value === '' ? 'Mã sinh viên không được để trống' : null,
            // fullName: (value) => value === '' ? 'Họ tên không được để trống' : null,
            // classCode: (value) => value === '' ? 'Mã lớp không được để trống' : null,
            // majorsCode: (value) => value === '' ? 'Mã ngành không được để trống' : null,
            // facultyCode: (value) => value === '' ? 'Mã khoa không được để trống' : null,
        }
    })

    const activityPlanStore = useS_Shared_ActivityPlan()
    const paginationState = useState({ pageIndex: 0, pageSize: 10 });
    const [user, setUser] = useState<StudentList | null>(null);
    const [subLecturer, setSubLecturer] = useState<Account | null>(null);
    const [globalFilter, setGlobalFilter] = useState("");

    const [advisorSearchInput, setAdvisorSearchInput] = useState("");
    const [studentSearchInput, setStudentSearchInput] = useState("");

    const [debouncedAdvisorSearch] = useDebouncedValue(advisorSearchInput.length >= 2 ? advisorSearchInput : "", 800);
    const [debouncedStudentSearch] = useDebouncedValue(studentSearchInput.length >= 2 ? studentSearchInput : "", 800);

    const Q_AdminAccount = useCustomReactQuery({
        queryKey: ["Q_AdminAccount", debouncedAdvisorSearch],
        axiosFn: () => service_account.getAdminAccount({
            paging: {
                pageNumber: paginationState[0].pageIndex + 1,
                pageSize: paginationState[0].pageSize
            },
            name: globalFilter || undefined
        }),
        options: {
            enabled: disc[0],
            staleTime: 2 * 60 * 1000,
            refetchOnWindowFocus: false,
        }
    })

    const Q_StudentList = useCustomReactQuery({
        queryKey: [
            "Q_StudentList_SemesterStudentListUpdate",
            debouncedStudentSearch
        ],
        axiosFn: () =>
            service_account.getStudentList({
                paging: {
                    pageNumber: paginationState[0].pageIndex + 1,
                    pageSize: paginationState[0].pageSize
                },
                name: debouncedStudentSearch || undefined
            }),
        options: {
            enabled: disc[0],
            staleTime: 2 * 60 * 1000,
            refetchOnWindowFocus: false,
            select: (data) => {
                // NOTE: Remove duplicates by student code
                return Array.from(
                    new Map(
                        data.map((item) => [item.code, item])
                    ).values()
                );
            }
        }
    });
    useEffect(() => {
        setGlobalFilter(debouncedAdvisorSearch);
        paginationState[1]({ pageIndex: 0, pageSize: paginationState[0].pageSize });
    }, [debouncedAdvisorSearch]);

    return (
        <MyButtonCreate
            disclosure={disc}
            modalSize={"60%"}
            form={form}
            onSubmit={async () => {
                const res = await service_studentActivityPlan.create({
                    activityPlanId: activityPlanStore.state.ActivityPlan?.id,
                    userId: user?.id,
                    subLecturerId: subLecturer?.id
                })
                setUser(null)
                setSubLecturer(null)
                setAdvisorSearchInput("")
                setStudentSearchInput("")
                disc[1].close()
                return res
            }}
            title="Thêm mới">
            <Grid columns={12}>
                <GridCol span={6}>
                    <CustomSelect
                        label="Mã sinh viên"
                        searchable
                        searchValue={studentSearchInput}
                        onSearchChange={(value) => {
                            setStudentSearchInput(value);
                            // Only clear selection if input is completely cleared
                            if (value === '') {
                                setUser(null);
                            }
                        }}
                        data={Q_StudentList.data?.map((item) => ({
                            label: `${item.code} - ${item.fullName}`,
                            value: item.code ?? ''
                        })) || []}
                        value={user?.code ?? null}
                        onChange={(value) => {
                            if (value) {
                                const foundUser = Q_StudentList.data?.find((item) => item.code === value);
                                if (foundUser) {
                                    setUser(foundUser);
                                    setStudentSearchInput(foundUser.code ?? ''); // Sync search input
                                }
                            } else {
                                setUser(null);
                                setStudentSearchInput(''); // Clear search input
                            }
                        }}
                        placeholder="Nhập ít nhất 2 ký tự để tìm kiếm..."
                        nothingFoundMessage={studentSearchInput.length > 0 && studentSearchInput.length < 2 ?
                            "Nhập ít nhất 2 ký tự để tìm kiếm" :
                            Q_StudentList.isLoading ? "Đang tìm kiếm..." : "Không tìm thấy kết quả"
                        }
                        limit={20}
                        clearable
                    />
                    <CustomTextInput
                        label="Họ tên"
                        value={user?.fullName ?? ''}
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
                        value={user?.className ?? ''}
                    />
                    <CustomTextInput
                        label="Tên ngành"
                        disabled
                        value={user?.majorsName ?? ''}
                    />
                </GridCol>
                <GridCol span={6}>
                    <CustomDateInput
                        disabled
                        label="Ngày sinh"
                        value={user?.dateOfBirth ?? ''}
                    />
                    <CustomSelect
                        label="Giới tính"
                        disabled
                        value={user?.gender?.toString() ?? ''}
                        data={[
                            { label: genderLabel[1], value: genderEnum.Male.toString() },
                            { label: genderLabel[2], value: genderEnum.Female.toString() }
                        ]}
                    />
                    <CustomSelect
                        label="Mã cố vấn học tập"
                        searchable
                        searchValue={advisorSearchInput}
                        onSearchChange={(value) => {
                            setAdvisorSearchInput(value);
                            // Only clear selection if input is completely cleared
                            if (value === '') {
                                setSubLecturer(null);
                            }
                        }}
                        data={Q_AdminAccount.data?.map((item) => ({
                            label: `${item.code} - ${item.fullName}`,
                            value: item.id?.toString() ?? ''
                        })) || []}
                        value={subLecturer?.id?.toString() ?? null}
                        onChange={(value) => {
                            if (value) {
                                const foundLecturer = Q_AdminAccount.data?.find((item) => item.id?.toString() === value);
                                if (foundLecturer) {
                                    setSubLecturer(foundLecturer);
                                    setAdvisorSearchInput(foundLecturer.code ?? ''); // Sync search input
                                }
                            } else {
                                setSubLecturer(null);
                                setAdvisorSearchInput(''); // Clear search input
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
                    {/* <MyTextInput
                         disabled
                         label="Mã khối"
                     {...form.getInputProps('facultyCode')}
                     />*/}
                    <CustomTextInput
                        label="Mã khoa"
                        disabled
                        value={user?.facultyCode ?? ''}
                    />
                </GridCol>
            </Grid>
        </MyButtonCreate>
    );
}
