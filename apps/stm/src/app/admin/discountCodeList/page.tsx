import DiscountCodeListTable from "@/features/admin/discountCodeList/DiscountCodeListTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
  return (
    <CustomPageContent>
      <DiscountCodeListTable />
    </CustomPageContent>
  )
}
