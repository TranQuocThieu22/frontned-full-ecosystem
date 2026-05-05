'use client'
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { canCreateStaff, canDeleteStaff, canUpdateStaff } from "@/features/auth/PageAuthorization/staff.auth";
import { Lecturer } from "@/interfaces/shared-interfaces/Lecturer";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_14w3vwnnfy_Create from "./StaffCategoryCreate";
import F_14w3vwnnfy_Delete from "./StaffCategoryDelete";
import F_14w3vwnnfy_Update from "./StaffCategoryUpdate";

export interface IUnit {
    id?: number;
    code?: string;
    name?: string;
    unitType?: number;
    unitId?: number;
    note?: string;
    unit?: IUnit;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

const unitType: Record<number, string> = {
    1: "Khoa",
    2: "Bộ môn",
    3: "Phòng",
    4: "Trung tâm",
};

export default function StaffCategoryRead() {
    const [importData, setImportData] = useState(false);
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    // Query to fetch mock data
    const query = useQuery<IUnit[]>({
        queryKey: ["StaffCategoryRead"],
        queryFn: async () => {
            const response = await baseAxios.get("/Account/GetAllLecturer");
            return response.data.data || [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<Lecturer>[]>(() => [
        { header: "Mã nhân sự", accessorKey: "code" },
        { header: "Họ", accessorFn: (row) => row.fullName!.split(" ")[0] || "" },
        {
            header: "Tên",
            accessorFn: (row) => {
                const parts = row.fullName?.split(" ") ?? [];
                parts.shift(); // Remove the first part (last name)
                return parts.join(" ") || "";
            }
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            accessorFn: (row) => (row.gender === 1 ? "Nam" : row.gender === 2 ? "Nữ" : ""),
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn: (origrinalRow) => {
                return dateUtils.toDDMMYYYY(new Date(origrinalRow.dateOfBirth!));
            }
        },
        {
            header: "Số điện thoại 1",
            accessorKey: "phoneNumber",
        },
        {
            header: "Email 1",
            accessorKey: "email",
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        //     accessorFn(originalRow) {
        //         return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
        //     },
        // },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "unitCode", header: "Mã đơn vị" },
            { fieldName: "unitName", header: "Tên đơn vị" },
            { fieldName: "unitType", header: "Loại đơn vị" },
            { fieldName: "affiliated", header: "Trực thuộc" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (query.isLoading) return "Loading...";
    if (query.isError) return 'Không có dữ liệu...';

    return (
        <CustomFieldset title={`Danh mục nhân sự`}>

            <CustomFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            {canCreateStaff(userStore, userPermissionStore) && <F_14w3vwnnfy_Create />}
                            {/* <Button leftSection={<IconTablePlus />} color="green" size="sm" radius="sm"
                                onClick={() => {
                                    notifications.show({
                                        title: "Thông báo",
                                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                        color: "blue",
                                        autoClose: 5000,
                                    })
                                }
                                }
                            >Import</Button>
                            <Button leftSection={<IconTableExport />} color="teal" size="sm" radius="sm"
                                onClick={() => {
                                    notifications.show({
                                        title: "Thông báo",
                                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                        color: "blue",
                                        autoClose: 5000,
                                    })
                                }
                                }
                            >Export</Button>
                            <Button leftSection={<IconTableMinus />} color="red" size="sm" radius="sm"
                                onClick={() => {
                                    notifications.show({
                                        title: "Thông báo",
                                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                        color: "blue",
                                        autoClose: 5000,
                                    })
                                }
                                }
                            >Xóa</Button> */}
                        </Group>

                    )}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <CustomCenterFull>
                            {canUpdateStaff(userStore, userPermissionStore) && <F_14w3vwnnfy_Update data={row.original} />}
                            {canDeleteStaff(userStore, userPermissionStore) && <F_14w3vwnnfy_Delete id={row.original.id!} code={row.original.code!} />}
                        </CustomCenterFull>
                    )}
                />
            </CustomFlexColumn>
        </CustomFieldset>
    );
}

