'use client'
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
// import ActionIconEditSubjectGroupWithMIT from "./ActionIconEditSubjectGroupWithMIT";
// import ButtonAddMITScaleToSubjectGroup from "./ButtonAddMITScaleToSubjectGroup";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { ISubjectGroupInfoViewModel } from "./Interfaces";

export default function SubjectGroupTable() {
    const subjectGroups = useQuery<ISubjectGroupInfoViewModel[]>({
        queryKey: ["COESubjectGroupWithMITScale"],
        queryFn: async () => {
            let cols = 'COEMITScale'
            const response = await baseAxios.get(`/COESubjectGroup/GetSubjectGroup?hasMIT=true&cols=${cols}`);
            return response.data.data;
        },
    });

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        {
            header: "Mã nhóm môn học",
            accessorKey: "code"
        },
        {
            header: "Tên nhóm môn học",
            accessorKey: "name"
        },
        {
            header: "Mức Năng lực",
            accessorKey: "coemitScale.code",
            accessorFn(originalRow) {
                return `${originalRow.coemitScale.code} - ${originalRow.coemitScale.description}`
            },
        },
        {
            header: "Kiến thức",
            accessorKey: "coemitScale.knowledge"
        },
        {
            header: "Kĩ năng",
            accessorKey: "coemitScale.skill"
        },
        {
            header: "Tự chủ",
            accessorKey: "coemitScale.autonomy"
        },
        // { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        // { header: "Ngày cập nhật", accessorKey: "ngayCapNhat" },
    ], []);

    return (
        <CustomFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        {/* <ButtonAddMITScaleToSubjectGroup /> */}
                        <Button
                            color="green">
                            Import
                        </Button>
                        <Button
                            color="teal">
                            Export
                        </Button>
                        {/* <Button leftSection={<IconTrash />} color="red">
                            Xóa
                        </Button> */}
                    </Group>
                )}
                columns={columns}
                data={subjectGroups.data || []}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        Chức năng không còn sử dụng
                        {/* <ActionIconEditSubjectGroupWithMIT
                            values={row.original}
                        />
                        <RemoveMITScaleFromSubjectGroup values={row.original} /> */}
                    </CustomCenterFull>
                )}
            />
        </CustomFlexColumn>
    );
}

