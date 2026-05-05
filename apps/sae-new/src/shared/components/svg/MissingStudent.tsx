import { Box } from '@mantine/core'
import React from 'react'

export default function MissingStudent({ C }: { C: any }) {
    return (

        <Box mb="xl">
            <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Background circle */}
                <circle cx="60" cy="60" r="58" fill={C.neutralCard} />
                {/* Person silhouette */}
                <circle cx="60" cy="40" r="16" fill={C.neutralDark} />
                <path
                    d="M32 88C32 73.464 44.464 62 60 62C75.536 62 88 73.464 88 88"
                    fill={C.neutralDark}
                />
                {/* Clipboard */}
                <rect x="44" y="50" width="32" height="40" rx="4" fill={C.navyPale} stroke={C.navyBorder} strokeWidth="1.5" />
                <rect x="50" y="46" width="20" height="8" rx="2" fill={C.navy} />
                {/* Lines on clipboard */}
                <rect x="50" y="62" width="20" height="3" rx="1.5" fill={C.navyBorder} />
                <rect x="50" y="69" width="14" height="3" rx="1.5" fill={C.navyBorder} />
                <rect x="50" y="76" width="17" height="3" rx="1.5" fill={C.navyBorder} />
                {/* Star badge */}
                <circle cx="80" cy="36" r="12" fill={C.amberBg} stroke={C.amberBorder} strokeWidth="1.5" />
                <text x="80" y="41" textAnchor="middle" fontSize="10" fill={C.amberText}>★</text>
            </svg>
        </Box>
    )
}
