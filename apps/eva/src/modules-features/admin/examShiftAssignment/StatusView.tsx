import { IExamSection } from '@/shared/APIs/examSectionService';
import { Badge, Box } from '@mantine/core';
import { MyCenterFull } from 'aq-fe-framework/components';
import { MRT_Row } from 'mantine-react-table';
import { ExamSectionStatus, VIETNAMESE_STATUS_LABELS } from './types';

interface StatusViewProps {
    row: MRT_Row<IExamSection>;
}

const STATUS_CONFIG = {
    [ExamSectionStatus.UPCOMING]: {
        color: 'blue',
        variant: 'dot' as const,
        gradient: { from: 'blue.6', to: 'blue.8' }
    },
    [ExamSectionStatus.ONGOING]: {
        color: 'red',
        variant: 'filled' as const,
        gradient: { from: 'red.5', to: 'red.7' }
    },
    [ExamSectionStatus.FINISHED]: {
        color: 'green',
        variant: 'outline' as const,
        gradient: { from: 'green.5', to: 'green.7' }
    }
} as const;

const DEFAULT_STATUS_CONFIG = {
    color: 'gray',
    variant: 'light' as const,
    gradient: { from: 'gray.4', to: 'gray.6' }
};

export default function StatusView({ row }: StatusViewProps) {
    const status = row.original.status as ExamSectionStatus;
    const statusText = VIETNAMESE_STATUS_LABELS[status] ?? 'Không xác định';
    const statusConfig = STATUS_CONFIG[status] ?? DEFAULT_STATUS_CONFIG;

    return (
        <MyCenterFull>
            <Box
                style={{
                    transform: 'scale(1)',
                    transition: 'all 0.2s ease',
                    cursor: 'default'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                <Badge
                    {...statusConfig}
                    size="lg"
                    fw={600}
                    radius="md"
                    style={{
                        textTransform: 'none',
                        letterSpacing: '0.025em',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        border: statusConfig.variant === 'outline'
                            ? '2px solid'
                            : 'none'
                    }}
                >
                    {statusText}
                </Badge>
            </Box>
        </MyCenterFull>
    );
}