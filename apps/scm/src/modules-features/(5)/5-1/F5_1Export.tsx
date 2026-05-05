"use client"
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";

export default function F5_1Export({ data }: { data: any }) {
    return (
        <AQButtonExportData data={data} exportConfig={{ fields: [] }} isAllData objectName="" />
    )
}
