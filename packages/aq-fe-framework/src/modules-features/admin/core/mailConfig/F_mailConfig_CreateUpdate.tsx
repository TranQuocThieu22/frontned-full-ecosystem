import { MyActionIconUpdate } from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate'
import { MyButtonCreate } from '@/components/Button/ButtonCRUD/MyButtonCreate'
import { CustomNumberInput, MySelect, MyTextInput } from '@/core'
import { IEmailConfig } from '@/interfaces/IEmailConfig'
import baseAxios from '@/shared/config/baseAxios'
import { PasswordInput, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'

interface I extends IEmailConfig {
    password?: string
}

export function F_mailConfig_CreateUpdate({ values, emailModule }: {
    values?: I, emailModule: (string | {
        value: string;
        label: string;
    })[]
}) {
    function getEmailModuleLabelByValue(
        emailModuleOptions: (string | { value: string; label: string })[],
        value: number | string
    ): string {
        const selectedOption = emailModuleOptions.find(option => {
            if (typeof option === 'string') {
                return option === value.toString()
            } else {
                return option.value === value.toString()
            }
        })

        return typeof selectedOption === 'string'
            ? selectedOption
            : selectedOption?.label || 'Unknown'
    }
    useEffect(() => {
        if (!values) return
        form.setFieldValue('password', '')
    }, [values])

    const form = useForm<I>({
        mode: "uncontrolled",
        initialValues: values ? values : {
            aqModuleId: Number(emailModule[0]),
            isSslEnabled: true,
            // password: values ? '' : undefined
        },
        validate: {
            aqModuleId: (value) => value ? null : "Không được để trống",
            hostMailServer: (value) => value ? null : "Không được để trống",
            outgoingPort: (value) => value ? null : "Không được để trống",
            incomingPort: (value) => value ? null : "Không được để trống",
            // isSslEnabled: (value) => value !== null ? null : "Không được để trống",
            emailAddress: (value) => value ? null : "Không được để trống",
            password: (value) => value ? null : "Không được để trống",
        }
    })

    function handleSubmit() {
        const formValues = form.getValues()
        const moduleName = getEmailModuleLabelByValue(emailModule, formValues.aqModuleId!)
        console.log(formValues.password);

        return baseAxios.post(`/EmailConfig/${values ? "update" : "create"}`, {
            "id": values ? formValues.id : 0,
            "code": moduleName,
            "name": moduleName,
            "order": 0,
            "aqModuleId": formValues.aqModuleId,
            "hostMailServer": formValues.hostMailServer,
            "outgoingPort": formValues.outgoingPort,
            "incomingPort": formValues.incomingPort,
            "isSslEnabled": formValues.isSslEnabled,
            "emailAddress": formValues.emailAddress,
            "password": formValues.password,
        })
    }

    if (values) return (
        <MyActionIconUpdate
            form={form}
            onSubmit={handleSubmit}
        >
            <FormInput isUpdate form={form} aqModuleId={emailModule} />
        </MyActionIconUpdate>
    )
    return (
        <MyButtonCreate
            form={form}
            onSubmit={handleSubmit}>
            <FormInput form={form} aqModuleId={emailModule} />
        </MyButtonCreate>
    )
}

function FormInput({ form, aqModuleId, isUpdate }: {
    form: ReturnType<typeof useForm<I>>, aqModuleId: (string | {
        value: string;
        label: string;
    })[],
    isUpdate?: boolean
}) {

    return (
        <Stack>
            <MySelect
                label='Phân hệ'
                data={aqModuleId!}
                value={form.getValues().aqModuleId?.toString()}
                {...form.getInputProps("aqModuleId")}
            />
            <MyTextInput
                withAsterisk
                label='Host mail server'
                {...form.getInputProps("hostMailServer")}
            />
            <CustomNumberInput
                withAsterisk
                max={65536}
                label='Outgoing port'
                {...form.getInputProps("outgoingPort")}
            />
            <CustomNumberInput
                withAsterisk
                max={65536}
                label='Incoming port'
                {...form.getInputProps("incomingPort")}
            />
            <MySelect
                withAsterisk
                label='SSL'
                data={["true", "false"]}
                value={form.getValues().isSslEnabled?.toString()}
                {...form.getInputProps("isSslEnabled")}
                onChange={(e) => form.setFieldValue("isSslEnabled", e == "true" ? true : false)}

            />
            <MyTextInput
                label='Username'
                {...form.getInputProps("emailAddress")}
            />
            <PasswordInput
                label='Password'
                placeholder='Nhập password'
                {...form.getInputProps("password")}
                error={form.errors.password}
            // disabled={isUpdate}
            />
        </Stack>
    );
}
