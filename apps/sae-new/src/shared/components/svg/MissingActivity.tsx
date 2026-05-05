import { Box } from '@mantine/core'
import React from 'react'

export default function MissingActivity({ C }: { C: any }) {
    return (
        <Box>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="38" fill={C.neutralBg} />
                <rect x="24" y="28" width="32" height="6" rx="3" fill={C.neutralDark} />
                <rect x="24" y="38" width="24" height="6" rx="3" fill={C.neutralBorder} />
                <rect x="24" y="48" width="16" height="6" rx="3" fill={C.neutralDark} />
                <circle cx="56" cy="22" r="10" fill={C.navyPale} />
                <text x="56" y="27" textAnchor="middle" fontSize="14" fill={C.navy} fontWeight="bold">?</text>
            </svg>
        </Box>
    )
}
