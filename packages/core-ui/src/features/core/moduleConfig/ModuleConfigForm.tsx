import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { useGetAQModuleQuery } from "@aq-fe/core-ui/shared/hooks/useGetAQModuleQuery";
import { AQModule } from "@aq-fe/core-ui/shared/interfaces/AQModule";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { Center, Grid, Image, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import ModuleConfigSaveButton from "./ModuleConfigSaveButton";


export interface I_moduleConfig_AQModule extends AQModule {
    faviconFile?: File,
    logoFile?: File
}

export default function ModuleConfigForm() {
    const query = useGetAQModuleQuery()
    const form = useForm<I_moduleConfig_AQModule>({
        mode: "uncontrolled",
        validate: {
            faviconFileDetail: (value) => value ? null : "Không được để trống",
            logoFileDetail: (value) => value ? null : "Không được để trống",
        }
    })

    useEffect(() => {
        // Set giá trị mặc định
        if (!query.data) return
        const values = {
            code: query.data.code || "",
            name: query.data.name || "",
            officelName: query.data.officelName || "",
            email: query.data.email || "",
            phoneNumber: query.data.phoneNumber || "",
            registrationDate: new Date(query.data.registrationDate!) || new Date(),
            limiteDate: new Date(query.data.limiteDate!) || new Date(),
            faviconPath: query.data.faviconPath || "",
            logoPath: query.data.logoPath || "",
            faviconFile: new File([], query.data.faviconFileDetail?.fileName!),
            logoFile: new File([], query.data.logoFileDetail?.fileName!),

            faviconFileDetail: query.data.faviconFileDetail,
            logoFileDetail: query.data.logoFileDetail
        }
        form.setInitialValues(values)
        form.setValues(values)
    }, [query.data]);

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_APP_PROTOTYPE == "1") {
            const values = {
                code: "moduleCode",
                name: "moduleName",
                officelName: "Công ty ABC",
                email: "companyABC@gmail.com",
                phoneNumber: "03422122222",
                registrationDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
                limiteDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                faviconPath: "",
                logoPath: "",
                faviconFile: new File([], "favicon.png"),
                logoFile: new File([], "logo.png"),

                faviconFileDetail: undefined,
                logoFileDetail: undefined
            }
            form.setInitialValues(values)
            form.setValues(values)
        }
    }, [])

    return (
        <Paper p={'md'}>
            <Grid>
                <Grid.Col span={5}>
                    <CustomTextInput {...form.getInputProps("code")} label="Mã module" disabled />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 7 }}>
                    <CustomTextInput {...form.getInputProps("name")} label="Tên module" />
                </Grid.Col>
                <Grid.Col span={12}>
                    <CustomTextInput  {...form.getInputProps("officelName")} label="Tên đơn vị chủ quản" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <CustomTextInput  {...form.getInputProps("email")} label="Email" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <CustomTextInput  {...form.getInputProps("phoneNumber")} label="Số điện thoại" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <CustomDateInput
                        value={form.getValues().registrationDate}
                        disabled
                        onChange={(date) => form.setFieldValue("registrationDate", new Date(date!))}
                        label="Ngày đăng ký"
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <CustomDateInput
                        value={form.getValues().limiteDate}
                        disabled
                        onChange={(date) => form.setFieldValue("limiteDate", new Date(date!))}
                        label="Ngày hết hạn"
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <CustomFlexColumn>
                        <CustomFileInput
                            accept="image/png,image/jpeg"
                            label="Favicon (16px x 16px)"
                            value={form.getValues().faviconFile}
                            onChange={async (e) => {
                                form.setFieldValue("faviconFile", e!)
                                form.setFieldValue("faviconFileDetail", await fileUtils.fileToAQDocumentType(e!))
                            }}
                        />

                        <Paper w={'100%'}>
                            <Center>
                                <Image
                                    fit="contain"
                                    src={`data:image/${form.getValues().faviconFileDetail?.fileExtension};base64,
                            ${form.getValues().faviconFileDetail?.fileBase64String}`}
                                    h={"115px"}
                                    fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                                    alt="Main logo"
                                    w="330px"
                                />
                            </Center>
                        </Paper>

                    </CustomFlexColumn>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <CustomFlexColumn>
                        <CustomFileInput
                            accept="image/png,image/jpeg"
                            label="Logo (330px x 115px)"
                            value={form.getValues().logoFile}
                            onChange={async (e) => {
                                form.setFieldValue("logoFile", e!)
                                form.setFieldValue("logoFileDetail", await fileUtils.fileToAQDocumentType(e!))
                            }}
                        />
                        <Paper >
                            <Center>
                                <Image
                                    fit="contain"
                                    src={`data:image/${form.getValues().logoFileDetail?.fileExtension};base64,
                                    ${form.getValues().logoFileDetail?.fileBase64String}`}
                                    h={"115px"}
                                    fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                                    alt="Main logo"
                                    w="330px"
                                />
                            </Center>
                        </Paper>
                    </CustomFlexColumn>
                </Grid.Col>
            </Grid>
            <CustomFlexEnd>
                <ModuleConfigSaveButton form={form} />
            </CustomFlexEnd>
        </Paper>
    )
}
