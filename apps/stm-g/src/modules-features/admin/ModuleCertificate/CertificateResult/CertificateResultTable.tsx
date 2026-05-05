'use client'
import baseAxios from "@/api/config/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Button, Checkbox, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface ICertificateResult {
    userId?: number;
    courseSectionId?: number;
    examId?: number;
    decisionNumber?: string;
    decisionDate?: string;
    receivedDate?: string;
    registrationNumber?: string;
    handoverStatus?: number;
    note?: string;
    isPass?: boolean;
    user?: {
        id?: number;
        isBlocked?: boolean;
        roleId?: number;
        userName?: string;
        code?: string;
        email?: string;
        phoneNumber?: string;
        address?: string;
        avatarPath?: string;
        fullName?: string;
        facultyId?: number | null;
        facultyName?: string | null;
        classId?: number | null;
        majorsId?: number | null;
        workingUnitId?: number | null;
        workingUnitName?: string | null;
        gender?: number;
        dateOfBirth?: string;
        educationLevel?: number;
        modifiedBy?: number;
        modifiedWhen?: string;
        roles?: {
            aqModuleId?: number;
            code?: string;
            name?: string;
            id?: number;
            createdWhen?: string | null;
            createdBy?: number | null;
            modifiedWhen?: string | null;
            modifiedBy?: number | null;
            concurrencyStamp?: string | null;
            isEnabled?: boolean;
        }[];
    };
    courseSection?: {
        quantityStudent?: number;
        quantityStudentActual?: number;
        courseTimeClusterId?: number;
        isScheduled?: boolean;
        status?: string | null;
        type?: string | null;
        examId?: number | null;
        certificateReviewBatchId?: number | null;
        exam?: any | null;
        courseTimeCluster?: any | null;
        certificateReviewBatch?: any | null;
        roomPriority?: any[];
        courseSectionLecturer?: any[];
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    exam?: {
        programId?: number;
        examDate?: string;
        roomTypeId?: number;
        status?: number;
        startRegistrationDate?: string;
        endRegistrationDate?: string;
        maxStudent?: number;
        branchId?: number;
        skillCenterId?: number;
        courseSectionNumberTotal?: number;
        courseSectionNumber?: number;
        officialExamDate?: string;
        classPeriod?: number;
        examCourses?: any;
        certificateReviewBatchId?: number;
        program?: {
            skillCenterId?: number;
            programTypeId?: number;
            totalClassPeriodNumber?: number;
            totalHours?: number;
            isTesting?: boolean;
            certificateId?: number;
            isCancel?: boolean;
            note?: string;
            price?: number;
            scoreSystem?: number;
            scoreFormula?: number;
            scorePass?: number;
            testScoreSystem?: any;
            testScoreFormula?: any;
            testScorePass?: any;
            certificate?: any;
            skillCenter?: any;
            subjects?: any;
            programType?: any;
            programSubjects?: any[];
            scoreConfigs?: any;
            id?: number;
            code?: string;
            name?: string;
            concurrencyStamp?: string;
            isEnabled?: boolean;
        };
        branch?: any;
        skillCenter?: any;
        certificateReviewBatch?: {
            certificateId?: number;
            conditionPass?: any;
            certificate?: {
                type?: number;
                link?: string;
                note?: string;
                skillCenterId?: number;
                skillCenter?: any;
                id?: number;
                code?: string;
                name?: string;
                concurrencyStamp?: string;
                isEnabled?: boolean;
            };
            id?: number;
            code?: string;
            name?: string;
            concurrencyStamp?: string;
            isEnabled?: boolean;
        };
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export default function CertificateResultTable() {

    const AllCertificateResult = useQuery<any[]>({
        queryKey: ['certificateResult'],
        queryFn: async () => {
            let response = await baseAxios.get("/CertificateResult/GetAll?cols=User,Exam,CertificateDecision");
            if (response.data.data.lenght === 0) return []
            else {
                response.data.data.forEach((item: ICertificateResult | any) => {
                    item.certificateReviewBatch = {
                        certificate: {
                            name: "Chứng chỉ ứng dụng CNTT nâng cao",
                        },
                        name: "Đợt xét chứng chỉ Tin học nâng cao 2025",
                    };
                })
            }
            return response.data.data
        }
    })

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        {
            header: "Họ tên",
            accessorKey: "user.fullName",
        },
        {
            header: "Giới tính",
            accessorFn: (row) => {
                return ENUM_GENDER[row.user?.gender!]
            }
        },
        {
            header: "Ngày sinh",
            accessorKey: "user.dateOfBirth",
            accessorFn(originalRow) {
                if (!originalRow.user?.dateOfBirth) return "";
                return utils_date_dateToDDMMYYYString(new Date(originalRow.user?.dateOfBirth!));
            },
        },
        // {
        //     header: "Tên chương trình",
        //     accessorKey: "exam.program.name",
        // },
        {
            header: "Mã khóa thi",
            accessorKey: "exam.code",
        },
        {
            header: "Ngày thi",
            accessorFn(originalRow) {
                if (!originalRow.exam?.officialExamDate) return "";
                return utils_date_dateToDDMMYYYString(new Date(originalRow.exam.officialExamDate));
            },
        },
        {
            header: "Điểm thi",
            accessorKey: "point",
        },
        {
            header: "Đạt thi",
            accessorFn(originalRow) {
                return originalRow.isPass ? "Đạt" : "Không đạt";
            },
        },
        // {
        //     header: "Đợt xét cấp CC",
        //     accessorKey: "exam.certificateReviewBatch.name",
        // },
        // {
        //     header: "Chứng chỉ / chứng nhận",
        //     accessorKey: "exam.certificateReviewBatch.certificate.name",
        // },
        {
            header: "Đợt xét cấp CC",
            accessorKey: "certificateReviewBatch.name",
        },
        {
            header: "Chứng chỉ / chứng nhận",
            accessorKey: "certificateReviewBatch.certificate.name",
        },
        {
            header: "Đạt CC",
            accessorKey: "isPass",
            accessorFn(originalRow) {
                return originalRow.isPass ? "Đạt" : "Không đạt";
            },
            Cell: ({ row }) => {
                return (
                    <MyCenterFull>
                        <Checkbox
                            readOnly
                            checked={row.original.isPass}
                            color="green"
                        />
                    </MyCenterFull>
                )
            },
            size: 120
        },
        // {
        //     header: "người cập nhật",
        //     accessorKey: "nguoiCapNhat",
        // },
        // {
        //     header: "ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        //     accessorFn(originalRow) {
        //         return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
        //     },
        // }
    ], []);

    // if (AllCertificateResult.isLoading) return "Đang tải dữ liệu..."
    // if (AllCertificateResult.isError) return "có lỗi xảy ra!"
    return (
        <>
            <MyDataTable
                enableRowSelection={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <Button
                                    color="green"
                                >Export
                                </Button>
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={AllCertificateResult.data || []}
            />
        </>
    )
}



