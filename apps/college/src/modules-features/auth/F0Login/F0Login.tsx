"use client";

import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
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
            username: "admin",
            password: "12345678"
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

                const result = await axios.post("https://dev.aqtech.vn:1226/api/Account/Signin", {
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
                const token = result.data.data.token
                S0Auth.setToken(token)
                router.replace("/admin/1-1")
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
                            S0Auth.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNSIsImNfaGFzaCI6ImExNGVjZjVhYTA1NWQyYWIwNzIwYTlkM2UzOTJmNGQzNTZlYjAxMTcyNzgwODQ5YjhkNWNmZjY1OTZkMzA5MDMiLCJqdGkiOiJkMDU3MTdkZi0yY2M2LTRlNjAtOTNhNy05OTE5YjQyMWQwZTgiLCJpYXQiOjE3NDM2NDkyODYsIm5iZiI6MTc0MzY0OTI4NSwiZXhwIjoxNzUxNDI1Mjg1LCJpc3MiOiJJc3N1ZXIiLCJhdWQiOiJBdWRpZW5jZSJ9.TZXKVFcrChEpNopIz61YXyGAewqcXDsHhC5cfeaW6eQ")
                            router.replace("/admin/1-1")
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
