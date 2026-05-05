import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import Shared_ScoreSheetTemplate, { Shared_ScoreSheetTemplateProps } from "../../CLOAssessmentReport/Shared_ScoreSheetTemplate";

interface Feat_PrintReportProps extends Shared_ScoreSheetTemplateProps {
    disable?: boolean
}

export default function Fake_PrintReport(props: Feat_PrintReportProps) {
    return (
        <CustomButtonPrintPDF buttonProps={{ children: "In kết quả đo lường CLO", disabled: props.disable }}>
            <Shared_ScoreSheetTemplate {...props} />
        </CustomButtonPrintPDF>
    )
}
