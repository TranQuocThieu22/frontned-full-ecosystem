'use client'
import { Affix, Button, Dialog, Flex, Rating, Text, Transition } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { IconMessageCircle, IconUpload } from "@tabler/icons-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MyCenterFull, MyFileInput, MyTextArea, MyTextInput } from "aq-fe-framework/components"
import { utils_notification_show } from "aq-fe-framework/utils"

interface I {
    title: string;
    content: string;
    file?: number;
    rating: number;
}

export default function F_zr8z26fbqn_SendNotification() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const queryClient = useQueryClient();

    const onSubmit = (values: I) => {

    }

    const form = useForm<I>({
        mode: "uncontrolled",
        initialValues: {
            title: "",
            content: "",
            file: undefined,
            rating: 3.5,
        },
        validate: {
            title: (value) => value ? null : 'Không được để trống',
            content: (value) => value ? null : 'Không được để trống',
        },
    });

    const mutation = useMutation({
        mutationFn: async (values: I) => await onSubmit!(values),
        onSuccess: () => {
            queryClient.invalidateQueries();
            utils_notification_show({ message: "Gửi phản hồi thành công" });
            close();
            form.reset();
        },
        onError: () => {

        },
    });

    return (
        <>
            <Affix position={{ bottom: 10, right: 10 }}>
                <Transition transition="slide-up" mounted={true}>
                    {(transitionStyles) => (
                        <Button
                            leftSection={<IconMessageCircle size={18} />}
                            style={transitionStyles}
                            onClick={toggle}
                            radius="xl"
                            size="md"
                            color="blue"
                        >
                            Phản hồi
                        </Button>
                    )}
                </Transition>
            </Affix>

            <Dialog
                opened={opened}
                withCloseButton
                onClose={close}
                size="lg"
                radius="md"
                shadow="lg"
                position={{ bottom: 10, right: 10 }}
                transitionProps={{
                    transition: "pop-bottom-right",
                    duration: 300,
                    timingFunction: 'ease',
                }}
            >
                <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
                    <Text fz="h5" mb="xs" fw={500}>Gửi phản hồi đến trung tâm</Text>
                    <MyTextInput
                        mb="xs"
                        label="Tiêu đề"
                        {...form.getInputProps('title')}
                    />
                    <MyTextArea
                        mb="xs"
                        label="Nội dung chi tiết"
                        minRows={10}
                        {...form.getInputProps('content')}
                    />
                    <MyFileInput
                        mb="xs"
                        label="File đính kèm"
                        leftSection={<IconUpload />}
                        {...form.getInputProps('file')}
                    />
                    <Text fw={500} size="sm" mb={3}>Đánh giá trải nghiệm</Text>
                    <MyCenterFull>
                        <Rating
                            fractions={2}
                            size="3rem"
                            value={form.values.rating}
                            onChange={(value) => form.setFieldValue('rating', value)}
                        />
                    </MyCenterFull>
                    <Flex mt="sm" justify="flex-end" direction="row">
                        <Button type="submit" color="#09b027">
                            Gửi
                        </Button>
                    </Flex>
                </form>
            </Dialog>
        </>
    );
}
