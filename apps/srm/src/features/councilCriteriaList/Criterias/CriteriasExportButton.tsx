import { EnumEvaluationType } from "@/shared/consts/enum/EnumEvaluationType";
import { SRMCriteria } from "@/shared/interfaces/SRMCriteria";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

export default function CriteriasExportButton({ data }: { data: SRMCriteria[] }) {
    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã tiêu chí" },
            { fieldName: "name", header: "Tên tiêu chí" },
            { fieldName: "maxScore", header: "Điểm tối đa" },
            { fieldName: "order", header: "Thứ tự hiển thị" },
            { fieldName: "isRequired", header: "Bắt buộc" },
        ],
    };

    const values = data.map(item => {
        return {
            ...item,
            maxScore: item.evaluationType === EnumEvaluationType.Score ? item?.maxScore : '-',
            isRequired: item?.isRequired ? 'Bắt buộc' : 'Không bắt buộc'
        }
    })

    return (
        <AQButtonExportData
            objectName="danh_sach_tieu_chi"
            data={values || []}
            exportConfig={exportConfig}
        />
    );
}