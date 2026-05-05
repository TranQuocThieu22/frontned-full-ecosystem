'use client'
import { RateInfo } from "@/interfaces/ranking";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { Box, Menu } from '@mantine/core';
import { IconFileTypeCsv, IconFileTypePng, IconFileTypeSvg, IconMenu2 } from '@tabler/icons-react';
import saveAs from 'file-saver';
import { useRef } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function SchoolEvaluationCouncilChart({ rateInfo }: { rateInfo: RateInfo[] }) {
    const chartData = rateInfo.map((item) => ({
        label: item.rateName,
        value: item.count ?? 0,
    }));

    // Ref for chart container
    const chartRef = useRef<HTMLDivElement>(null);

    // Download as PNG
    const downloadAsPNG = () => {
        if (chartRef.current) {
            const svg = chartRef.current.querySelector('svg');
            if (svg) {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = svg.clientWidth * 2;
                    canvas.height = svg.clientHeight * 2;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.scale(2, 2);
                    }
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const img = new Image();
                    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));

                    img.onload = () => {
                        ctx?.drawImage(img, 0, 0);
                        canvas.toBlob((blob) => {
                            if (blob) {
                                saveAs(blob, `chart-${new Date().toISOString()}.png`);
                            }
                        }, 'image/png');
                    };
                } catch (error) {
                    console.error('Error downloading PNG:', error);
                }
            }
        }
    };

    // Download as SVG
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

    // Download as CSV
    const downloadAsCSV = () => {
        const headers = ['Rate Name', 'Count'];
        const csvRows = [
            headers.join(','), // Header row
            ...chartData.map((item) => [item.label, item.value].join(',')),
        ];
        const csvContent = '\ufeff' + csvRows.join('\n'); // Adding BOM for UTF-8
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `chart-${new Date().toISOString()}.csv`);
    };

    return (
        <Box >
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                        <CustomButton actionType="default" variant="light" color="blue" size="xs"  >
                            <IconMenu2 size={16} />
                        </CustomButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item leftSection={<IconFileTypePng size={16} />} onClick={downloadAsPNG}>
                            Download PNG
                        </Menu.Item>
                        <Menu.Item leftSection={<IconFileTypeSvg size={16} />} onClick={downloadAsSVG}>
                            Download SVG
                        </Menu.Item>
                        <Menu.Item leftSection={<IconFileTypeCsv size={16} />} onClick={downloadAsCSV}>
                            Download CSV
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Box>
            <div ref={chartRef}>
                <Box style={{ width: '100%' }} mt={8}>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
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
            </div>
        </Box>
    );
}
