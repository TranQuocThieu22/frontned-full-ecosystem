'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { I0LinkItem } from "@/components/Layouts/BasicAppShell/BasicAppShell";
import { menuData } from "@/data/menuData";
import { Accordion, Checkbox, Container } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

export default function F1_2ViewMenuPermissions() {
    const [groupedData, setGroupedData] = useState<{ label: string; links: I0LinkItem[] }[]>([]);

    // Move data processing to useEffect
    useEffect(() => {
        const processData = async () => {
            const result = await groupTwoLevels(menuData);
            setGroupedData(result);
        };

        processData();
    }, []); // Empty dependency array since menuData is assumed to be static

    const columns = useMemo<MRT_ColumnDef<I0LinkItem>[]>(
        () => [
            {
                header: "Tên menu",
                accessorKey: "label",
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },
            {
                header: "Xem",
                accessorFn: () => <Checkbox />,
                size: 40,
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },
            {
                header: "Thêm",
                accessorFn: () => <Checkbox />,
                size: 40,
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },
            {
                header: "Sửa",
                accessorFn: () => <Checkbox />,
                size: 40,
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },
            {
                header: "Xóa",
                accessorFn: () => <Checkbox />,
                size: 40,
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },
            {
                header: "In",
                accessorFn: () => <Checkbox />,
                size: 40,
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },
            {
                header: "Xuất",
                accessorFn: () => <Checkbox />,
                size: 40,
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                enableSorting: false,
                enableResizing: false,
            },
        ],
        []
    );

    if (!groupedData.length) return "Loading...";

    return (
        <Container w={'100%'} fluid>
            <Accordion variant="separated">
                {groupedData.map((item) => (
                    <Accordion.Item key={item.label} value={item.label}>
                        <Accordion.Control>{item.label}</Accordion.Control>
                        <Accordion.Panel>
                            <MyDataTable
                                enableGrouping={item.label !== "Dashboard"}
                                columns={columns}
                                data={item.label === "Dashboard" ?
                                    [{ label: "Dashboard", link: "dashboard" }] :
                                    item.links}
                            />
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}

async function groupTwoLevels(data: I0LinkItem[]) {
    return data.map((menu) => {
        const secondLevel: I0LinkItem[] = [];

        if (menu.links) {
            menu.links.forEach((subMenu) => {
                if (!subMenu.links) {
                    secondLevel.push(subMenu);
                } else {
                    secondLevel.push(...subMenu.links);
                }
            });
        }

        return {
            label: menu.label,
            links: secondLevel
        };
    });
}