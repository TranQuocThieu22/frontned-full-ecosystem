import { EnumSurveyType, EnumSurveyTypeLabel } from "@/enums/EnumSurveyType";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MySelect, MyTextInput } from "aq-fe-framework/components";
import { utils_converter_mapEnumToSelectData } from "aq-fe-framework/utils";
import { useState } from "react";
import { courseOptions, ISurveyInTable, subjectOptions } from "./ManageSurveyFormTable";

export default function SurveyEditButton({ data }: { data: ISurveyInTable }) {
    const [surveyType, setSurveyType] = useState(data.surveyType.toString());

    const form = useForm<ISurveyInTable>({
        initialValues: {
            ...data
        }
    })


    return (
        <MyActionIconUpdate
            onSubmit={() => { }}
            form={form}
            title="Sửa phiếu"
        >
            <MyTextInput label="Mã phiếu" {...form.getInputProps("code")} />
            <MyTextInput label="Tên phiếu" {...form.getInputProps("name")} />
            <MySelect
                label="Loại khảo sát"
                data={utils_converter_mapEnumToSelectData(EnumSurveyType, EnumSurveyTypeLabel)}
                value={surveyType}
                onChange={(value) => {
                    if (value !== null) {
                        setSurveyType(value);
                    }
                }}
            />
            {surveyType === "22" || surveyType === "23" || surveyType === "24"
                ? <>
                    <MySelect
                        label="Khóa"
                        data={courseOptions}
                        defaultValue={courseOptions[0]?.value}
                        {...form.getInputProps("course")}
                    />
                </>
                : <></>
            }
            {surveyType === "22"
                ? <>
                    <MySelect
                        label="Môn học"
                        data={subjectOptions}
                        defaultValue={subjectOptions[0]?.value}
                        {...form.getInputProps("subject")}
                    />
                </>
                : <></>
            }
        </MyActionIconUpdate>
    );
}