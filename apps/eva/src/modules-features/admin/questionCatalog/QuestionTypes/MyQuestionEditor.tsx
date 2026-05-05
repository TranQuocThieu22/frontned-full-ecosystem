"use client"

import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject"
import {
    ActionIcon, Button,
    Group,
    Text
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconDeviceFloppy, IconPencil, IconPlus, IconX } from "@tabler/icons-react"
import {
    MyCenterFull, MyDataTable, MyFieldset, MyHtmlWrapper,
    MyNumberInput
} from "aq-fe-framework/components"
import {
    MyFlexColumn, MyRichTextEditor
} from "aq-fe-framework/core"
import { utils_text_getNormalizedTextFromHtml } from "aq-fe-framework/utils"
import { MRT_ColumnDef } from "mantine-react-table"
import { useCallback, useMemo, useState } from "react"

export interface IQuestionEditorAnswer {
    content?: string
    density?: number
}

interface MyQuestionEditorProps {
    value?: IQuestionEditorAnswer[]
    onChange?: (value: IQuestionEditorAnswer[]) => void
    isMultipleChoice?: boolean
}

export default function MyQuestionEditor({
    value = [], onChange, isMultipleChoice
}: MyQuestionEditorProps) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [newAnswer, setNewAnswer] = useState<IQuestionEditorAnswer>({ content: "", density: 0 })

    const answers = useMemo(() => value, [value])
    const setAnswers = useCallback((next: IQuestionEditorAnswer[]) => onChange?.(next), [onChange])

    const handleDeleteAnswer = useCallback((index: number) => {
        setAnswers(answers.filter((_, i) => i !== index))
    }, [answers, setAnswers])


    const handleAddOrUpdate = useCallback(() => {
        const normalized = utils_text_getNormalizedTextFromHtml(newAnswer.content || "")
        if (!normalized) {
            notifications.show({ message: "Lựa chọn không được để trống", color: "red" })
            return
        }

        const isDuplicate = answers.some((a, i) =>
            utils_text_getNormalizedTextFromHtml(a.content) === normalized && i !== editingIndex
        )
        if (isDuplicate) {
            notifications.show({ message: "Nội dung lựa chọn không thể trùng nhau", color: "red" })
            return
        }

        if (editingIndex !== null) {
            const updated = [...answers]
            updated[editingIndex] = { ...updated[editingIndex], ...newAnswer }
            setAnswers(updated)
        } else {
            setAnswers([...answers, { ...newAnswer }])
        }

        setEditingIndex(null)
        setNewAnswer({ content: "", density: 0 })
    }, [newAnswer, editingIndex, answers, setAnswers])

    const columns = useMemo<MRT_ColumnDef<IQuestionEditorAnswer>[]>(() => [
        {
            header: "Các tiêu chí",
            accessorKey: "content",
            size: 300,
            accessorFn: row => <MyHtmlWrapper html={row.content || ""} />
        },
        {
            header: "Tỷ trọng",
            accessorKey: "density",
            accessorFn: row => <Text>{row.density} %</Text>,
            Cell: ({ row }) => {
                const value = row.original.density ?? 0;
                return (
                    <MyNumberInput
                        hideControls
                        min={0}
                        max={100}
                        rightSection="%"
                        value={value}
                        onChange={(newValue) => {
                            const next = [...answers];
                            next[row.index] = {
                                ...next[row.index],
                                density: typeof newValue === "number" ? newValue : 0
                            };
                            setAnswers(next);
                        }}
                    />
                );
            }
        },


    ], [answers, newAnswer])

    return (
        <MyFieldset title="Tiêu chí chấm điểm" >
            <MyFlexColumn>
                <MyDataTable
                    data={answers}
                    columns={columns}
                    enableSorting={false}
                    getRowId={(row, i) => `${i}-${row.content}`}
                    mantineTableBodyRowProps={({ row }) => ({
                        style: {
                            cursor: "pointer",
                            backgroundColor: row.index === editingIndex ? colorsObject.mantineBackgroundBlueLight : "transparent"
                        }
                    })}
                    mantineTopToolbarProps={() => ({
                        style: {
                            display: "none"
                        }
                    })}
                    mantineBottomToolbarProps={() => ({
                        style: {
                            display: "none"
                        }
                    })}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <ActionIcon
                                color="yellow"
                                onClick={() => {
                                    setEditingIndex(row.index)
                                    setNewAnswer(answers[row.index]!)
                                }}
                            ><IconPencil /></ActionIcon>
                            <ActionIcon color="red" onClick={() => handleDeleteAnswer(row.index)}>
                                <IconX />
                            </ActionIcon>
                        </MyCenterFull>
                    )}
                />

                {/* Nhập nội dung + phân tích đáp án */}
                <MyRichTextEditor
                    value={newAnswer.content}
                    onBlur={content => setNewAnswer(prev => ({ ...prev, content }))}
                    richTextEditorContentProps={{
                        bg: editingIndex !== null ? colorsObject.mantineBackgroundBlueLight : undefined,
                        mih: 50
                    }}
                    inputWrapperProps={{ label: "Nội dung lựa chọn" }}
                />


                <Group justify="end" mt="md">
                    {editingIndex !== null && (
                        <Button
                            variant="outline" color="gray"
                            leftSection={<IconX />}
                            onClick={() => {
                                setEditingIndex(null)
                                setNewAnswer({ content: "" })
                            }}
                        >
                            Huỷ chỉnh sửa
                        </Button>
                    )}
                    <Button
                        leftSection={editingIndex !== null ? <IconDeviceFloppy /> : <IconPlus />}
                        color={editingIndex !== null ? "yellow" : "blue"}
                        onClick={handleAddOrUpdate}
                    >
                        {editingIndex !== null ? "Cập nhật lựa chọn" : "Thêm lựa chọn"}
                    </Button>
                </Group>
            </MyFlexColumn>

        </MyFieldset>
    )
}
