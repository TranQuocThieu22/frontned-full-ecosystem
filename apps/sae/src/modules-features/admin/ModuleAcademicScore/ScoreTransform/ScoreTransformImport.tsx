import { service_scoreTransform } from "@/api/services/service_scoreTransform";
import { ScoreTransform } from "@/interfaces/scoreTransform";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";

export default function ScoreTransformImport() {

    return (
        <CustomButtonImport
            fields={fields}
            fileName="Mẫu import Danh sách thang đo điểm học tập và quy đổi điểm rèn luyện"
            onSubmit={(values) => service_scoreTransform.createList(values)}
        />
    );
}
const fields: FieldOption<ScoreTransform>[] = [
    {
        fieldKey: "averageScore",
        fieldName: "Ngưỡng điểm học tập >=",
        parseType: "number"
    },
    {
        fieldKey: "point",
        fieldName: "Điểm rèn luyện quy đổi",
        parseType: "number"
    },
];
