"use client";
import ListPotentialCustomerTable from "@/features/admin/MEListPotentialCustomer/ListPotentialCustomerTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <ListPotentialCustomerTable />
        </CustomPageContent>
    );
}