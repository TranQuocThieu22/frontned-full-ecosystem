import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import Shared_SoreSheetTemplate, { Shared_ScoreSheetTemplateProps } from "./Shared_ScoreSheetTemplate";

interface Feat_PrintReportProps extends Shared_ScoreSheetTemplateProps {
    disable?: boolean
}

export default function Feat_PrintReport(props: Feat_PrintReportProps) {
    return (
        <CustomButtonPrintPDF buttonProps={{ children: "In phiếu điểm", disabled: props.disable }}>
            <Shared_SoreSheetTemplate {...props} />
        </CustomButtonPrintPDF>
    )
}
