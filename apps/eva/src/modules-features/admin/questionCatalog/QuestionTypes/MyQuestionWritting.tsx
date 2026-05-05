"use client"

import {
    MyFieldset
} from "aq-fe-framework/components"
import {
    MyFlexColumn, MyRichTextEditor
} from "aq-fe-framework/core"
import { useMemo } from "react"

export interface IQuestionWrittingAnswer {
    id?: number
    answer?: string
    explain?: string
}

interface MyQuestionWrittingProps {
    value?: IQuestionWrittingAnswer
    onChange?: (value: IQuestionWrittingAnswer) => void
}

export default function MyQuestionWritting(props: MyQuestionWrittingProps) {
    const answers = useMemo(() => props.value, [props.value])
    return (
        <MyFieldset title="Danh sách lựa chọn" >
            <MyFlexColumn>
                {/* Nhập nội dung + phân tích đáp án */}
                <MyRichTextEditor
                    value={props.value?.answer}
                    onBlur={content => props.onChange?.({ ...answers, answer: content })}
                    richTextEditorContentProps={{
                        mih: 50
                    }}
                    inputWrapperProps={{ label: "Đáp án" }}
                />
                <MyRichTextEditor
                    value={props.value?.explain}
                    onBlur={explain => props.onChange?.({ ...answers, explain: explain })}
                    richTextEditorContentProps={{
                        mih: 50
                    }}
                    inputWrapperProps={{ label: "Phân tích đáp án" }}
                />
            </MyFlexColumn>

        </MyFieldset>
    )
}
