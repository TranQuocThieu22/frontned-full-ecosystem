"use client"
import PaymentDiscountTable from "@/features/paymentDiscount/PaymentDiscountTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
  return (
    <CustomPageContent>
      <PaymentDiscountTable />
    </CustomPageContent>
  )
}