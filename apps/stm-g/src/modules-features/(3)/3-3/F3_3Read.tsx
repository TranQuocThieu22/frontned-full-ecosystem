'use client'
import baseAxios from "@/api/config/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F3_3DeleteProgram from "./F3_3DeleteProgram";
import F3_3UpdateProgram from "./F3_3UpdateProgram";



export default function F3_3Read() {
    const programQuery = useQuery<Program[]>({
        queryKey: [`F3_3Read`],
        queryFn: async () => {
            const response = await baseAxios.get("/Program/getAll?Cols=ProgramType,ScoreConfigs");
            const result = response.data.data
            return result
        },
    })

    const exportConfig = {
        fields: [

            {
                fieldName: "maChuongTrinh",
                header: "Mã chương trình"
            },
            {
                fieldName: "tenChuongTrinh",
                header: "Tên chương trình"
            },
            {
                fieldName: "loaiChuongTrinh",
                header: "Loại chương trình"
            },
            {
                fieldName: "isDungDaoTao",
                header: "Dừng đào tạo"
            },
            {
                fieldName: "tongSoTiet",
                header: "Tổng số tiết"
            },
            {
                fieldName: "tongSoGio",
                header: "Tổng số giờ"
            },
            {
                fieldName: "heDiemNhap",
                header: "Hệ điểm nhập"
            },
            {
                fieldName: "cachTongKet",
                header: "Cách tổng kết"
            },
            {
                fieldName: "soLuongThanhPhan",
                header: "Số lượng thành phần"
            }
        ]

    };

    const columns = useMemo<MRT_ColumnDef<Program>[]>(
        () => [

            {
                header: "Mã chương trình",
                accessorKey: "code"
            },
            {
                header: "Tên chương trình",
                accessorKey: "name"
            },
            {
                header: "Loại chương trình",
                accessorKey: "programType.name"
            },
            {
                header: "Dừng đào tạo",
                accessorKey: "isCancel",
                Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />,

            },
            {
                header: "Tổng số tiết",
                accessorKey: "totalClassPeriodNumber"
            },
            // {
            //     header: "Tổng số giờ",
            //     accessorKey: "tongSoGio"
            // },
            {
                header: "Hệ điểm QT",
                accessorKey: "scoreSystem",
                accessorFn(originalRow) {
                    switch (originalRow.scoreSystem) {
                        case 1:
                            return "Hệ 4 ";
                        case 2:
                            return "Hệ 10";
                        case 3:
                            return "Hệ 100";
                        case 4:
                            return "Điểm danh";
                        default:
                            return "";
                    }

                },
            },
            {
                header: "Cách tổng kết QT",
                accessorKey: "scoreFormula",
                accessorFn(originalRow) {
                    switch (originalRow.scoreFormula) {
                        case 1:
                            return "Trọng số";
                        case 2:
                            return "Trung bình cộng";
                        case 3:
                            return "Tổng kết";
                        default:
                            return "";
                    }
                },
            },
            {
                header: "Ngưỡng đạt QT",
                accessorKey: "scorePass",
                accessorFn(originalRow) {
                    if (originalRow.scorePass === null) return ""
                    return originalRow.scorePass;
                },
            },
            {
                header: "Số thành phần điểm QT",
                accessorKey: "soThanhPhanDiemQT",

                Cell: ({ row }) => {
                    return (
                        <>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {row.original.scoreConfigs && row.original.scoreConfigs.length > 0
                                    ? row.original.scoreConfigs
                                        .filter((item) => item.scoreType === 1)
                                        .map((item) => item.name)
                                        .join("\n")
                                    : ""}
                            </div>
                        </>
                    )
                },
            },
            {
                header: "Hệ điểm Thi",
                accessorKey: "testScoreSystem",
                accessorFn(originalRow) {
                    switch (originalRow.testScoreSystem) {
                        case 1:
                            return "Hệ 4 ";
                        case 2:
                            return "Hệ 10";
                        case 3:
                            return "Hệ 100";
                        default:
                            return "";
                    }

                },
            },
            {
                header: "Cách tổng kết Thi",
                accessorKey: "testScoreFormula",
                accessorFn(originalRow) {
                    switch (originalRow.testScoreFormula) {
                        case 1:
                            return "Trọng số";
                        case 2:
                            return "Trung bình cộng";
                        case 3:
                            return "Tổng kết";
                        default:
                            return "";
                    }
                },
            },
            {
                header: "Ngưỡng đạt Thi",
                accessorKey: "testScorePass",
                accessorFn(originalRow) {
                    if (originalRow.testScorePass === null) return ""
                    return originalRow.testScorePass;
                },
            },
            {
                header: "Số thành phần điểm Thi",
                accessorKey: "soThanhPhanDiemThi",
                accessorFn(originalRow) {
                    return originalRow.scoreConfigs
                        ?.filter((item) => item.scoreType === 2)
                        .map((item) => item.name)
                        .join(", ");
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {row.original.scoreConfigs && row.original.scoreConfigs.length > 0
                                    ? row.original.scoreConfigs
                                        .filter((item) => item.scoreType === 2)
                                        .map((item) => item.name)
                                        .join("\n")
                                    : ""}
                            </div>
                        </>
                    )
                },
            },

            // {
            //     header: "Hệ điểm nhập",
            //     accessorKey: "heDiemNhap",
            //     accessorFn: (originalRow) => {
            //         return GetHeDiemNhap(originalRow.heDiemNhap!).text
            //     },
            // },
            // {
            //     header: "Cách tổng kết",
            //     accessorKey: "cachTongKet",
            //     accessorFn: (originalRow) => {
            //         return GetTongKet(originalRow.cachTongKet!).text
            //     },
            // },
            // {
            //     header: "Số lượng thành phần",
            //     accessorKey: "soLuongThanhPhan"
            // }
        ]
        ,
        []
    );

    return (
        <MyDataTable
            isLoading={programQuery.isLoading}
            isError={programQuery.isError}
            exportAble
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={programQuery.data || []}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F3_3UpdateProgram data={row.original} />
                        <F3_3DeleteProgram Id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}



interface Program {
    skillCenterId: number;
    programTypeId: number;
    totalClassPeriodNumber: number;
    totalHours: number;
    isTesting: boolean;
    certificateId: number;
    isCancel: boolean;
    note: string;
    price: number;
    scoreSystem: number;
    scoreFormula: number;
    scorePass: number;
    testScoreSystem: number | null;
    testScoreFormula: number | null;
    testScorePass: number | null;
    certificate: any; // Adjust the type based on the actual structure
    skillCenter: any; // Adjust the type based on the actual structure
    subjects: any; // Adjust the type based on the actual structure
    programType: ProgramType;
    programSubjects: any[]; // Adjust the type based on the actual structure
    scoreConfigs: ScoreConfig[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ProgramType {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ScoreConfig {
    programId: number;
    scoreType: number;
    percentScore: number;
    scoreMax: number;
    scoreMin: number;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

let mockData = [
    {
        id: 1,
        maChuongTrinh: "LTW",
        tenChuongTrinh: "Lập trình web",
        loaiChuongTrinh: "Chương trình học",
        isDungDaoTao: true,
        tongSoTiet: 30,
        tongSoGio: 60,

        heDiemQuaTrinh: 10,
        cachTongHopQT: "Trọng số",
        nguongDat: 0,
        soThanhPhanDiemQT: 5,
        heDiemThi: 10,
        cachTongKetThi: "trung bình cộng",
        soThanhPhanDiemThi: 12,
        nguongDatThi: 10,
        heDiemNhap: 1,
        // cachTongKet: "Thi giữa kỳ và cuối kỳ",
        cachTongKet: 1,
        soLuongThanhPhan: 5,
        diemQuaTrinh:
            [
                {
                    id: 1,
                    maThanhPhan: "CC",
                    tenThanhPhan: "Chuyên cần",
                    trongSo: 40,
                    diemMax: 40,
                    nguongLiet: 30,
                },
                {
                    id: 2,
                    maThanhPhan: "GK",
                    tenThanhPhan: "Giữa kỳ",
                    trongSo: 30,
                    diemMax: 30,
                    nguongLiet: 30,
                },
                {
                    id: 3,
                    maThanhPhan: "CK",
                    tenThanhPhan: "Cuối kỳ",
                    trongSo: 35,
                    diemMax: 30,
                    nguongLiet: 30,
                }

            ],
        diemThi:
            [
                {
                    id: 1,
                    maThanhPhan: "CC",
                    tenThanhPhan: "Chuyên cần",
                    trongSo: 40,
                    diemMax: 30,
                    nguongLiet: 30,
                },
                {
                    id: 2,
                    maThanhPhan: "GK",
                    tenThanhPhan: "Giữa kỳ",
                    trongSo: 30,
                    diemMax: 40,
                    nguongLiet: 30,
                },
                {
                    id: 3,
                    maThanhPhan: "CK",
                    tenThanhPhan: "Cuối kỳ",
                    trongSo: 35,
                    diemMax: 30,
                    nguongLiet: 30,
                }

            ]
    },
    {
        id: 3,
        maChuongTrinh: "LTMB",
        tenChuongTrinh: "Lập trình mobile",
        loaiChuongTrinh: "Chương trình học",
        isDungDaoTao: true,
        tongSoTiet: 35,
        tongSoGio: 70,

        heDiemQuaTrinh: 10,
        cachTongHopQT: "Trọng số",
        nguongDat: 10,
        soThanhPhanDiemQT: 5,
        heDiemThi: 10,
        cachTongKetThi: "trung bình cộng",
        soThanhPhanDiemThi: 12,
        nguongDatThi: 10,

        heDiemNhap: 3,
        // cachTongKet: "Thi kết thúc môn",
        cachTongKet: 1,
        soLuongThanhPhan: 4,
        diemQuaTrinh: [],
        diemThi:
            [
                {
                    id: 1,
                    maThanhPhan: "CC",
                    tenThanhPhan: "Chuyên cần",
                    trongSo: 40,
                    diemMax: 30,
                    nguongLiet: 30,
                },
                {
                    id: 2,
                    maThanhPhan: "GK",
                    tenThanhPhan: "Giữa kỳ",
                    trongSo: 30,
                    diemMax: 30,
                    nguongLiet: 30,
                },
                {
                    id: 3,
                    maThanhPhan: "CK",
                    tenThanhPhan: "Cuối kỳ",
                    trongSo: 35,
                    diemMax: 30,
                    nguongLiet: 30,
                }

            ]
    }

]