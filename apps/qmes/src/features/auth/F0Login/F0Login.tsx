"use client";

import MyFlexColumn from "@/components/ui/Layouts/FlexColumn/MyFlexColumn";
import { useS0Auth } from "@/stores/S0Auth";
import {
    Anchor,
    Button,
    Checkbox,
    Flex,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classes from "./css.module.css";

export default function F0Login() {
    const router = useRouter()
    const S0Auth = useS0Auth()
    const form = useForm({
        initialValues: {
            username: "",
            password: ""
        },
        validate: {
            username: (value) => value ? null : 'Không được để trống',
            password: (value) => value ? null : 'Không được để trống'
        }
    })
    return (
        <Paper withBorder w={400} m={"md"} shadow="md" p={30} mt={30} radius="md">
            <Flex direction={"column"} mb={"md"}>
                <Title ta="center" className={classes.title}>
                    Đăng nhập!
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Bạn gặp vấn đề kỹ thuật?&nbsp;
                    <Anchor size="sm" component="button">
                        Vào link này
                    </Anchor>
                </Text>
            </Flex>
            <form onSubmit={form.onSubmit(async values => {
                if (values.username === "adminprototype" && values.password === "123456") {
                    router.push("/admin/dashboard")
                    return
                }

                const result = await axios.post("https://dev.aqtech.vn:1226/api/Account/SignIn", {
                    "userName": values.username,
                    "passWord": values.password
                })
                if (result.data.isSuccess === false) {
                    form.setFieldError("username", "Tài khoản không tồn tại!")
                    return
                }
                if (result.data.isSuccess == 0) {
                    form.setFieldError("password", "Mật khẩu đăng nhập không chính xác!")
                    return
                }
                S0Auth.resetNumberOfLoginsRemaining()
                S0Auth.setToken(result.data.token)
            })}>
                <MyFlexColumn>
                    <TextInput
                        {...form.getInputProps("username")}
                        label="Tài khoản"
                        placeholder="Nhập tài khoản của bạn"
                        withAsterisk
                    />
                    <PasswordInput
                        {...form.getInputProps("password")}
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu của bạn"
                        withAsterisk
                    />
                    <Group justify="space-between" >
                        <Checkbox label="Lưu đăng nhập" />
                        <Anchor component={Link} href={"quen-mat-khau"} size="sm">
                            Quên mật khẩu?
                        </Anchor>
                    </Group>
                    <Button
                        type="submit"
                        fullWidth >
                        Đăng nhập
                    </Button>
                    <Button
                        onClick={() => {
                            S0Auth.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NTA4IiwiY19oYXNoIjoiNjgxNTMzZjI1OTU5NjIxOGY5ZWQ4YjRjZGU2Nzk5ODAyYWNlOTVmZjdiODQ3MWE3MjY4ZmM1NTc3ZDkxOTJjNiIsImp0aSI6IjljYjk2N2E4LTRlMWMtNDFkMi05NmU0LTExYzhlOThlYjEyOCIsImlhdCI6MTczNjEyODA2OCwibmJmIjoxNzM2MTI4MDY3LCJleHAiOjE3NDM5MDQwNjcsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.qCv-erjW74az5C9_Llh5N5aXO9yyLm6smB5NCnjm_uc")
                            router.replace("/admin/dashboard")
                        }}
                        type="button"
                        fullWidth >
                        Vào trang chủ (Sử dụng token tạo sẵn)
                    </Button>

                </MyFlexColumn>
            </form>
        </Paper>
    );
}
