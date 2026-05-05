'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconList } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";


export interface I6_4_1ListOfInstructor {
    id?: number;
    instructorCode?: string;
    instructorName?: string;
    academicTitle?: string;
    collaborationUnit?: string;
    topicCode?: string;
    topicName?: string
}

export default function F6_4_1ViewList() {
    const disc = useDisclosure(false);
    const fullScreen = useState(false);
    const hSize = useState("80vh");
    const query = useQuery<I6_4_1ListOfInstructor[]>({
        queryKey: ["F6_5_2ReadPaymentOfRemuneration"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_4_1ListOfInstructor>[]>(
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
            {
                header: "Mã đề tài",
                accessorKey: "topicCode"
            },
            {
                header: "Đề tài",
                accessorKey: "topicName"
            },
        ],
        []
    )
    if (query.isLoading) return "Loading..."
    if (query.isError) return "Error!"
    return (
        <>
            <Tooltip label="Xem danh sách" >
                {/* <ActionIcon color="cyan" onClick={disc[1].open} >
                    <IconList size={25} color="blue" />
                </ActionIcon> */}
                <Button color="green" onClick={disc[1].open} leftSection={<IconList size={25} color="blue" />}>
                    Xem danh sách
                </Button>
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

const data: I6_4_1ListOfInstructor[] = [
    {
        id: 1,
        instructorCode: "GV0001",
        instructorName: "Nguyễn Văn A",
        academicTitle: "PGS. TS",
        collaborationUnit: "Phòng hợp tác quốc tế",
        topicCode: "DT0001",
        topicName: "Đổi mới giảng dạy đại học"
    },

];