"use client";

import { service_EAQComment } from "@/shared/APIs/service_EAQComment";
import { IComment } from "@/shared/interfaces/comment/IComment";
import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { useEffect } from "react";

interface Props {
    accessmentId: number,
}

export default function CommentCreateButton({ accessmentId }: Props) {
    const dics = useDisclosure();
    const queryClient = useQueryClient();
    const commentForm = useForm<IComment>({
        initialValues: {
            commentDetail: "",
            content: "",
            eaqSelfAssessmentId: accessmentId ?? -1,
            isEnabled: true
        },
        validate: (values) => {
            return {
                commentDetail: (values.commentDetail ?? "").length > 0 ? null : "Nhận xét không được để trống",
                content: (values.content ?? "").length > 0 ? null : "Nội dung đề cập không được để trống",
            };
        },
    });

    useEffect(() => {
        commentForm.setFieldValue("eaqSelfAssessmentId", accessmentId);
    }, [accessmentId]);

    return (
        <>
            <CustomButton
                actionType="create"
                onClick={() => { dics[1].open() }}
            >
                Thêm nhận xét
            </CustomButton>
            <Modal
                size="70%"
                opened={dics[0]}
                onClose={dics[1].close}
                title={`Thêm bình luận`}
                centered
            >
                <CustomTextArea
                    label="Nội dung đề cập"
                    minRows={3}
                    maxRows={6}
                    placeholder="Nhập nội dung đề cập"
                    {...commentForm.getInputProps("content")}
                />
                <CustomTextArea
                    label="Nhận xét và yêu cầu hiệu chỉnh"
                    minRows={8}
                    maxRows={8}
                    placeholder="Nhập nhận xét và yêu cầu hiệu chỉnh"
                    {...commentForm.getInputProps("commentDetail")}
                />
                <CustomButton
                    fullWidth
                    mt="md"
                    type="submit"
                    onClick={async () => {
                        if (commentForm.validate().hasErrors) return;

                        const response = await service_EAQComment.create(commentForm.values);

                        if (response.data.isSuccess === 1) {
                            commentForm.reset();
                            notifications.show({
                                color: "green",
                                message: "Lưu bình luận thành công",
                            })
                            queryClient.invalidateQueries();
                            dics[1].close();
                        }
                        else {
                            notifications.show({
                                color: "red",
                                message: "Đã có lỗi xảy ra",
                            })
                        }
                    }}
                >
                    Lưu
                </CustomButton>
            </Modal>
        </>
    );
}
