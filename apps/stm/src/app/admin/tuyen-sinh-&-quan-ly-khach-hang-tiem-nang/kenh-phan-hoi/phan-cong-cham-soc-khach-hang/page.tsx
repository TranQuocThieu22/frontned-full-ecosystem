"use client";
import CustomerCareAssignmentTable from "@/features/admin/ModuleCustomerCareAssignment/CustomerCareAssignmentTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <CustomerCareAssignmentTable />
        </CustomPageContent>
    );
}