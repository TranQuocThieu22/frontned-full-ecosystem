import { enum_gradingScale, enumLabel_gradingScale } from "@/shared/consts/enum/enum_gradingScale";
import { MyFlexColumn, MySelect, MyTextInput } from "aq-fe-framework/core";
import { utils_converter_mapEnumToSelectData } from "aq-fe-framework/utils";

export default function F_examPaper_GeneralInfo() {
    return (
        <MyFlexColumn>
            <MyTextInput label="Mã đề chuẩn" />
            <MyTextInput label="Tên đề chuẩn" />
            <MyTextInput label="Số lượng câu hỏi" />
            <MySelect data={utils_converter_mapEnumToSelectData(enum_gradingScale, enumLabel_gradingScale)} />
        </MyFlexColumn>
    )
}
