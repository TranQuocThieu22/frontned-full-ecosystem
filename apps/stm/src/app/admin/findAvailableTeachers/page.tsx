"use client"
import Teacher_AvailableTeacherTable from "@/module/teacher/adapter/Teacher_AvailableTeacherTable";
import { MyFieldset, MyPageContent } from "aq-fe-framework/components";
import FindAvailableTeachers_Filter from "../../../modules-features/admin/findAvailableTeachers/FindAvailableTeachers_Filter";

export default function Page() {
    return (
        <MyPageContent>
            <FindAvailableTeachers_Filter />
            <MyFieldset title="Danh sách giảng viên rảnh">
                <Teacher_AvailableTeacherTable />
            </MyFieldset>
        </MyPageContent>
    )
}
