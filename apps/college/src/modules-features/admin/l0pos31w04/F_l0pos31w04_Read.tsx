'user client'
import { MyButton } from "@/components/Buttons/Button/MyButton"
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useState } from "react"
import { MRT_ColumnDef } from "mantine-react-table"
import { U0DateToDDMMYYYString } from "@/utils/date"
import { Grid, GridCol, Paper, Tabs } from "@mantine/core"
import { Text } from "@mantine/core"
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import F_ChuaGhepThi_Read from "./F_ChuaGhepThi_Read"
import F_DaGhepThi_Read from "./F_DaGhepThi_Read"
export interface I_l0pos31w04 {
    id?: number; // STT
    studentCode?: string; // Mã sinh viên
    name?: string //họ tên
    birthDate?: Date //Ngày sinh
    sex?: string //Giới tính
    classCode?: string //Mã lớp
    courseCode?: string //mã khóa
    subjectCode?: string //Mã môn học
    subjectName?: string //Tên môn học
    subjectGroup?: string //Nhóm môn học
    semYearStart?: string //năm học kỳ bắt đầu
    exam?:string// kỳ thi
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
export default function F_l0pos31w04_Read() 
{
    const [activeTab, setActiveTab] = useState<string | null>("chuaghepthi");
       
   
        
        return (
            <Paper p={"md"}>
            <Tabs
            color="teal"
            variant="pills"
            defaultValue="chuaghepthi"
            value={activeTab}
            onChange={setActiveTab}
>
        <Tabs.List>
            <Tabs.Tab
            value="chuaghepthi"
            style={{
                backgroundColor: activeTab === "chuaghepthi" ? "teal" : "rgba(85, 83, 83, 0.3)",
                color: activeTab === "chuaghepthi" ? "white" : "black",
            }}
            >
            Chưa ghép thi
            </Tabs.Tab>
            
            <Tabs.Tab
            value="daghepthi"
            style={{
                backgroundColor: activeTab === "daghepthi" ? "teal" : "rgba(85, 83, 83, 0.3)",
                color: activeTab === "daghepthi" ? "white" : "black",
            }}
            >
            Đã ghép thi
            </Tabs.Tab>
        </Tabs.List>
    
            <Tabs.Panel value="chuaghepthi">
                <F_ChuaGhepThi_Read />
            </Tabs.Panel>
    
            <Tabs.Panel value="daghepthi">
               <F_DaGhepThi_Read/>
            </Tabs.Panel>
    
            </Tabs>
            </Paper>
            );
}