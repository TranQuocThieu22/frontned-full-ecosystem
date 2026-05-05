import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_3cntlaxrnz_Read from "@/modules-features/admin/3cntlaxrnz/F_3cntlaxrnz_Read";

//receiptList - Danh sách phiếu thu
export default function Page() {
    return (
        <MyPageContent>
            <F_3cntlaxrnz_Read />
        </MyPageContent>
    );
}