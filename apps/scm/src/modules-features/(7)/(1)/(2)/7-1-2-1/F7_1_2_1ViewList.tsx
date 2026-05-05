'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconList } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";


export interface I7_1_2_1ListOfLecture {
    id?: number;
    instructorCode?: string;
    instructorName?: string;
    academicTitle?: string;
    collaborationUnit?: string;
}

export default function F7_1_2_1ViewList() {
    const disc = useDisclosure(false);
    const fullScreen = useState(false);
    const hSize = useState("80vh");
    const query = useQuery<I7_1_2_1ListOfLecture[]>({
        queryKey: ["F7_1_2_1ViewList"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I7_1_2_1ListOfLecture>[]>(
        () => [
            {
                header: "STT",
                accessorKey: "id"
            },
            {
                header: "Mã giảng viên",
                accessorKey: "instructorCode"
            },
            {
                header: "Họ tên",
                accessorKey: "instructorName"
            },
            {
                header: "Học hàm - Học vị",
                accessorKey: "academicTitle"
            },
            {
                header: "Đơn vị cộng tác",
                accessorKey: "collaborationUnit"
            },
        ],
        []
    )
    if (query.isLoading) return "Loading..."
    if (query.isError) return "Error!"
    return (
        <>
            <Tooltip label="Xem danh sách" >
                <ActionIcon color="cyan" onClick={disc[1].open} >
                    <IconList size={25} color="blue" />
                </ActionIcon>
            </Tooltip>
            <Modal
                fullScreen={fullScreen[0]}
                opened={disc[0]}
                onClose={disc[1].close}
                size={"80%"}>
                <MyDataTable
                    columns={columns}
                    data={query.data!}
                />
            </Modal>
        </>

    )
}

const data: I7_1_2_1ListOfLecture[] = [
    {
        id: 1,
        instructorCode: "GV0001",
        instructorName: "Nguyễn Văn A",
        academicTitle: "PGS. TS",
        collaborationUnit: "Phòng hợp tác quốc tế",
    },

];