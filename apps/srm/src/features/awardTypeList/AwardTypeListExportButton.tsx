"use client";

import { SRMAwardType } from "@/shared/interfaces/SRMAwardType";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

export default function AwardTypeListExportButton({ data }: { data: SRMAwardType[] }) {

    const flatData = (data || []).map((item) => ({
        ...item,
        awardLevelCode: item.srmAwardLevelCode || "", // thêm field mới
    }));
    // Cấu hình các cột xuất ra Excel
    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã loại giải thưởng" },
            { fieldName: "name", header: "Tên loại giải thưởng" },
            { fieldName: "awardLevelCode", header: "mã cấp giải thưởng" },
            { fieldName: "note", header: "Ghi chú" },
            { fieldName: "order", header: "Thứ tự hiển thị" },
            { fieldName: "isDeactivate", header: "Không sử dụng" },
        ],
    };

    return (
        <AQButtonExportData
            objectName="danh_sach_loai_giai_thuong"
            data={flatData || []}
            exportConfig={exportConfig}
        />
    );
}
