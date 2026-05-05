'use client'
import { canPrintEnrollment } from "@/features/auth/PageAuthorization/PLO-report-result-summary-enrollment-batch.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomFlexIconTitle } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomFlexIconTitle";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Flex, Paper, Space } from "@mantine/core";
import { GraduationCap } from "lucide-react";
import F_FilterGrade from "./FilterGrade/F_FilterGrade";
import GradeReportRead from "./PrintGradeReport/GradeReportRead";

export default function GradeReportLayout() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <Flex direction={"column"}>
            <Paper p={"md"}>

                <CustomFlexIconTitle icon={<GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />}>
                    Thông tin chương trình
                </CustomFlexIconTitle>
                <F_FilterGrade />
                <Space />
                {canPrintEnrollment(userStore, userPermissionStore) && <GradeReportRead />}
            </Paper>
        </Flex>
    )
}
