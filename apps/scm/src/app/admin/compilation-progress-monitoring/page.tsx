'use client';
import CompilationProgressMonitoringTable from "@/modules-features/ModuleCompilationProgressMonitoring/CompilationProgressMonitoringTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <CompilationProgressMonitoringTable />
        </MyPageContent>
    )
}
