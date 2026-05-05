import EnterComponentScoresTable from "@/features/admin/enterComponentScores/EnterComponentScoresTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent title="Nhập điểm thành phần">
            <EnterComponentScoresTable />
        </CustomPageContent>
    );
}
