import { useDisclosure } from "@mantine/hooks";
import { CustomNumberInput, MyButton, MyButtonModal, MyTextInput } from "aq-fe-framework/core";

export default function FeatRespondentRatingFreeSurveyCreate() {
    const disc = useDisclosure()
    return (
        <MyButtonModal disclosure={disc} modalProps={{ title: "Đáp viên vãng lai" }} buttonProps={{ actionType: "create" }} >
            <MyTextInput withAsterisk label="Họ và đệm" />
            <MyTextInput withAsterisk label="Tên" />
            <MyTextInput label="Đơn vị công tác" />
            <MyTextInput label="Chức vụ" />
            <MyTextInput label="Email" />
            <CustomNumberInput label="Số điện thoại" inputType="number" />
            <MyButton actionType="save" />
        </MyButtonModal>
    )
}
