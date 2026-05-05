import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import React from 'react'
interface Props {
    facultyIds?: number[]
}
export default function FacultyStatisticsReportExport({ facultyIds }: Props) {
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
