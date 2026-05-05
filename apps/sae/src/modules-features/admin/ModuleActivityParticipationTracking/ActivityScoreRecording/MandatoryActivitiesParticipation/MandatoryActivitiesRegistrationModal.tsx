"use client"
import { service_account } from '@/api/services/service_account';
import { service_studentsActivityRegistration } from '@/api/services/service_studentsActivityRegistration';
import useM_StudentsActivityParticipation_Create from '@/hooks/mutation-hooks/StudentsActivityParticipation/useM_StudentsActivityParticipation_Create';
import { Event } from '@/interfaces/event';
import { StudentEvent } from '@/interfaces/StudentEvent';
import { Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconUserPlus } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import { IMandatoryActivitiesEventInfoViewModel, IMandatoryActivitiesInfoViewModel } from './interfaces/IMandatoryActivitiesParticipationViewModel';
import MandatoryActivitiesButtonDelete from './MandatoryActivitiesButtonDelete';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCheckbox } from '@aq-fe/core-ui/shared/components/input/CustomCheckbox';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';

type IconType = "number" | "icon";

export default function MandatoryActivitiesRegistrationModal({ eventValue, iconType = "number" }: { eventValue: IMandatoryActivitiesEventInfoViewModel, iconType?: IconType }) {
    const [fileData, setFileData] = useState<any[]>([]);
    const disc = useDisclosure();

    const studentEventQuery = useCustomReactQuery({
        queryKey: ["MandatoryActivitiesRegistrationModal_GetByEvent", eventValue.id],
        axiosFn: () => service_studentsActivityRegistration.getByEvent({
            eventId: eventValue.id
        }),
        options: {
            enabled: disc[0],
        },
    });

    const studentQuery = useCustomReactQuery({
        queryKey: ["students", eventValue.id],
        axiosFn: () => service_account.getStudentList({
            paging: {
                pageNumber: 1,
                pageSize: 100,
            }
        }),
        options: {
            enabled: disc[0],
        }
    })

    const mutation = useM_StudentsActivityParticipation_Create();

    const form = useForm<StudentEvent>({
        initialValues: {
            studentId: 0,
            eventId: 0,
            point: 0,
            id: 0,
            isRegistration: false,
            isEnabled: false,
            event: null as unknown as Event
        },
        validate: {
            studentId: (value) => value ? null : 'Không được để trống',
            point: (value) => value ? null : 'Không được để trống',
        }
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    useEffect(() => { form_multiple.setValues({ importedData: fileData }) }, [fileData])

    const handleSubmit = async () => {
        try {
            const validationResult = form.validate()
            if (validationResult.hasErrors) return;

            mutation.mutate({
                StudentId: form.values.studentId ?? 0,
                EventId: eventValue.id ?? 0,
                Point: (form.values.point ?? 0).toString(),
            });
            form.reset();
        } catch (error) {
            notifications.show({
                message: "Có lỗi xảy ra khi thêm hoạt động.",
                color: "red",
            });
        }
    };

    const columns = useMemo<MRT_ColumnDef<IMandatoryActivitiesInfoViewModel>[]>(() => [
        { header: "Họ và tên", accessorKey: "studentName", },
        {
            header: "Điểm", accessorKey: "point", size: 80,
        },
        {
            header: "Đăng ký", accessorKey: "isRegistration", size: 80,
            accessorFn: (row) =>
                <CustomCheckbox
                    checked={row.isRegistration ?? false}
                    readOnly
                />
        }
    ], [])

    if (studentEventQuery.isLoading || studentQuery.isLoading) return null;

    return (
        <Group>
            <CustomButtonModal
                isActionIcon
                modalProps={{
                    size: '70%',
                    title: "Danh sách sinh viên tham gia"

                }}
                actionIconProps={{
                    variant: "transparent",
                    children: iconType === "number" ?
                        <Text fz={"sm"} fw={400} span c={(eventValue?.registrationCount ?? 0) > 0 ? "blue" : "black"}>
                            {eventValue.registrationCount ?? 0}
                        </Text>
                        : <IconUserPlus color="blue" />

                }}
                //todo ktra lại, CustomButtonModal ko có prop này
                // onSubmit={handleSubmit}
                disclosure={disc}
            >
                <CustomDataTable
                    enableRowNumbers={true}
                    enableColumnFilterModes={true}
                    enableColumnFilters={true}
                    columns={columns}
                    data={studentEventQuery.data || []}
                    renderRowActions={({ row }) => {
                        return (
                            <CustomCenterFull>
                                <MandatoryActivitiesButtonDelete id={row.original.id!} name={row.original.studentName!} />
                            </CustomCenterFull>
                        )
                    }}
                >
                </CustomDataTable>
            </CustomButtonModal>
        </Group>
    )
}

