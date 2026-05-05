import AllGradeSubjectMenuCards from "@/features/admin/AppInteraction/AppNavigator/AllMenuGradeSubject/AllGradeSubjectMenuCards";
import { Divider, Text } from "@mantine/core";

export default function Page() {
    return (
        <>
            <Text fw={600} size="lg" >Định nghĩa dữ liệu Chương trình đào tạo</Text>
            {/* <MenuTypeSelect /> */}
            <Divider mt={5} />
            <AllGradeSubjectMenuCards />
        </>
    );
}