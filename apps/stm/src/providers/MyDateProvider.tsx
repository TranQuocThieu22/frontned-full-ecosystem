import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/de';
import { ReactNode } from 'react';

export default function MyDateProvider({ children }: { children: ReactNode }) {
    return (
        <DatesProvider settings={{ locale: 'en-gb' }}>
            {children}
        </DatesProvider>
    )
}
