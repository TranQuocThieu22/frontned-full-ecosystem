'use client'
import { Box, Flex, Menu } from '@mantine/core';
import { IconFileTypeCsv, IconFileTypePng, IconFileTypeSvg, IconMenu2 } from '@tabler/icons-react';
import saveAs from 'file-saver';
import { useRef } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FacultyEvaluationCouncilViewModel } from "./interfaces/IFacultyEvaluationCouncilViewModel";
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { RateInfo } from '@/interfaces/ranking';
import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore';

export default function FacultyEvaluationCouncilChart({ rankingSchoolReport }: { rankingSchoolReport: RateInfo[] }) {
    const chartRef = useRef<HTMLDivElement>(null);
    const permissionStore = usePermissionStore()
    const rateInfo = rankingSchoolReport?.map((item) => ({
        label: item.rateName,
        value: item.count,
    }))

    const downloadAsPNG = () => {
        if (!chartRef.current) return;
        const svgElement = chartRef.current.querySelector("svg");
        if (!svgElement) return;

        // Convert SVG to data URL
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        // Tạo Image để vẽ vào canvas
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = svgElement.clientWidth;
            canvas.height = svgElement.clientHeight;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                if (blob) {
                    saveAs(blob, "progress-chart.png");
                }
                URL.revokeObjectURL(url);
            }, "image/png");
        };
        img.src = url;
    };

    const downloadAsCSV = () => {
        if (!rateInfo) return;
        const headers = ['Rate Name', 'Count'];
        const csvRows = [
            headers.join(','), // Header row
            ...rateInfo.map((item) => [item.label, item.value].join(',')),
        ];
        const csvContent = '\ufeff' + csvRows.join('\n'); // Adding BOM for UTF-8
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `chart-${new Date().toISOString()}.csv`);
    };

    const downloadAsSVG = () => {
        if (chartRef.current) {
            const svg = chartRef.current.querySelector('svg');
            if (svg) {
                try {
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                    saveAs(blob, `chart-${new Date().toISOString()}.svg`);
                } catch (error) {
                    console.error('Error downloading SVG:', error);
                }
            }
        }
    };

    return (
        <Flex flex={1} direction={'column'} align={'end'} gap={10} style={{ width: '100%' }}>
            {permissionStore.state.currentPermissionPage?.isExport && (
                <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                        <CustomButton actionType="default" variant="light" color="blue" size="xs"  >
                            <IconMenu2 size={16} />
                        </CustomButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item leftSection={<IconFileTypeSvg size={16} />} onClick={downloadAsSVG} >
                            Download SVG
                        </Menu.Item>
                        <Menu.Item leftSection={<IconFileTypePng size={16} />} onClick={downloadAsPNG} >
                            Download PNG
                        </Menu.Item>
                        <Menu.Item leftSection={<IconFileTypeCsv size={16} />} onClick={downloadAsCSV} >
                            Download CSV
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            )}

            <Box ref={chartRef} style={{ width: '100%', height: '260px' }} mt={16}>
                <ResponsiveContainer>
                    <BarChart data={rateInfo} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label"
                            label={{
                                value: 'Xếp loại',
                                position: 'insideBottom',
                                offset: -5,
                                angle: 0,
                            }}
                        />
                        <YAxis
                            label={{ value: 'Số lượng', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4ade80" radius={[8, 8, 0, 0]}>
                            <LabelList dataKey="value" position="top" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Flex>
    );
}
