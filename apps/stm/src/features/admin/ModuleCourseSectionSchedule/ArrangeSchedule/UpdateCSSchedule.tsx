import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Group, NumberInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure, useListState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { handleMappingMinutesForEachTimeTypeDetail, IAddressSelection, ICourseSectionSchedule, ILecturerInfo, ISubjectSelection, ITimeCluster } from "./HandleCSScheduleButton";
interface ICourseSectionScheduleUpdateModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    subjectName?: string | null;
    courseSectionId?: number | null;
    addressId?: number | null;
    classPeriodStart?: number;
    totalPeriod?: number;
    classPeriodEnd?: number;
    startDate?: Date;
    endDate?: Date;
    courseSectionScheduleLecturer?: ICourseSectionScheduleLecturer[] | [] | null;
}

interface ICourseSectionScheduleLecturer {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    userId?: number;
    courseSectionScheduleId?: number;
}

export default function F8_4UpdateCSSchedule(
    { csScheduleValues, courseSectionId, lecturerInfoList, subjectList, adressList, timeCluster,
    }:
        {
            csScheduleValues: ICourseSectionSchedule,
            courseSectionId: number,
            lecturerInfoList: ILecturerInfo[],
            subjectList: ISubjectSelection[],
            adressList: IAddressSelection[],
            timeCluster: ITimeCluster,
        }
) {

    const updateModalDisc = useDisclosure();
    const queryClient = useQueryClient();
    const form = useForm<ICourseSectionScheduleUpdateModel>({
        initialValues: {
            id: csScheduleValues.id,
            code: csScheduleValues.code,
            name: csScheduleValues.name,
            concurrencyStamp: csScheduleValues.concurrencyStamp,
            isEnabled: csScheduleValues.isEnabled,
            subjectName: csScheduleValues.subjectName,
            courseSectionId: courseSectionId,
            addressId: csScheduleValues.addressId,
            classPeriodStart: csScheduleValues.classPeriodStart,
            classPeriodEnd: csScheduleValues.classPeriodEnd,
            totalPeriod: csScheduleValues.classPeriodEnd! - csScheduleValues.classPeriodStart! + 1,
            endDate: new Date(csScheduleValues.endDate!),
            startDate: new Date(csScheduleValues.startDate!),
            courseSectionScheduleLecturer: [...csScheduleValues.courseSectionScheduleLecturer!],
        },
        validate: {
        }
    });

    const SelectedAddress = useListState<IAddressSelection>([...adressList.filter(ad => ad.id === csScheduleValues.addressId)]);
    const SelectedLecturer = useListState<ILecturerInfo>([...lecturerInfoList.filter(l => csScheduleValues.courseSectionScheduleLecturer?.find(cssl => cssl.userId === l.id))]);
    const SelectedSubject = useListState<ISubjectSelection>([...subjectList.filter(s => s.name === csScheduleValues.subjectName)]);

    const addressSelectColumns = useMemo<MRT_ColumnDef<IAddressSelection>[]>(() => [
        {
            header: "Mã phòng",
            accessorKey: "code",
        },
        {
            header: "Tên phòng",
            accessorKey: "name",
        },
        {
            header: "Sức chứa học",
            accessorKey: "capacity",
        },
        {
            header: "Tính chất",
            accessorKey: "roomType.name",
        },
        {
            header: "Dãy",
            // assessorKey: "block",
            accessorFn: (row) => row.block
        },
        {
            header: "Chi nhánh",
            accessorKey: "branch.name",
        },
    ], []);

    const lecturerSelectColumns = useMemo<MRT_ColumnDef<ILecturerInfo>[]>(() => [

        {
            header: "Mã giảng viên",
            accessorKey: "code",
        },
        {
            header: "Họ tên",
            accessorKey: "lecturerName",
        },
    ], []);

    const subjectSelectColumns = useMemo<MRT_ColumnDef<ISubjectSelection>[]>(() => [
        {
            header: "Mã môn học",
            accessorKey: "code",
        },
        {
            header: "Tên môn học",
            accessorKey: "name",
        },
        {
            header: "Số tiết",
            accessorKey: "classPeriodNumber",
        },
        {
            header: "Số giờ",
            accessorKey: "hours",
        },
    ], []);

    const checkRoomFree = async () => {
        let date = calculateStartDateTime(form.getValues().startDate!, form.getValues().classPeriodStart!, timeCluster);
        let classPeriodEnd = form.getValues().classPeriodStart! + form.getValues().totalPeriod! - 1;
        let response = await baseAxios.post("/CourseSection/CheckRoomFree", {
            id: csScheduleValues.id,
            addressId: SelectedAddress[0][0]?.id,
            classPeriodStart: form.getValues().classPeriodStart,
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

    const checkLecturerFree = async () => {
        let lecturers = SelectedLecturer[0].map((lecturer) => {
            return lecturer.id;
        });
        let classPeriodEnd = form.getValues().classPeriodStart! + form.getValues().totalPeriod! - 1;
        let date = calculateStartDateTime(form.getValues().startDate!, form.getValues().classPeriodStart!, timeCluster);
        let response = await baseAxios.post("/CourseSection/CheckLecturerFree", {
            ids: [csScheduleValues.id],
            lecturerIds: lecturers,
            classPeriodStart: form.getValues().classPeriodStart,
            classPeriodEnd: classPeriodEnd,
            date: date
        });

        if (response.data.isSuccess === 1 && response.data.data === true) {
            notifications.show({
                color: "green",
                message: "Giảng viên trống"
            })
            return;
        }

        if (response.data.isSuccess === 1 && response.data.data === false) {
            notifications.show({
                color: "red",
                message: "Giảng viên đã có lịch"
            })
            return;
        }
    }


    const checkValidStartPeriodAndTotalPeriod = (startPeriod: number, totalPeriod: number, timeCluster: ITimeCluster) => {
        const endPeriod = startPeriod + totalPeriod - 1;
        const startExists = timeCluster.timeClusterDetails!.some(detail => detail.classPeriodStart === startPeriod);
        const endExists = timeCluster.timeClusterDetails!.some(detail => detail.classPeriodEnd === endPeriod);

        if (!startExists) {
            // notifications.show({
            //     color: "red",
            //     message: `Tiết bắt đầu ${startPeriod} không tồn tại trong khung giờ`
            // });
            return false;
        }

        if (!endExists) {
            // notifications.show({
            //     color: "red",
            //     message: `Tiết kết thúc ${endPeriod} không tồn tại trong khung giờ`
            // });
            return false;
        }

        return true;
    }

    const calculateStartDateTime = (startDate: Date, startPeriod: number, timeCluster: ITimeCluster) => {
        let matchingDetail = timeCluster.timeClusterDetails?.find(
            detail => detail.classPeriodStart === startPeriod
        );

        if (!matchingDetail) {
            // notifications.show({
            //     color: "red",
            //     message: `No time details found for period ${startPeriod}`
            // });
            return startDate;
        }

        let calculatedDate = new Date(startDate);

        if (matchingDetail.startTime) {
            const dateObj = new Date(matchingDetail.startTime);
            const hours = dateObj.getHours();
            const minutes = dateObj.getMinutes();
            calculatedDate.setHours(hours, minutes, 0, 0);
        }

        return calculatedDate;
    }

    const calculateStartAndEndDateTime = () => {
        if (form.getValues().classPeriodStart !== undefined && form.getValues().totalPeriod !== undefined && form.getValues().startDate !== undefined) {
            let classPeriodStart = form.getValues().classPeriodStart;
            let classPeriodEnd = classPeriodStart! + form.getValues().totalPeriod! - 1;

            if (!checkValidStartPeriodAndTotalPeriod(classPeriodStart!, form.getValues().totalPeriod!, timeCluster)) {
                return;
            }
            form.setFieldValue("classPeriodEnd", classPeriodEnd);

            let startDate = form.getValues().startDate;
            let startDateTime = calculateStartDateTime(startDate!, classPeriodStart!, timeCluster)
            form.setFieldValue("startDate", startDateTime);

            let minute = handleMappingMinutesForEachTimeTypeDetail(classPeriodStart!, classPeriodEnd, timeCluster);
            const endDate = new Date(startDateTime);
            endDate.setMinutes(endDate.getMinutes() + (minute! === 0 ? 0 : minute!));
            form.setFieldValue("endDate", endDate);
        }
    }

    const handleSelectedlecturerList = (selectedLecturerList: ILecturerInfo[], courseSectionScheduleLecturer: ICourseSectionScheduleLecturer[]) => {
        let unSelectedLecturers = courseSectionScheduleLecturer?.filter(existingLec => !selectedLecturerList.find(selectedLec => selectedLec.id === existingLec.userId));
        let existingLecturers = courseSectionScheduleLecturer?.filter(existingLec => selectedLecturerList.find(selectedLec => selectedLec.id === existingLec.userId));
        let newLecturers = selectedLecturerList.filter(selectedLec => !courseSectionScheduleLecturer?.find(existingLec => existingLec.userId === selectedLec.id));

        let finalLecturers: ICourseSectionScheduleLecturer[] = [
            ...existingLecturers || [],
            ...newLecturers.map(lec => ({
                id: 0,
                code: null,
                name: null,
                concurrencyStamp: "string",
                isEnabled: true,
                userId: lec.id,
                courseSectionScheduleId: 0
            })),
            ...(unSelectedLecturers?.map(lec => ({ ...lec, isEnabled: false })) || [])
        ];
        return finalLecturers;
    }

    return (
        <MyActionIconUpdate
            disclosure={updateModalDisc}
            modalSize={"80%"}
            form={form}
            onSubmit={async () => {
                let courseSectionScheduleLecturer = handleSelectedlecturerList(SelectedLecturer[0], csScheduleValues.courseSectionScheduleLecturer!);
                form.setFieldValue("courseSectionScheduleLecturer", courseSectionScheduleLecturer);
                calculateStartAndEndDateTime();

                let addressId = SelectedAddress[0][0]?.id;
                form.setFieldValue("addressId", parseInt(addressId?.toString()!));
                let subjectName = SelectedSubject[0][0]?.name;
                form.setFieldValue("subjectName", subjectName);

                let formValues = form.getValues();
                const { totalPeriod, ...newCsSchedule } = formValues;
                let response = await baseAxios.post("/CourseSection/UpdateSectionSchedule", newCsSchedule);
                if (response.data.isSuccess === 0) {
                    throw new Error(response.data.message);
                }
                return response;
            }}
            onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: [`F8_4HandleCSScheduleButton${courseSectionId}`] })
                notifications.show({
                    color: "green",
                    message: "Cập nhật thành công"
                })
                updateModalDisc[1].close();
            }}
        >
            <DateInput
                w={{ base: "100%", sm: "50%" }}
                withAsterisk
                label="Ngày"
                placeholder="Chọn ngày"
                {...form.getInputProps("startDate")}
            />
            <Group>
                <NumberInput
                    w={{ base: "50%", sm: "25%" }}
                    withAsterisk
                    placeholder="Nhập tiết bắt đầu"
                    label="Tiêt bắt đầu"
                    {...form.getInputProps("classPeriodStart")}
                />
                <NumberInput
                    w={{ base: "50%", sm: "25%" }}
                    withAsterisk
                    placeholder="Nhập số tiết"
                    label="Số tiết"
                    {...form.getInputProps("totalPeriod")}
                />
            </Group>

            <MyDataTableSelect
                enableMultiRowSelection={false}
                listLabel="Chọn môn học"
                columns={subjectSelectColumns}
                listState={SelectedSubject as any}
                data={subjectList}
            />

            <MyDataTableSelect
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Button
                            color="grape"
                            onClick={checkRoomFree}
                        >
                            Kiểm tra lịch phòng
                        </Button>
                    </Group>
                )}
                enableMultiRowSelection={false}
                listLabel="Chọn phòng"
                columns={addressSelectColumns}
                listState={SelectedAddress as any}
                data={adressList}
            />

            <MyDataTableSelect
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Button
                            color="grape"
                            onClick={checkLecturerFree}
                        >
                            Kiểm tra lịch giảng viên
                        </Button>
                    </Group>
                )}
                enableMultiRowSelection={true}
                listLabel="Chọn giảng viên"
                columns={lecturerSelectColumns}
                listState={SelectedLecturer as any}
                data={lecturerInfoList}
            />

        </MyActionIconUpdate>
    );
}