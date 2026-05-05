import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyFieldset } from "aq-fe-framework/components";
import { useS_examPaper } from "../useS_examPaper";
import F_examPaper_QuestionSelected from "./SubFeat/F_examPaper_QuestionSelected";
import F_examPaper_SelectFromBank from "./SubFeat/F_examPaper_SelectFromBank";

export default function F_examPaper_CreateUpdate({ values }: { values?: any }) {
    const form = useForm()
    const store = useS_examPaper()
    return (
        <CustomButtonCreateUpdate
            form={form} onSubmit={() => { }}
            modalProps={{ fullScreen: true }}
            buttonProps={{
                children: "Tạo đề chuẩn",
            }}
            isUpdate={!!values}
        >
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <MyFieldset title="Ngân hàng câu hỏi">
                    <F_examPaper_SelectFromBank />
                </MyFieldset>
                <MyFieldset title="Thông tin đề chuẩn">
                    <F_examPaper_QuestionSelected />
                </MyFieldset>
            </SimpleGrid>
        </CustomButtonCreateUpdate>
    )
}
