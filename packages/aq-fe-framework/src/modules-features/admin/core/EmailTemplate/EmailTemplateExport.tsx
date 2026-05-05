import { useExportData } from "@/hooks";
import { IEmailTemplate } from "@/interfaces";
import { IExportConfig } from "@/utils";
import { MRT_TableInstance } from "mantine-react-table";
import { AQButtonExportData } from "../../../../components";
import { emailTemplateEnum } from "./EmailTemplateTable";

interface Props {
    emailTemplateEnum: emailTemplateEnum
    table: MRT_TableInstance<IEmailTemplate>
}

export default function EmailTemplateExport({ emailTemplateEnum, table }: Props) {
    const { data } = useExportData(table)
    const exportConfig: IExportConfig<IEmailTemplate> = {
        fields: [
            {
                header: "Tiêu đề thông báo",
                fieldName: "name"
            },
            {
                header: "Loại hành động",
                fieldName: "type",
                formatFunction: (value: string | number | boolean | Date | undefined, row: IEmailTemplate) => {
                    const typeKey = (value as number) || 0;
                    return emailTemplateEnum.emailTemplateEnum[typeKey] || "Không xác định";
                }
            },
        ]
    }

    return (
        <AQButtonExportData
            objectName="Mau_mail_thong_bao"
            data={data || []}
            exportConfig={exportConfig}
        />
    )
}
