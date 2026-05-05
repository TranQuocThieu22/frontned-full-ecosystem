import { emailConfigService } from '@/APIs/emailConfigService'
import { MyCenterFull, MyDataTable } from '@/components'
import { useMyReactQuery } from '@/hooks'
import { IEmailConfig } from '@/interfaces/IEmailConfig'
import { Center } from '@mantine/core'
import { MRT_ColumnDef } from 'mantine-react-table'
import { useMemo } from 'react'
import { CustomThemeIconSquareCheck } from '../../../../core'
import { F_mailConfig_CreateUpdate } from './F_mailConfig_CreateUpdate'
import { F_mailConfig_Delete } from './F_mailConfig_Delete'

export function F_mailConfig_Read({ emailModule }: {
    emailModule: (string | {
        value: string;
        label: string;
    })[]
}) {

    const mailConfigQuery = useMyReactQuery({
        queryKey: ['mailConfigs'],
        axiosFn: () => emailConfigService.getAll(),
        mockData: mockData
    })
    const columns = useMemo<MRT_ColumnDef<IEmailConfig>[]>(() => [
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
        <MyDataTable
            isLoading={mailConfigQuery.isLoading}
            isError={mailConfigQuery.isError}
            columns={columns}
            data={mailConfigQuery.data || []}
            renderTopToolbarCustomActions={() => (
                <F_mailConfig_CreateUpdate emailModule={emailModule} />
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <F_mailConfig_CreateUpdate values={row.original} emailModule={emailModule} />
                    <F_mailConfig_Delete id={row.original.id} contextData={row.original.hostMailServer} />
                </MyCenterFull>
            )}
        />
    )
}

const mockData: IEmailConfig[] = [
    {
        hostMailServer: "smtp.gmail.com",
        outgoingPort: 587,
        incomingPort: 465,
        isSslEnabled: true,
        emailAddress: "prototypeUser@aqtech.vn",
    }
]
