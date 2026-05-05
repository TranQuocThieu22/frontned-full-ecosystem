"use client"
import { Button, Paper, Space } from "@mantine/core";
import { MyFlexRow } from "aq-fe-framework/components";
import useS_TestRoom from '../useS_TestRoom';
import F_testRoom_QuestionChoice from "./F_testRoom_QuestionChoice";

export default function F_TestRoom_SingleQuestion() {
    const store = useS_TestRoom()
    return (
        <Paper p={'md'}>
            <F_testRoom_QuestionChoice
                title="Từ khóa chọn trong SQL là gì?"
                questionIndex={1}
                radioGroupProps={{
                    defaultValue: "1"
                }}
                options={[
                    { value: "1", label: "Select" },
                    { value: "2", label: "Delete" },
                    { value: "3", label: "submit" },
                    { value: "4", label: "Repeat" }
                ]}
            />
            <Space />
            <MyFlexRow align={'center'} justify={'center'} gap={10}>
                <Button bg={"gray"}>Trở về</Button>
                <Button onClick={() => {
                    store.setState({ isComplete: true })
                }}>Tiếp tục</Button>
            </MyFlexRow>
        </Paper>
    )
}
