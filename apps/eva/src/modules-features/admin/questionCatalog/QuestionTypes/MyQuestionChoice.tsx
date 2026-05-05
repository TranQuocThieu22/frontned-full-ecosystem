"use client"

import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject"
import {
    ActionIcon, Button,
    Group,
    Switch,
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

export interface IQuestionChoiceAnswer {
    id?: number,
    content?: string
    isCorrect?: boolean
    density?: number
    explain?: string
    status?: "added" | "modified" | "removed" | "unchanged";
}

interface MyQuestionChoiceProps {
    value?: IQuestionChoiceAnswer[]
    onChange?: (value: IQuestionChoiceAnswer[]) => void
    isMultipleChoice?: boolean
}

export default function MyQuestionChoice({
    value = [], onChange, isMultipleChoice = false
}: MyQuestionChoiceProps) {
    const editingIndexState = useState<number | null>(null)
    const newAnswerState = useState<IQuestionChoiceAnswer>({ content: "", explain: "" })

    // value and onChange
    const answers = useMemo(() => value.map(item => ({ ...item, status: item.status ?? "unchanged" })), [value])
    const setAnswers = useCallback((answersValue: IQuestionChoiceAnswer[]) => onChange?.(answersValue), [onChange])

    // Để toggle thì cần 2 tham số index answer và checked
    const handleToggleIsCorrect = useCallback((index: number, checked: boolean) => {
        let finalAnswer: IQuestionChoiceAnswer[] = []
        // Đối với câu trắc nghiệm 1 đáp án: toggle 1 câu thì bỏ toggle các câu khác, duy nhất 1 câu có trọng số là 100 các câu còn lại là 0
        if (isMultipleChoice == false) {
            finalAnswer = answers.map((item, idx) => {
                if (idx == index) {
                    const newAnswswer = {
                        ...item,
                        isCorrect: checked,
                        density: checked ? 100 : 0,
                        status: item.status == "added" ? "added" : "modified",
                    } as IQuestionChoiceAnswer
                    return newAnswswer
                }
                const newAnswer = {
                    ...item,
                    isCorrect: false,
                    density: 0,
                    status: item.status == "added" ? "added" : "modified"
                } as IQuestionChoiceAnswer
                return newAnswer
            })
        }
        // Đối với câu trắc nghiệm nhiều đáp án: toogle được nhiều câu mỗi lần toggle thì chia đều 100, nếu số lẻ thì + giá trị cho câu cuối
        // Trắc nghiệm nhiều đáp án đúng
        if (isMultipleChoice) {
            const newAnswers = answers.map((item, idx) =>
                idx === index
                    ? { ...item, isCorrect: checked }
                    : item
            );

            const correctItems = newAnswers.filter(a => a.isCorrect);
            const count = correctItems.length;

            let baseDensity = count > 0 ? Math.floor(100 / count) : 0;
            let remainder = count > 0 ? 100 - baseDensity * count : 0;

            finalAnswer = newAnswers.map((item) => {
                if (item.isCorrect) {
                    const isLastCorrect = correctItems.indexOf(item) === count - 1;
                    const density = baseDensity + (isLastCorrect ? remainder : 0);
                    return { ...item, density, status: "modified" };
                }
                return { ...item, density: 0, status: "modified" };
            });
        }

        // Lưu ý câu nào update dựa trên giá trị mặc định nghĩa là unchanged thì sẽ phải chuyển thành status là modified
        setAnswers(finalAnswer)
    }, [answers])


    const handleDeleteAnswer = useCallback((index: number) => {
        const target = answers[index];

        let updated: IQuestionChoiceAnswer[] = [];

        if (target?.status === "added") {
            // Xoá hẳn khỏi danh sách nếu là mới thêm
            updated = answers.filter((_, idx) => idx !== index);
        } else {
            // Cập nhật trạng thái thành "removed"
            updated = answers.map((item, idx) =>
                idx === index ? { ...item, status: "removed" } : item
            );
        }

        setAnswers(updated);
        // Nếu đang chỉnh sửa mục này thì huỷ luôn
        if (editingIndexState[0] === index) {
            editingIndexState[1](null);
            newAnswerState[1]({ content: "", explain: "" });
        }
    }, [answers, setAnswers]);

    const handleAddOrUpdate = useCallback(() => {
        const normalized = utils_text_getNormalizedTextFromHtml(newAnswerState[0].content || "")
        if (!normalized) {
            notifications.show({ message: "Lựa chọn không được để trống", color: "red" })
            return
        }

        const isDuplicate = answers.some((a, i) =>
            utils_text_getNormalizedTextFromHtml(a.content) === normalized && i !== editingIndexState[0]
        )
        if (isDuplicate) {
            notifications.show({ message: "Nội dung lựa chọn không thể trùng nhau", color: "red" })
            return
        }

        if (editingIndexState[0] !== null) {
            const updated = [...answers]
            updated[editingIndexState[0]] = { ...updated[editingIndexState[0]], ...newAnswerState[0], status: "modified" }
            setAnswers(updated)
        } else {
            setAnswers([...answers, { ...newAnswerState[0], isCorrect: false, density: 0, status: "added" }])
        }

        editingIndexState[1](null)
        newAnswerState[1]({ content: "", explain: "", status: "added" })
    }, [newAnswerState[0], editingIndexState[0], answers, setAnswers])



    const columns = useMemo<MRT_ColumnDef<IQuestionChoiceAnswer>[]>(() => [
        {
            header: "Các lựa chọn",
            accessorKey: "content",
            size: 300,
            accessorFn: row => <MyHtmlWrapper html={row.content || ""} />
        },
        {
            header: "Đáp án",
            accessorKey: "isCorrect",
            Cell: ({ row }) => (
                <Switch
                    checked={row.original.isCorrect}
                    label={row.original.isCorrect ? "Đáp án đúng" : "Đáp án sai"}
                    onChange={e => handleToggleIsCorrect(row.index, e.currentTarget.checked)}
                />
            )
        },
        {
            header: "Tỷ trọng",
            accessorKey: "density",
            Cell: ({ row }) => {
                const value = row.original.density || 0;
                if (!isMultipleChoice) return <Text>{row.original.density} %</Text>
                return (
                    <MyNumberInput
                        value={value}
                        min={0}
                        max={100}
                        step={1}
                        onChange={(val) => {
                            const updated = [...answers];
                            updated[row.index]!.density = Number(val) || 0;
                            setAnswers(updated);
                        }}
                        hideControls
                        w={80}
                    />
                );
            }
        },
        {
            header: "Phân tích đáp án",
            accessorKey: "explain",
            accessorFn: (row) => <MyHtmlWrapper html={row.explain || ""} />
        },
        {
            header: "Trạng thái",
            accessorKey: "status"
        }
    ], [handleToggleIsCorrect, answers])

    return (
        <MyFieldset title="Danh sách lựa chọn" >
            <MyFlexColumn>
                <MyDataTable
                    data={answers.filter(item => item.status != "removed")}
                    columns={columns}
                    enableSorting={false}
                    getRowId={(row, i) => `${i}-${row.content}`}
                    mantineTableBodyRowProps={({ row }) => ({
                        style: {
                            cursor: "pointer",
                            backgroundColor: row.index === editingIndexState[0] ? colorsObject.mantineBackgroundBlueLight : "transparent"
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
                                    editingIndexState[1](row.index)
                                    newAnswerState[1](answers[row.index]!)
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
                    value={newAnswerState[0].content}
                    onBlur={content => newAnswerState[1](prev => ({ ...prev, content }))}
                    richTextEditorContentProps={{
                        bg: editingIndexState[0] !== null ? colorsObject.mantineBackgroundBlueLight : undefined,
                        mih: 50
                    }}
                    inputWrapperProps={{ label: "Nội dung lựa chọn" }}
                />
                <MyRichTextEditor
                    value={newAnswerState[0].explain}
                    onBlur={explain => newAnswerState[1](prev => ({ ...prev, explain }))}
                    richTextEditorContentProps={{
                        bg: editingIndexState[0] !== null ? colorsObject.mantineBackgroundBlueLight : undefined,
                        mih: 50
                    }}
                    inputWrapperProps={{ label: "Phân tích đáp án" }}

                />

                <Group justify="end" mt="md">
                    {editingIndexState[0] !== null && (
                        <Button
                            variant="outline" color="gray"
                            leftSection={<IconX />}
                            onClick={() => {
                                editingIndexState[1](null)
                                newAnswerState[1]({ content: "", explain: "" })
                            }}
                        >
                            Huỷ chỉnh sửa
                        </Button>
                    )}
                    <Button
                        leftSection={editingIndexState[0] !== null ? <IconDeviceFloppy /> : <IconPlus />}
                        color={editingIndexState[0] !== null ? "yellow" : "blue"}
                        onClick={handleAddOrUpdate}
                    >
                        {editingIndexState[0] !== null ? "Cập nhật lựa chọn" : "Thêm lựa chọn"}
                    </Button>
                </Group>
            </MyFlexColumn>

        </MyFieldset>
    )
}
