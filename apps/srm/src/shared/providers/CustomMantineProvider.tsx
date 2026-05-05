'use client'
import { variantColorResolver } from '@aq-fe/core-ui/shared/libs/mantine/variantColorResolver';
import { ActionIcon, MantineProvider, createTheme } from '@mantine/core';
import { DateInput, MonthPickerInput } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { IconCalendar } from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { ReactNode } from 'react';
dayjs.locale('vi');
export default function CustomMantineProvider({ children }: { children?: ReactNode }) {
    return (
        <MantineProvider defaultColorScheme="light" theme={theme}>
            <ModalsProvider labels={{
                confirm: 'Thêm', cancel: 'Huỷ'
            }}>
                <Notifications />
                {children}
            </ModalsProvider>
        </MantineProvider >
    )
}

const theme = createTheme({
    variantColorResolver: variantColorResolver,
    defaultRadius: "md",
    cursorType: 'pointer',
    components: {
        DateInput: DateInput.extend({
            defaultProps: {
                dateParser: (value) => {
                    const [day, month, year] = value.split("/");
                    return new Date(`${year}-${month}-${day}`);
                },
                valueFormat: "DD/MM/YYYY",
                locale: "vi",
                clearable: true,
                highlightToday: true,
            },
        }),
        MonthPickerInput: MonthPickerInput.extend({
            defaultProps: {
                locale: "vi",
                clearable: true,
                rightSection: <IconCalendar />,
                monthsListFormat: "[Tháng] M",
                valueFormat: "[Tháng] MM YYYY"
            },
        }),
        ActionIcon: ActionIcon.extend({
            defaultProps: {
                variant: "light"
            }
        }),
    }
});