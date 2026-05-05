import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import GradeReportTemplate, { GradeReportTemplateProps } from "./GradeReportTemplate";

interface Feat_PrintReportProps extends GradeReportTemplateProps {
    disable?: boolean
}

export default function PrintGradeReport(props: Feat_PrintReportProps) {
    return (
        <CustomButtonPrintPDF buttonProps={{ children: "In kết quả đo lường PLO", disabled: props.disable }}>
            <GradeReportTemplate {...props} />
        </CustomButtonPrintPDF>
    )
}
