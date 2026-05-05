'use client';

import { CustomColumnDef, PaginationState } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { CourseSectionRegistrationForm } from "./CourseSectionRegistrationForm";
import { showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";

interface CourseSectionRegistrationTableProps {
    semesterId?: number;

}

export const CourseSectionRegistrationTable = ({
    semesterId
}: CourseSectionRegistrationTableProps) => {
    const [courseSectionRegistrationFormOpened, courseSectionRegistrationFormHandler] = useDisclosure(false);

    const pagingState = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 30,
    })

    const courseSectionRegistrations = useCustomReactQuery({
        queryKey: ["CourseSectionRegistrations", semesterId, pagingState[0].pageIndex, pagingState[0].pageSize],
        axiosFn: async () => {
            let pageNumber = pagingState[0].pageIndex + 1;
            let pageSize = pagingState[0].pageSize;
            return axiosInstance.get<CustomApiResponse<any[]>>(`/COECourseSectionStudent/FindByActivityPlanId?activityPlanId=${semesterId}`);
            // return axiosInstance.get<CustomApiResponse<any[]>>(`/COECourseSectionStudent/FindByActivityPlanId?activityPlanId=${semesterId}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        },
        options: {
            enabled: !!semesterId,
            refetchOnWindowFocus: false,
        },
        // isPrototype: true,
        // mockData: [
        //     {
        //         id: 1,
        //         courseCode: "CS101",
        //         courseName: "Lập trình căn bản",
        //         courseSectionCode: "A01",
        //         studentCode: "SV001",
        //         studentName: "Nguyễn Văn A",
        //         dateOfBirth: "2002-01-15",
        //         classCode: "CLC01",
        //         courseBatchCode: "K20",
        //         programCode: "CT01",
        //         instructorCode: "GV001",
        //         instructorName: "Trần Thị B"
        //     },
        //     {
        //         id: 2,
        //         courseCode: "CS102",
        //         courseName: "Cấu trúc dữ liệu",
        //         courseSectionCode: "A02",
        //         studentCode: "SV002",
        //         studentName: "Lê Thị C",
        //         dateOfBirth: "2001-09-20",
        //         classCode: "CLC02",
        //         courseBatchCode: "K20",
        //         programCode: "CT01",
        //         instructorCode: "GV002",
        //         instructorName: "Phạm Văn D"
        //     },
        //     {
        //         id: 3,
        //         courseCode: "CS103",
        //         courseName: "Toán rời rạc",
        //         courseSectionCode: "A03",
        //         studentCode: "SV003",
        //         studentName: "Phạm Văn E",
        //         dateOfBirth: "2002-05-10",
        //         classCode: "CLC03",
        //         courseBatchCode: "K21",
        //         programCode: "CT02",
        //         instructorCode: "GV003",
        //         instructorName: "Nguyễn Thị F"
        //     },
        //     {
        //         id: 4,
        //         courseCode: "CS104",
        //         courseName: "Cơ sở dữ liệu",
        //         courseSectionCode: "A04",
        //         studentCode: "SV004",
        //         studentName: "Trần Thị G",
        //         dateOfBirth: "2001-12-05",
        //         classCode: "CLC04",
        //         courseBatchCode: "K21",
        //         programCode: "CT02",
        //         instructorCode: "GV004",
        //         instructorName: "Lê Văn H"
        //     },
        //     {
        //         id: 5,
        //         courseCode: "CS105",
        //         courseName: "Hệ điều hành",
        //         courseSectionCode: "A05",
        //         studentCode: "SV005",
        //         studentName: "Ngô Văn I",
        //         dateOfBirth: "2002-03-22",
        //         classCode: "CLC05",
        //         courseBatchCode: "K22",
        //         programCode: "CT03",
        //         instructorCode: "GV005",
        //         instructorName: "Đặng Thị J"
        //     }
        // ],
    })

    const courseSectionRegistrationMRTColumns = useMemo<CustomColumnDef<any>[]>(() => [
        {
            header: "Mã môn học",
            accessorKey: "subjectCode",
            accessorFn(originalRow) {
                return originalRow.coeCourseSection?.subjectCode ?? '';
            },
            importFieldProps: {
                required: true,
                isRequired: true
            }
        },
        {
            header: "Tên môn học",
            accessorKey: "coeCourseSection.subjectName"
        },
        {
            header: "Nhóm học",
            accessorKey: "courseSectionCode",
            accessorFn(originalRow) {
                return originalRow.coeCourseSection?.code ?? '';
            },
            importFieldProps: {
                required: true,
                isRequired: true
            },
        },
        {
            header: "Mã sinh viên",
            accessorKey: "studentCode",
            accessorFn: (row) => row.user?.code ?? '',
            importFieldProps: {
                required: true,
                isRequired: true
            }
        },
        {
            header: "Họ tên sinh viên",
            accessorKey: "user.fullName"
        },
        {
            header: "Ngày sinh",
            accessorKey: "user.dateOfBirth",
            type: "ddMMyyyy"
        },
        {
            header: "Mã lớp",
            accessorKey: "user.class.name"
        },
        {
            header: "Mã khóa",
            accessorKey: "user.class.coeGrade.name"
        },
        {
            header: "Mã chương trình",
            accessorKey: "user.class.coeGrade.coeProgram.code",
        },
        {
            header: "Mã giảng viên nhập điểm",
            accessorKey: "coeCourseSection.pointRecordUser.code",
        },
        {
            header: "Tên giảng viên nhập điểm",
            accessorKey: "coeCourseSection.pointRecordUser.fullName"
        }
    ], []);

    const handleOnClickCreateButton = () => {
        courseSectionRegistrationFormHandler.open();
    }

    return (
        <>
            <CustomDataTableAPI
                disableDelete={(row) => {
                    if (row.courseCode == "CS103") return true
                    return false
                }}
                enableRowSelection
                deleteFn={(id) => axiosInstance.post(`COECourseSectionStudent/Delete`, {
                    id: id
                })}
                deleteListFn={(ids) => {
                    let deleteList = ids.map((id) => ({
                        id: id,
                        isEnabled: false
                    }))
                    return axiosInstance.post("/COECourseSectionStudent/DeleteList", deleteList)
                }}
                exportProps={{
                    fileName: "Course_Section_Registrations"
                }}
                buttonImportProps={{
                    fileName: "dsDangKyMonHoc",
                    onSubmit(finalValue) {
                        finalValue.forEach((item) => {
                            item.activityPlanId = semesterId;
                        })
                        return axiosInstance.post("/COECourseSectionStudent/Import", finalValue);
                    },
                }}
                query={courseSectionRegistrations}
                columns={courseSectionRegistrationMRTColumns}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <Button
                            leftSection={<IconPlus />}
                            color="blue"
                            onClick={handleOnClickCreateButton}
                        >
                            Thêm
                        </Button>
                    </Group>
                )}
                pagination={pagingState[0]}
                onPaginationChange={pagingState[1]}
            />
            <Modal
                size={720}
                opened={courseSectionRegistrationFormOpened}
                onClose={courseSectionRegistrationFormHandler.close}
                title={
                    <Text fw={600}>Chi tiết sinh viên đăng ký môn học</Text>
                }
            >
                <CourseSectionRegistrationForm
                    semesterId={semesterId}
                    formHandler={courseSectionRegistrationFormHandler}
                />
            </Modal>
        </>
    )
}