import { service_timeType } from "@/api/services/service_timeType";
import { ITimeType } from "@/interfaces/timeType";
import { isNotEmpty, useForm } from "@mantine/form";
import { MyNumberInput, MyTextInput } from "aq-fe-framework/components";
import { MyButtonCreateUpdate } from "aq-fe-framework/core";
import { utils_validator_validateCode } from "aq-fe-framework/utils";
import { useEffect } from "react";


export default function F_timeType_CreateUpdateTimeType({
    values
}: {
    values?: ITimeType
}) {
    const form = useForm<ITimeType>({
        mode: "uncontrolled",
        validate: {
            code: utils_validator_validateCode,
            name: isNotEmpty("Không được để trống"),
        }
    });

    useEffect(() => {
        form.setValues(values ? values : {
            code: "",
            name: "",
            classPeriodMorning: 0,
            classPeriodAfternoon: 0,
            classPeriodEvening: 0,
        })
    }, [values])

    function handleSubmit(formValues: ITimeType) {
        // Lấy ra tổng số tiết trong 1 ngày
        const totalPeriod =
            formValues.classPeriodMorning! +
            formValues.classPeriodAfternoon! +
            formValues.classPeriodEvening!;

        // Có bao nhiêu tiết thì tạo bấy nhiêu object TimeType
        const timeTypeDetails = Array.from({ length: totalPeriod }).map((_, idx) => {
            const startTime = new Date();
            const defaultFirstPeriodTime = 7
            const defaultPeriodRangeTime = 50
            const defaultPeriodRealTime = 45

            startTime.setUTCHours(defaultFirstPeriodTime, 0, 0, 0);

            // Cộng thêm 50 phút mỗi index
            startTime.setUTCMinutes(startTime.getMinutes() + idx * defaultPeriodRangeTime);

            // Trả về object TimeType
            return ({
                id: 0,
                code: "T-" + (idx + 1), // Mặc định ghi vào db cho dễ tìm chứ không dùng để hiển thị
                name: "Tiết " + (idx + 1), // Mặc định ghi vào db cho dễ tìm chứ không dùng để hiển thị
                isEnabled: true,
                minuteNumber: defaultPeriodRealTime,
                order: idx,
                startHour: startTime
            }) as ITimeType
        })

        if (!values) {
            return service_timeType.create({
                ...formValues,
                timeTypeDetails: timeTypeDetails
            })
        }

        let timeTypeChange = values.timeTypeDetails

        if (timeTypeDetails.length != values.timeTypeDetails?.length) {
            const deleteOldTimeType = values.timeTypeDetails?.map(item => ({
                ...item,
                isEnabled: false,
            })) ?? [];
            timeTypeChange = [...deleteOldTimeType, ...timeTypeDetails];
        }

        return service_timeType.update({
            ...formValues,
            timeTypeDetails: timeTypeChange
        })
    }
    return (
        <MyButtonCreateUpdate
            form={form}
            onSubmit={handleSubmit}
            isUpdate={!!values}
        >
            <MyTextInput
                readOnly={!!values}
                variant={values ? "filled" : "default"}
                label="Mã thời gian"
                {...form.getInputProps("code")}
            />
            <MyTextInput
                label="Tên thời gian"
                {...form.getInputProps("name")}
            />
            <MyNumberInput
                label="Sáng"
                max={30}
                {...form.getInputProps("classPeriodMorning")}
            />
            <MyNumberInput
                label="Chiều"
                max={30}
                {...form.getInputProps("classPeriodAfternoon")}
            />
            <MyNumberInput
                label="Tối"
                max={30}
                {...form.getInputProps("classPeriodEvening")}
            />
        </MyButtonCreateUpdate>
    )
}


