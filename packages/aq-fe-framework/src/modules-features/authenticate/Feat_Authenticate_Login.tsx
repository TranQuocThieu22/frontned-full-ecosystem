"use client";
import { MyFlexColumn } from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { IPagePermission } from "@/interfaces";
import baseAxios from "@/shared/config/baseAxios";
import { useStore_Permission } from "@/stores/useStore_Permission";
import {
    Anchor,
    BackgroundImage,
    Button,
    ButtonProps,
    Center,
    Checkbox,
    Flex,
    Group,
    Paper,
    PasswordInput,
    TextInput,
    Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link.js";
import { useRouter } from "next/navigation.js";
import { ReactNode, useEffect } from "react";
import { useStore_Authenticate } from "./useStore_Authenticate";

interface ILoginInfo {
    username?: string,
    password?: string,
}

interface IData {
    workingUnitId?: number
    userName?: string,
    userId?: number,
    userFullName?: string
    token?: string
    roleIds?: number[]
    permissions?: IPagePermission[]
}
interface IResponseData {
    data?: IData
    isSuccess?: number | boolean,
    message?: string
}

interface Feat_Authenticate_LoginProps {
    header?: ReactNode
    showLoginButton?: boolean
    redirectUrlAfterLogin?: string
    additionalActions?: ReactNode
    siteUrl?: string
    backgroundImage?: string
    showSaveLogin?: boolean //Ẩn save login
    showForgotPassword?: boolean // Ẩn forgot password
    onSuccess?: (data?: IResponseData) => void,
    onError?: (data: Error) => void
    customSubmit?: (username?: string, password?: string) => void
    loginButtonProps?: ButtonProps
    /** ✅ Cho phép truyền axios từ bên ngoài */
    // customAxios?: AxiosInstance;
}

export function Feat_Authenticate_Login({
    header,
    redirectUrlAfterLogin = "/admin/dashboard",
    additionalActions,
    siteUrl = "",
    backgroundImage = `/imgs/0/IMG0AuthBackground.png`,
    onSuccess,
    showLoginButton = true,
    showSaveLogin = true,
    showForgotPassword = true,
    customSubmit,
    onError,
    loginButtonProps,
    // customAxios
}: Feat_Authenticate_LoginProps) {
    const router = useRouter()
    const authenticateStore = useStore_Authenticate()
    const permissionStore = useStore_Permission()
    // const axiosInstance = customAxios || baseAxios;
    const mutation = useMutation({
        mutationFn: async (values: { userName?: string, passWord?: string }) => {
            const result = await baseAxios.post("/Account/SignIn", values)
            return result.data
        }
    })
    const form = useForm<ILoginInfo>({
        initialValues: {
            username: "",
            password: ""
        },
        validate: {
            username: (value) => value ? null : 'Không được để trống',
            password: (value) => value ? null : 'Không được để trống'
        }
    })

    useEffect(() => {
        form.setValues({
            username: authenticateStore.state?.username || "",
            password: ""
        })
        if (process.env.NEXT_PUBLIC_APP_PROTOTYPE != "1") return
        form.setValues({
            username: "admin",
            password: "123456"
        })
    }, [authenticateStore.state.username])



    function handleSubmit(userName?: string, passWord?: string) {
        if (customSubmit) {
            return customSubmit(userName, passWord)
        }
        mutation.mutate({
            "userName": userName,
            "passWord": passWord
        }, {
            onSuccess: (data: IResponseData) => {
                if (data.isSuccess === false) {
                    form.setFieldError("username", "Tài khoản không tồn tại")
                    return
                }
                if (data.isSuccess == 0) {
                    form.setFieldError("password", data.message)
                    return
                }

                authenticateStore.setProperty("code", data.data?.userName)
                authenticateStore.setProperty("fullName", data.data?.userFullName)
                authenticateStore.setProperty("userId", data.data?.userId)
                authenticateStore.setProperty("token", data.data?.token)
                authenticateStore.setProperty("roleIds", data.data?.roleIds)

                authenticateStore.setProperty("workingUnitId", data.data?.workingUnitId)

                if (authenticateStore.state.saveLogin == true) {
                    authenticateStore.setProperty("username", userName)
                } else {
                    authenticateStore.setProperty("username", "")
                }

                // Lưu permission sau khi đăng nhập
                permissionStore.setProperty("permission", data.data?.permissions)

                if (onSuccess) {
                    onSuccess(data)
                    return
                }
                router.replace(redirectUrlAfterLogin)
            },
            onError: (error) => {
                notifications.show({
                    message: "Có lỗi xảy ra vui lòng thử lại",
                    color: "red"
                })
                onError?.(error)
            }
        })
    }
    return (
        <BackgroundImage
            src={`${siteUrl}${backgroundImage}`}
            h={'100vh'}
        >
            <Center h={'100vh'}>
                <Paper withBorder w={400} m={"md"} shadow="md" p={30} mt={30} radius="md">
                    {
                        header ? header :
                            <Flex direction={"column"} mb={"md"}>
                                <Title ta="center" fw={'900'}>
                                    Đăng nhập!
                                </Title>
                                {/* <Text c="dimmed" size="sm" ta="center" mt={5}>
                                    Bạn gặp vấn đề kỹ thuật?&nbsp;
                                    <Anchor size="sm" component="button">
                                        Vào link này
                                    </Anchor>
                                </Text> */}
                            </Flex>
                    }
                    <form onSubmit={form.onSubmit(async values => handleSubmit(values.username, values.password))}>
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
                                {showSaveLogin && <Checkbox
                                    checked={authenticateStore.state.saveLogin}
                                    onChange={e => authenticateStore.setProperty("saveLogin", e.currentTarget.checked)}
                                    label="Lưu đăng nhập"
                                />}
                                {showForgotPassword && <Anchor component={Link} href={"quen-mat-khau"} size="sm">
                                    Quên mật khẩu?
                                </Anchor>}
                            </Group>
                            {showLoginButton &&
                                <Button
                                    loading={mutation.isPending}
                                    type="submit"
                                    fullWidth
                                    {...loginButtonProps}
                                >
                                    Đăng nhập
                                </Button>
                            }
                            {additionalActions}
                        </MyFlexColumn>
                    </form>
                </Paper>
            </Center>
        </BackgroundImage>

    );
}

