import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";

interface Props {
    facultyIds?: number[]
}
//[ ] Chờ API export
export default function SchoolStatisticsReportExport({ facultyIds }: Props) {
    console.log(facultyIds);
    return (
        <CustomButton
            actionType='export'
            onClick={() => {
                console.log(facultyIds);

            }}
        />
    )
}
