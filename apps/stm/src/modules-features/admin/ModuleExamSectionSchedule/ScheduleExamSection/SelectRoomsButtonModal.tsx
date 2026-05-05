"use client"
import baseAxios from '@/api/config/baseAxios';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconSelector } from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MRT_ColumnDef, MRT_RowSelectionState } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import { IAddress, IExamSection, IRoomPriority } from './Interfaces/ExamSection';

export default function SelectRoomsButtonModal(
    { examSectionId, selectedAddressesValue, originalRow, startPeriod }
        :
        {
            examSectionId: number,
            selectedAddressesValue: IRoomPriority[],
            originalRow: IExamSection,
            startPeriod: number
        }
) {

    let queryClient = useQueryClient()
    let [selectedAddressState, setSelectedAddressesState] = useState<MRT_RowSelectionState>({});

    useEffect(() => {
        const selectedAddressesMap: MRT_RowSelectionState = {};
        selectedAddressesValue.forEach((item: IRoomPriority) => {
            if (item.addressId) {
                selectedAddressesMap[item.addressId] = true;
            }
        });
        setSelectedAddressesState({ ...selectedAddressesMap });
    }, []);

    const handleSelectedAddress = async () => {
        const selectedIds = Object.keys(selectedAddressState).map(Number)
        // Create a map of existing roomPriority
        const existingRoomMap = selectedAddressesValue.reduce((map, room) => {
            map[room.addressId!] = room;
            return map;
        }, {} as Record<number, IRoomPriority>);

        const updatedRooms = [];

        // Handle existing and unSelected roomPriority
        for (const existingRoom of selectedAddressesValue) {
            const isStillSelected = selectedIds.includes(existingRoom.addressId!);
            updatedRooms.push({
                ...existingRoom,
                isEnabled: isStillSelected
            });
        }

        // Add new roomPriority
        for (const addressId of selectedIds) {
            if (!existingRoomMap[addressId]) {
                updatedRooms.push({
                    id: 0,
                    code: "string",
                    name: "string",
                    concurrencyStamp: "string",
                    isEnabled: true,
                    addressId: addressId,
                    courseSectionId: examSectionId
                });
            }
        }
        let response = await baseAxios.post(`/CourseSection/AddPriorityRoom`, updatedRooms);
        if (response.data.isSuccess === 1) {
            notifications.show({
                color: "green",
                message: `Thao tác thành công`,
                title: "Thành công"
            })
            queryClient.invalidateQueries({ queryKey: [`MenuScheduleExamSection`] })

        } else {
            notifications.show({
                color: "red",
                message: `Thao tác thất bại`,
                title: "Thất bại"
            })
        }
    }

    const disc = useDisclosure(false)
    const AllAddresses = useQuery<IAddress[]>({
        queryKey: [`MenuScheduleExamSection_AddressSelection`],
        queryFn: async () => {
            const response = await baseAxios.get("/Address/GetAll?cols=roomType,branch");
            return response.data.data
        },
        refetchOnWindowFocus: false
    })

    const addressSelectionColumns = useMemo<MRT_ColumnDef<IAddress>[]>(
        () => [
            {
                header: "Mã phòng",
                accessorKey: "code",
            },
            {
                header: "Tên phòng",
                accessorKey: "name",
            },
            {
                header: "Sức chứa thi",
                accessorKey: "testCapacity",
            },
            {
                header: "Tính chất",
                accessorKey: "roomType.name",
            },
            {
                header: "Dãy",
                accessorKey: "block",
            },
            {
                header: "Chi nhánh",
                accessorKey: "branch.name",
            },
        ],
        []
    );

    const checkRoomFree = async () => {
        if (Object.keys(selectedAddressState).length === 0 || Object.keys(selectedAddressState).length > 1) {
            notifications.show({
                color: "red",
                message: "Chỉ kiểm tra 1 phòng học"
            })
            return
        }

        let date = new Date(originalRow.exam?.officialExamDate!);
        let classPeriodEnd = originalRow.exam?.classPeriod! + startPeriod - 1;
        let response = await baseAxios.post("/CourseSection/CheckRoomFree", {
            //conflict: this function belong to update or create examSectionSchedule?
            // id: examSectionId,
            id: 0,
            addressId: Object.keys(selectedAddressState).map(Number)[0],
            classPeriodStart: startPeriod,
            classPeriodEnd: classPeriodEnd,
            date: date
        });

        if (response.data.isSuccess === 1 && response.data.data === true) {
            notifications.show({
                color: "green",
                message: "Phòng học trống"
            })
            return;
        }

        if (response.data.isSuccess === 1 && response.data.data === false) {
            notifications.show({
                color: "red",
                message: "Phòng học đã có lịch"
            })
            return;
        }

    }


    return (
        <>
            <Button
                onClick={() => {
                    disc[1].open()
                }}
                size="compact-xs"
                variant="light" color="gray"
                leftSection={<IconSelector />}
            >
                Chọn phòng
            </Button>
            <Modal
                size={'xl'}
                opened={disc[0]}
                onClose={disc[1].close}
            >
                <MyFlexColumn >
                    {AllAddresses.isLoading && "Đang tải dữ liệu..."}
                    {AllAddresses.isError && "Lỗi khi tải dữ liệu..."}
                    {AllAddresses.isSuccess &&
                        <>
                            <MyDataTable
                                columns={addressSelectionColumns}
                                data={AllAddresses.data!}
                                renderTopToolbarCustomActions={() => (
                                    <Group>
                                        <Button
                                            color="blue"
                                            onClick={handleSelectedAddress}
                                        >Lưu
                                        </Button>
                                        <Button
                                            color="orange"
                                            onClick={checkRoomFree}
                                        >Kiểm tra trùng lịch
                                        </Button>
                                    </Group>
                                )}
                                layoutMode='grid'
                                initialState={{
                                    density: "xs",
                                    pagination: { pageIndex: 0, pageSize: 10 },
                                    columnPinning: { right: ["mrt-row-actions"] },
                                    columnVisibility: {
                                        nguoiCapNhat: false,
                                        ngayCapNhat: false
                                    }
                                }}
                                enableRowSelection={true}
                                enableMultiRowSelection={false}
                                getRowId={(originalRow) => originalRow.id?.toString()}
                                onRowSelectionChange={setSelectedAddressesState}
                                state={{ rowSelection: selectedAddressState }}
                            />
                        </>
                    }
                </MyFlexColumn>
            </Modal>
        </>
    )
}


