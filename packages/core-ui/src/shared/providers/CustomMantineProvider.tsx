'use client'
import { ActionIcon, createTheme, Divider, MantineProvider, MantineProviderProps, Space } from '@mantine/core';
import { DateInput, MonthPickerInput } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import { IconCalendar } from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { ReactNode } from 'react';
import { variantColorResolver } from '../libs/mantine/variantColorResolver';
import inputClasses from './input-theme.module.css';
dayjs.locale('vi');
export interface CustomMantineProviderProps extends Partial<MantineProviderProps> {
    /** Your application */
    children: ReactNode;
}

export default function CustomMantineProvider({
    // children, theme = baseTheme, ...props
    children,
    ...props
}: CustomMantineProviderProps) {
    return (
        <MantineProvider
            defaultColorScheme="light"
            theme={theme}
            {...props}
        >
            <Notifications />
            {children}
        </MantineProvider >
    )
}



const theme = createTheme({
    variantColorResolver: variantColorResolver,
    defaultRadius: "md",
    cursorType: 'pointer',
    components: {
        Input: {
            defaultProps: {
                radius: 'xl',
            },
            classNames: {
                input: inputClasses.input,
            },
        },
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
        Divider: Divider.extend({
            defaultProps: {
                my: 'md'
            }
        }),
        Space: Space.extend({
            defaultProps: {
                m: "md"
            }
        })
    }
});