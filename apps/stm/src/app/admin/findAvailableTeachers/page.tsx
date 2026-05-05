"use client"
import Teacher_AvailableTeacherTable from "@/module/teacher/adapter/Teacher_AvailableTeacherTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { MyFieldset } from "aq-fe-framework/components";
import FindAvailableTeachers_Filter from "../../../features/admin/findAvailableTeachers/FindAvailableTeachers_Filter";

export default function Page() {
    return (
        <CustomPageContent>
            <FindAvailableTeachers_Filter />
            <MyFieldset title="Danh sách giảng viên rảnh">
                <Teacher_AvailableTeacherTable />
            </MyFieldset>
        </CustomPageContent>
    )
}
