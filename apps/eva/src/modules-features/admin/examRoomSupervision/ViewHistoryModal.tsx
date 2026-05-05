"use client"
import { Modal, ModalProps, Text } from '@mantine/core'
import { MyDataTable, MyFlexColumn } from 'aq-fe-framework/components'
import { MRT_ColumnDef } from 'mantine-react-table'
import { useMemo } from 'react'
interface I {
    time?: string,
    action?: string,
    note?: string
}
interface IProps extends ModalProps { }

export default function ViewHistoryModal({ ...rest }: IProps) {

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Thời gian",
            accessorKey: "time"
        },
        {
            header: "Hành động",
            accessorKey: "action"
        },
        {
            header: "Nội dung",
            accessorKey: "note"
        }
    ], [])

    return (
        <Modal
            size={"50%"}
            title="Lịch sử"
            {...rest}>
            <MyFlexColumn>
                <Text>Thí sinh: SV000025 - Tô Ngọc Lan</Text>
                <Text>Môn thi: CSDLCB - Cơ sở dữ liệu cơ bản - room1</Text>
                <MyDataTable
                    columns={columns}
                    data={[
                        {
                            time: "15/05/2025 15:02:32",
                            action: "Nhắc nhở",
                            note: "Không nhìn bài bạn"
                        }
                    ] as I[]}
                />
            </MyFlexColumn>
        </Modal>
    )
}
