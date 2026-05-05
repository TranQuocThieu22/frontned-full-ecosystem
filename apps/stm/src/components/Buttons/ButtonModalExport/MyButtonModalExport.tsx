'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import MyFlexEnd from "@/components/Layouts/FlexEnd/MyFlexEnd"
import { Button, Fieldset, Modal, Radio } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconFileExport, IconX } from "@tabler/icons-react"
import { MRT_ColumnDef, MRT_RowData, MRT_TableOptions } from "mantine-react-table"
import { useState } from "react"

interface I2 {
    id?: number,
    maField?: string,
    tenField?: string,
    soLuong?: number,
    ghiChu?: string,
    tenVietTat?: string
}

interface I<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
    columns: MRT_ColumnDef<TData>[]; // Table columns
    data: TData[]; // Table data
}

export default function MyButtonExport<TData extends MRT_RowData>({ columns, data, ...rest }: I<TData>) {
    const disc = useDisclosure()
    const exportType = useState<"onScreen" | "inDatabase">('onScreen');
    return (
        <>
            <Button onClick={disc[1].open} color="teal.8" leftSection={<IconFileExport />}>Export</Button>
            <Modal title={"Export"} size={"95%"} opened={disc[0]} onClose={disc[1].close}>
                <MyFlexColumn>
                    <Radio.Group
                        value={exportType[0]}
                        onChange={(value) => exportType[1](value as "onScreen" | "inDatabase")}
                    >
                        <Fieldset legend="Chọn kiểu xuất">
                            <MyFlexColumn mt="xs">
                                <Radio value="onScreen" label="Xuất dữ liệu theo kiểu trên màn hình" />
                                <Radio value="inDatabase" label="Xuất dữ liệu theo kiểu trong database" />
                            </MyFlexColumn>
                        </Fieldset>
                    </Radio.Group>
                    <Fieldset legend="Danh sách trường thông tin trong file dữ liệu">
                        <MyDataTable columns={columns} data={data} />
                    </Fieldset>
                </MyFlexColumn>
                <MyFlexEnd>
                    <Button color="green.9">Export</Button>
                    <Button color="gray" leftSection={<IconX />} onClick={disc[1].close}>Đóng</Button>
                </MyFlexEnd>
            </Modal>
        </>
    )
}
