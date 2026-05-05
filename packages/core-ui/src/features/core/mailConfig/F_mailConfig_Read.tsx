import { emailConfigService } from '@aq-fe/core-ui/shared/APIs/emailConfigService'
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable'
import { CustomThemeIconSquareCheck } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck'
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull'
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery'
import { EmailConfig } from '@aq-fe/core-ui/shared/interfaces/EmailConfig'
import { Center } from '@mantine/core'
import { MRT_ColumnDef } from 'mantine-react-table'
import { useMemo } from 'react'
import { F_mailConfig_CreateUpdate } from './F_mailConfig_CreateUpdate'
import { F_mailConfig_Delete } from './F_mailConfig_Delete'

export function F_mailConfig_Read({ emailModule }: {
    emailModule: (string | {
        value: string;
        label: string;
    })[]
}) {

    const mailConfigQuery = useCustomReactQuery({
        queryKey: ['mailConfigs'],
        axiosFn: () => emailConfigService.getAll(),
        mockData: mockData
    })
    const columns = useMemo<MRT_ColumnDef<EmailConfig>[]>(() => [
        {
            header: "Phân hệ",
            accessorFn: (row) => {
                // return enum_emailConfigModule[row.emailModule!]
                return row.name
            }
        },
        {
            header: "Host mail server",
            accessorKey: "hostMailServer"
        },
        {
            header: "Outgoing port",
            accessorKey: "outgoingPort"
        },
        {
            header: "Incoming port",
            accessorKey: "incomingPort"
        },
        {
            header: "SSL",
            accessorFn: (row) => (
                <Center>
                    <CustomThemeIconSquareCheck checked={row.isSslEnabled} />
                </Center>
            )
        },
        {
            header: "Username",
            accessorKey: "emailAddress"
        },
        {
            header: "Password",
            accessorFn: () => "*******"
        }
    ], [])
    if (mailConfigQuery.isLoading) return "Đang tải"
    return (
        <CustomDataTable
            isLoading={mailConfigQuery.isLoading}
            isError={mailConfigQuery.isError}
            columns={columns}
            data={mailConfigQuery.data || []}
            renderTopToolbarCustomActions={() => (
                <F_mailConfig_CreateUpdate emailModule={emailModule} />
            )}
            renderRowActions={({ row }) => (
                <CustomCenterFull>
                    <F_mailConfig_CreateUpdate values={row.original} emailModule={emailModule} />
                    <F_mailConfig_Delete id={row.original.id} contextData={row.original.hostMailServer} />
                </CustomCenterFull>
            )}
        />
    )
}

const mockData: EmailConfig[] = [
    {
        hostMailServer: "smtp.gmail.com",
        outgoingPort: 587,
        incomingPort: 465,
        isSslEnabled: true,
        emailAddress: "prototypeUser@aqtech.vn",
    }
]
