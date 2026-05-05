'user client'
import { MyButton } from "@/components/Buttons/Button/MyButton"
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useState } from "react"
import { MRT_ColumnDef } from "mantine-react-table"
import { U0DateToDDMMYYYString } from "@/utils/date"
import { Box, Button, Fieldset, Flex, Grid, GridCol, Paper, Select, Tabs } from "@mantine/core"
import { Text } from "@mantine/core"
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import MySelect from "@/components/Combobox/Select/MySelect"
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData"
import AQSelectTableByOpenModal from "@/components/Buttons/ButtonModal/AQSelectTableByOpenModal"
import F_cmhkoi90r9_ReadModal from "./F_cmhkoi90r9_ReadModal"
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset"
export interface I_cmhkoi90r9 {
    id?: number; // STT
    subjectCode?: string //Mã môn học
    subjectName?: string //Tên môn học
    subjectGroup?: string //Nhóm môn học
    classCode?:string //Mã lớp
    timetableNumber?: number // sỉ số TKB
    signed?: number // đã đk 
    examForm?:string // Hình thức thi
    examPeriodNumber?:number // Số tiết thi
    examGroupCode?: string // Mã nhóm thi
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
export default function F_cmhkoi90r9_Read() 
{
       const examGroupOrganizedQuery = useQuery<I_cmhkoi90r9[]>({
               queryKey: [`ListOfExamGroupOrganizedQuery`],
               queryFn: async () => [
                   {
                       id: 1,
                       subjectCode:"IT2021",
                       subjectName:"Quản trị mạng",
                       subjectGroup:"01",
                       classCode:"IT2001",
                       timetableNumber: 30,
                       signed: 26,
                       examForm:"Lý thuyết",
                       examPeriodNumber:2,
                       examGroupCode: "01-IT2401",
                       nguoiCapNhat: "Quản trị viên",
                       ngayCapNhat: new Date("2024-12-23")
                   },
               
       
               ],
           });
           const exportConfig = {
            fields: [
                { fieldName: "subjectCode", header: "Mã môn học" },
                { fieldName: "subjectName", header: "Tên môn học" },
                { fieldName: "subjectGroup", header: "Nhóm môn học" },
                { fieldName: "classCode", header: "Mã lớp" },
                { fieldName: "timetableNumber", header: "sỉ số TKB" },
                { fieldName: "signed", header: "đã đk " },
                { fieldName: "examForm", header: "Hình thức thi" },
                { fieldName: "examPeriodNumber", header: "Số tiết thi" },
                { fieldName: "examGroupCode", header: "Mã nhóm thi" },
            ]
            };
           const columns = useMemo<MRT_ColumnDef<I_cmhkoi90r9>[]>(() => [
                       
                       {
                           header: "Mã môn học",
                           accessorKey: "subjectCode",
                       },
                       {
                           header: "Tên môn học",
                           accessorKey: "subjectName",
                       },
                       {
                           header: "Nhóm học",
                           accessorKey: "subjectGroup",
                       },
                       {
                            header: "Mã lớp",
                            accessorKey: "classCode",
                        },
                        {
                            header: "Sĩ số TKB",
                            accessorKey: "timetableNumber",
                        },
                        {
                            header: "Đã ĐK",
                            accessorKey: "signed",
                        },
                        {
                            header: "Hình thức thi",
                            accessorKey: "examForm",
                        },
                        {
                            header: "Số tiết thi",
                            accessorKey: "examPeriodNumber",
                        },
                        {
                            header: "Mã nhóm thi",
                            accessorKey: "examGroupCode",
                        },
                       {
                           header: "Người cập nhật",
                           accessorKey: "nguoiCapNhat",
               
                       },
                       {
                           header: "Ngày cập nhật",
                           accessorKey: "ngayCapNhat",
                           accessorFn(originalRow) {
                               return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                           },
               
                       },
                   ], []);
                   if (examGroupOrganizedQuery.isLoading) return "Đang tải dữ liệu...";
                   if (examGroupOrganizedQuery.isError) return "Không có dữ liệu...";
 
        return (
            <>
            <Paper p={"md"}>
            <Flex
               
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                <Text> Chọn đợt thi </Text>
                <Select
                    withCheckIcon={false}

                    placeholder="Pick value"
                    data={['DC - Tập trung thi đại cương', 'DC - Tập trung thi đại cương 2', 'DC - Tập trung thi đại cương 3', 'DC - Tập trung thi đại cương 4']}
                    defaultValue="DC - Tập trung thi đại cương"
                    allowDeselect={false}
                    w={250} />
                    <Flex gap="md"
                        justify="flex-start"
                        align="flex-start"
                        direction="row"
                        wrap="wrap" >
                            <Text >Số lượng nhóm:</Text>
                            <Text c={"green"}  fw={"bold"}>18</Text>
                    </Flex>
                
                    <Flex gap="md"
                        justify="flex-start"
                        align="flex-start"
                        direction="row"
                        wrap="wrap" >
                            <Text >Số lượng thí sinh:</Text>
                            <Text c={"green"} fw={"bold"}>263</Text>
                    </Flex>

            </Flex><Box>
                    <MyFieldset mt="20"title='Danh sách nhóm thi'>
                        <Grid>
                            <Grid.Col>

                                <MyDataTable
                                    enableRowSelection={true}
                                    columns={columns}
                                    data={examGroupOrganizedQuery.data!}
                                    renderTopToolbarCustomActions={() => 
                                    <>
                                    <F_cmhkoi90r9_ReadModal
                                    
                                    />
                                    {/* <AQSelectTableByOpenModal
                                                data={examGroupOrganizedQuery.data}
                                                modalSize={"auto"}
                                                label="Chọn"
                                                listLabel="Danh sách nhóm thi chưa thêm vào đợt thi"
                                                columns={columns} setSelectedData={function (data: any): void {
                                                    throw new Error("Function not implemented.")
                                                } }>

                                    </AQSelectTableByOpenModal> */}
                                    <AQButtonExportData
                                            isAllData={true}
                                            objectName="dsNhomThi"
                                            data={examGroupOrganizedQuery.data!}
                                            exportConfig={exportConfig} /><MyButton crudType="delete" /></>} />
                            </Grid.Col>
                        </Grid>
                    </MyFieldset>
                </Box>
                </Paper></>
            );
}