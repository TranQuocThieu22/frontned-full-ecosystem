'use client'
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { canCreateMITRatingSchemeData, canDeleteMITRatingSchemeData, canUpdateMITRatingSchemeData } from "@/features/auth/PageAuthorization/MIT-rating-scheme-data.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_MIT_Create from "./F_MIT_Create";
import F_umg0mq7o3x_Delete from "./F_MIT_Delete";
import F_MIT_Update from "./F_MIT_Update";

export interface IMIT {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    knowledge?: string;
    skill?: string;
    autonomy?: string;
    description?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function IMIT_Read() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    const AllQuery = useQuery<IMIT[]>({
        queryKey: ["F_umg0mq7o3x_Read"],
        queryFn: async () => {
            const result = await baseAxios.get("/COEMITScale/GetAll");
            return result.data?.data || []
        }
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const columns = useMemo<MRT_ColumnDef<IMIT>[]>(() => [
        {
            header: "Mức độ",
            accessorKey: "code",
            size: 100,
            mantineTableHeadCellProps: {
                w: "50px",
            },
            mantineTableBodyCellProps: {
                // align: 'center',
                pl: 42
            },
        },
        { header: "Mô tả", accessorKey: "description", size: 220 },
        { header: "Kiến thức", accessorKey: "knowledge", size: 220 },
        { header: "Kỹ năng", accessorKey: "skill", size: 220 },
        { header: "Tự chủ", accessorKey: "autonomy", size: 220 },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "name", header: "Mức độ" },
            { fieldName: "code", header: "Mô tả" },
            { fieldName: "knowledge", header: "Kiến thức" },
            { fieldName: "skill", header: "Kỹ năng" },
            { fieldName: "autonomy", header: "Tự chủ" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (AllQuery.isLoading) return "Loading...";

    function setImportData(data: any): void {
        throw new Error("Function not implemented.");
    }

    return (
        <MyDataTable
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    {canCreateMITRatingSchemeData(userStore, userPermissionStore) && <F_MIT_Create />}
                    {/* <PrototypeImportButton/>
                    <PrototypeExportButton/>
                    <PrototypeDeleteAllButton/> */}
                </Group>
            )}
            columns={columns}
            data={AllQuery.data || []}
            renderRowActions={({ row }) => (
                <CustomCenterFull>
                    {canUpdateMITRatingSchemeData(userStore, userPermissionStore) && <F_MIT_Update data={row.original} />}
                    {canDeleteMITRatingSchemeData(userStore, userPermissionStore) && <F_umg0mq7o3x_Delete id={row.original.id!} />}
                </CustomCenterFull>
            )}
        />
    );
}

// const data: IMIT[] = [
//     {
//         id: 1,
//         level: 1,
//         description: "Có trải nghiệm và gặp qua",
//         knowlegde: "Nhớ: đã nghe, đã thấy, đã trải nghiệm",
//         skill: "",
//         autonomy: "",
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id: 2,
//         level: 2,
//         description: "Có tham gia và đóng góp",
//         knowlegde: "Hiểu: Nắm bắt được ý nghĩa, giải thích được",
//         skill: "",
//         autonomy: "",
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id:3,
//         level:3,
//         description:"Có thể giải thích",
//         knowlegde:"Phân tích: Nhìn nhận vấn đề dưới nhiều góc độ khác nhau, có thể giải thích được",
//         skill:"",
//         autonomy:"",
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id:4,
//         level:4,
//         description:"Có thể thực hành và tổ chức triển khai",
//         knowlegde:"Áp dụng: sử dụng được kiến thức đã học vào tính huống mới, và cụ thể trong thực tiễn",
//         skill:"Đánh giá được chất lượng công việc sau khi hoàn thành và kết quả thực hiện công việc của các thành viên trong nhóm",
//         autonomy:"Tự định hướng đưa ra kết luận chuyên môn và có thể bảo vệ được quan điểm",
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id:5,
//         level:5,
//         description:"Có thể sáng tạo, góp ý giải quyết vấn đề",
//         knowlegde:"Sáng tạo: đại diện cho nhận thức ở tầm cao. Có khả năng đánh giá, phán xét giá trị từ nhận thức",
//         skill:"Truyền đạt vấn đề và giải pháp tới người khác tại nơi làm việc",
//         autonomy:"Lập kế hoạch, điều phối, quản lý các nguồn lực đánh giá và cải thiện hiệu quả hoạt động",
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     }
// ];
