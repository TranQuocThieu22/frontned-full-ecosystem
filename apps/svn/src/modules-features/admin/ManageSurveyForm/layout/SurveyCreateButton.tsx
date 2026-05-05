import { EnumSurveyType, EnumSurveyTypeLabel } from "@/enums/EnumSurveyType";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MySelect, MyTextInput } from "aq-fe-framework/components";
import { utils_converter_mapEnumToSelectData } from "aq-fe-framework/utils";
import { useState } from "react";
import { courseOptions, ISurveyInTable, subjectOptions } from "./ManageSurveyFormTable";

export default function SurveyCreateButton() {
    const [surveyType, setSurveyType] = useState("1");

    const form = useForm<ISurveyInTable>({
        initialValues: {
            code: "",
            name: "",
            surveyType: parseInt(surveyType),
            course: undefined,
            subject: undefined,
        }
    })


    return (
        <MyButtonCreate
            onSubmit={() => { console.log(form) }}
            form={form}
            title="Thêm phiếu"
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

        </MyButtonCreate>
    );
}