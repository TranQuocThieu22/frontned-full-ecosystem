import { MyButton } from '@/components/Buttons/Button/MyButton'
import MyButtonDownloadPDF from '@/components/Buttons/MyButtonDownloadPDF/MyButtonDownloadPDF'
import { Anchor, Button } from '@mantine/core'
import { IconPrinter } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

export default function F3_5PrintPlan() {
    return (
        <Button leftSection={<IconPrinter />} component={Link} href={"/3-1-4/doc3-1-4-KeHoachMuaSam.doc"} color='orange'>
            In kế hoạch
        </Button>
    )
}
