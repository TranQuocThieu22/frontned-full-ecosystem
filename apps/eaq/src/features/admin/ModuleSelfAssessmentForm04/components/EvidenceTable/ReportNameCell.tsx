import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import React from 'react'

export default function ReportNameCell({
    rowKey,
    currentReportName,
    isDuplicate,
    editMode,
    onChange,
}: ReportNameCellProps) {
    return (
        <CustomTextInput
            value={currentReportName}
            readOnly={!editMode}
            error={isDuplicate ? "Trùng mã" : undefined}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}


interface ReportNameCellProps {
    rowKey: string;
    currentReportName: string;
    isDuplicate: boolean;
    editMode?: boolean;
    onChange: (value: string) => void;
}

