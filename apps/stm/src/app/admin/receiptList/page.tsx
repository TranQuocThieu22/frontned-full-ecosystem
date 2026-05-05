import F_3cntlaxrnz_Read from "@/features/admin/3cntlaxrnz/F_3cntlaxrnz_Read";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

//receiptList - Danh sách phiếu thu
export default function Page() {
    return (
        <CustomPageContent>
            <F_3cntlaxrnz_Read />
        </CustomPageContent>
    );
}