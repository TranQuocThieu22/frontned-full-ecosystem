'use client';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Checkbox, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyCenterFull, MyNumberFormatter } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_VI } from "mantine-react-table/locales/vi/index.cjs";
import { useMemo } from "react";
import { useSelectedServiceStore } from "../Store/SelectedServiceStore";
import { IAvailableServiceInfoViewModel } from "./Interfaces/Interfaces";

export default function AvailableServiceTable({ serviceType }: { serviceType: number }) {
    const selectedServiceStore = useSelectedServiceStore();

    const allAvailableServices = useQuery<IAvailableServiceInfoViewModel[]>({
        queryKey: [`allAvailableServicesType${serviceType}`],
        queryFn: async () => {
            if (serviceType === undefined) return []
            let res;
            if (serviceType === 0) {
                res = await baseAxios.get(`/Service/GetAvailableServiceRegisters?type=`)
                return res.data.data
            } else {
                res = await baseAxios.get(`/Service/GetAvailableServiceRegisters?type=${serviceType}`)
            }
            return res.data.data
        },
        refetchOnWindowFocus: false,
    })

    const availableServiceMRTColumns = useMemo<MRT_ColumnDef<IAvailableServiceInfoViewModel>[]>(() => [
        {
            header: serviceType === 0 ? "Tên dịch vụ" : serviceType === 1 ? "Tên khóa học" : "Tên khóa thi",
            accessorKey: "name",
        },
        {
            header: "Cụm thời gian",
            accessorKey: "timeCluster",
            size: 140,
        },
        {
            header: "Ngày khai giảng",
            accessorFn(originalRow) {
                return originalRow.studyDate ? utils_date_dateToDDMMYYYString(new Date(originalRow.studyDate)) : "";
            },
            size: 160,
        },
        {
            header: "Có thi",
            accessorFn(originalRow) {
                return originalRow.type === 2 ? "Có" : "Không";
            },
            Cell: ({ row, cell }) => {
                return (
                    <>
                        <Checkbox
                            checked={row.original.type === 2}
                            readOnly
                        />
                    </>
                )
            },
            size: 100,
        },
        {
            header: "Học phí",

            accessorFn(originalRow) {
                return originalRow.type === 1 ? originalRow.price : "";
            },
            Cell: ({ cell }) => {
                return <MyNumberFormatter value={cell.getValue<number>()} />
            },
            size: 120,
        },
        {
            header: "Lệ phí thi",
            accessorFn(originalRow) {
                return originalRow.type === 2 ? originalRow.price : "";
            },
            Cell: ({ cell }) => {
                return <MyNumberFormatter value={cell.getValue<number>()} />
            },
            size: 120,
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "nguoiCapNhat"
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        // }
    ], []);

    const availableServiceMRT = useMantineReactTable({
        columns: availableServiceMRTColumns,
        data: allAvailableServices.data || [],
        enableRowNumbers: true,
        layoutMode: "semantic",
        displayColumnDefOptions: {
            "mrt-row-numbers": {
                Header: "STT",
                size: 70
            },
        },
        enableColumnPinning: true,
        // enableRowSelection: true,
        getRowId: (originalRow: IAvailableServiceInfoViewModel) => originalRow.id!.toString(),
        initialState: {
            density: "md",
            pagination: { pageIndex: 0, pageSize: 10 },
            columnPinning: { right: ["mrt-row-actions"] },
            columnVisibility: {
                nguoiCapNhat: false,
                ngayCapNhat: false
            }
        },
        enableColumnResizing: true,
        mantineTableContainerProps: { style: { maxHeight: "40vh" } },
        enableStickyHeader: true,
        mantineTableHeadCellProps: {
            style: {
                verticalAlign: "middle",
                paddingTop: "2px",
                paddingBottom: "2px",
            },
        },
        mantineTableBodyCellProps: {
            style: {
                paddingTop: "2px",
                paddingBottom: "2px",
            },
        },
        localization: MRT_Localization_VI,
        renderTopToolbarCustomActions: ({ table }) => {
            return (
                <>
                    <Group>
                        {/* <Button
                            color="green"
                            onClick={handleOnClickSelectServiceButton}
                        >
                            Đăng ký
                        </Button> */}
                    </Group>
                </>
            );
        },
        enableRowActions: true,
        renderRowActions: ({ row }) => {
            return (
                <MyCenterFull>
                    <Button
                        disabled={selectedServiceStore.checkExistService(row.original.id!)}
                        variant="light"
                        color="teal"
                        onClick={() => registerService(row.original)}
                    >
                        Đăng ký
                    </Button>
                </MyCenterFull>
            )
        }
    });

    // useEffect(() => {

    //     let initialSelectedService: IAvailableServiceInfoViewModel[] = []
    //     if (serviceType === 0) {
    //         initialSelectedService = [...selectedServiceStore.selectedServices];
    //     } else {
    //         initialSelectedService = [...selectedServiceStore.getSelectedServiceByType(serviceType)];
    //     }

    //     initialSelectedService.forEach((item: IAvailableServiceInfoViewModel) => {
    //         // console.log('step - itemId: ', serviceType, item.id);

    //         availableServiceMRT.setState((prev) => ({
    //             ...prev,
    //             rowSelection: {
    //                 // ...prev.rowSelection,
    //                 [item.id!.toString()]: true
    //             }
    //         }))
    //     })

    // }, [allAvailableServices.isSuccess, selectedServiceStore.selectedServices])

    // const handleOnClickSelectServiceButton = () => {
    //     //todo: fix potential bug when select / deselect on multiple table

    //     const selectedRows = availableServiceMRT.getSelectedRowModel().rows;

    //     selectedRows.forEach((row) => {
    //         const existService = selectedServiceStore.checkExistService(Number(row.id));
    //         if (!existService) {
    //             selectedServiceStore.pushSelectedService(row.original);
    //         }
    //     });

    //     // Clear unselected rows
    //     const selectedServicesFromStore = selectedServiceStore.selectedServices;
    //     selectedServicesFromStore.forEach((service) => {
    //         const selectedServiceFromTable = selectedRows.find((row) => row.id === service.id?.toString());
    //         if (!selectedServiceFromTable) {
    //             selectedServiceStore.removeSelectedService(service.id!);
    //         }
    //     })
    // }

    const registerService = (row: IAvailableServiceInfoViewModel) => {
        const existService = selectedServiceStore.checkExistService(row.id!);
        if (!existService) {
            selectedServiceStore.pushSelectedService(row);
        }
        // else {
        //     selectedServiceStore.removeSelectedService(row.id!);
        // }
    }



    return (
        <>
            <MantineReactTable
                table={availableServiceMRT}
            />
        </>
    );
}
