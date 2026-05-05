
import { Box, Group } from "@mantine/core";
import ManageSurveyFormTable from "./ManageSurveyFormTable";
import SurveyQuickViewDesign from "./SurveyQuickViewDesign";
export default function ManageSurveyFormLayout() {

    return (<>
        <Group wrap="wrap" align="flex-start">
            <Box w={{ base: '100%', md: '49%' }}>
                <ManageSurveyFormTable />
            </Box>
            <Box w={{ base: '100%', md: '49%' }}>
                <SurveyQuickViewDesign />
            </Box>
        </Group>
    </>);
}
