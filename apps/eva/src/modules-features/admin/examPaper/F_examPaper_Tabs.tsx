import { Tabs } from "@mantine/core";
import FeatExamPaperStandardTable from "./F_examPaper_Read";

export default function F_examPaper_Tabs() {
    return (
        <Tabs defaultValue="examPaperStandard" id="F_examPaper_Tabs">
            <Tabs.List>
                <Tabs.Tab value="examPaperStandard" >
                    Đề chuẩn
                </Tabs.Tab>
                <Tabs.Tab value="examPaperpermutation" >
                    Đề hoán vị
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="examPaperStandard" pt={'md'}>
                <FeatExamPaperStandardTable />
            </Tabs.Panel>

            <Tabs.Panel value="examPaperpermutation" pt={'md'}>
                {/* <PermutationExamPaperRead /> */}
                a
            </Tabs.Panel>
        </Tabs>
    )
}
