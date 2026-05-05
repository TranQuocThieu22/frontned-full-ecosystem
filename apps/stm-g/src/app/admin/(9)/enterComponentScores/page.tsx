import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F9_2ClassScoreTable from "@/modules-features/(9)/9-2/F9_2ClassScoreTable";

export default function Page() {
    return (
        <>
            <MyPageContent title="Nhập điểm thành phần">
                <F9_2ClassScoreTable />
            </MyPageContent>
        </>
    );
}