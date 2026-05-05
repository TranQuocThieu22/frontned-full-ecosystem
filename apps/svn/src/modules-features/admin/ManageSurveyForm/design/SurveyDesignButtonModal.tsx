import { useDisclosure } from "@mantine/hooks";
import { MyButtonModal } from "aq-fe-framework/components";
import SurveyDesignMiddleTab from "./SurveyDesignMiddleTab";


export default function SurveyDesignButtonModal() {
    const disclosure = useDisclosure();

    return (
        <MyButtonModal
            label="Thiết kế"
            fullScreen
            title="Thiết kế khảo sát"
            disclosure={disclosure}
        >
            <SurveyDesignMiddleTab />
        </MyButtonModal>
    )
}