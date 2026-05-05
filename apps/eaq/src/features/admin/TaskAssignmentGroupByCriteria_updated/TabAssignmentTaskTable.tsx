"use client";

import { ICouncilGroupMemberCreate } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroupMemberCreate";
import { ITaskCriteriaUpdate } from "@/shared/interfaces/task/ITaskCriteriaUpdate";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { Stack, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";

export default function TabAssignmentTaskTable({
    form,
    users,
    taskDetails,
    readOnly
}: {
    form: UseFormReturnType<ITaskCriteriaUpdate>;
    users: ICouncilGroupMemberCreate[];
    taskDetails: ITaskDetail[];
    readOnly?: boolean
}) {
    const userOptions = useMemo(() => users.map((u) => ({ value: u.userId?.toString() ?? "", label: u.code + " - " + u.name })), [users]);

    const [taskDetailTemp, setTaskDetailTemp] = useState<ITaskDetail[]>(taskDetails);
    const [taskDetailUpdate, setTaskDetailUpdate] = useState<ITaskDetail[]>([]);

    useEffect(() => {
        setTaskDetailTemp(taskDetails ?? []);
    }, [taskDetails]);

    useEffect(() => {
        form.setFieldValue("eaqTaskDetails", taskDetailUpdate);

    }, [taskDetailUpdate]);


    const updateTaskDetail = (criteriaId: number, changes: Partial<ITaskDetail>) => {
        setTaskDetailTemp(prev =>
            prev.map(td =>
                td.eaqCriteria!.id! === criteriaId ? { ...td, ...changes } : td
            )
        );

        setTaskDetailUpdate(prev => {
            const existing = prev.find(td => td.eaqCriteria!.id! === criteriaId);
            if (existing) {
                return prev.map(td =>
                    td.eaqCriteria!.id! === criteriaId ? { ...td, ...changes } : td
                );
            } else {
                const original = taskDetailTemp.find(td => td.eaqCriteria!.id! === criteriaId);
                return original
                    ? [...prev, { ...original, ...changes }]
                    : prev;
            }
        });
    };


    const columns = useMemo<MRT_ColumnDef<ITaskDetail>[]>(
        () => [
            {
                id: "eaqCriteriaCode",
                header: "Mã Tiêu chí/Chỉ báo",
                accessorFn: (row) => row.eaqCriteria?.code,
            },
            {
                id: "eaqCriteriaName",
                header: "Tên Tiêu chí/Chỉ báo",
                accessorFn: (row) => row.eaqCriteria?.name,
                size: 700
            },
            {
                id: "userCode",
                header: "Mã Thành viên",
                size: 500,
                Cell: ({ row }) => {
                    const code = row.original.eaqCriteria!.code!;
                    const defaultUserId = row.original.userId != null ? String(row.original.userId) : null;
                    if (readOnly) return defaultUserId;
                    return (
                        <CustomSelect
                            height={50}
                            key={`${code}-${defaultUserId}`}
                            data={userOptions ?? []}
                            defaultValue={defaultUserId}
                            onChange={(userId) => {
                                updateTaskDetail(row.original.eaqCriteria!.id!, {
                                    userId: userId === null ? undefined : Number(userId),
                                    user:
                                        userId === null
                                            ? undefined
                                            : users.find((u) => u.userId === Number(userId))?.user,
                                    isEnabled: true
                                });
                            }}
                            searchable
                            placeholder="Chọn thành viên"
                        />
                    );
                },
            },
            {
                id: "userFullName",
                header: "Họ và Tên Thành viên",
                Cell: ({ row }) => {
                    const code = row.original.eaqCriteria!.code!;
                    const v = row.original.userId != null ? String(row.original.userId) : null;
                    return (<Text key={`${code}-${v}`}>{row.original.user?.fullName}</Text>);
                },
            },
            {
                id: "userPhoneNumber",
                header: "Số điện thoại",
                Cell: ({ row }) => {
                    const code = row.original.eaqCriteria!.code!;
                    const v = row.original.userId != null ? String(row.original.userId) : null;
                    return (<Text key={`${code}-${v}`}>{row.original.user?.phoneNumber}</Text>);
                },
            },
            {
                id: "userEmail",
                header: "Email",
                Cell: ({ row }) => {
                    const code = row.original.eaqCriteria!.code!;
                    const v = row.original.userId != null ? String(row.original.userId) : null;
                    return (<Text key={`${code}-${v}`}>{row.original.user?.email}</Text>);
                },
            },
            {
                accessorKey: "startDate",
                header: "Ngày bắt đầu",
                Cell: ({ row }) => {
                    const id = row.original.eaqCriteria!.id!;
                    if (readOnly) return row.original.startDate;
                    return (
                        <CustomDateInput
                            placeholder="Ngày bắt đầu"
                            value={row.original.startDate ?? null}
                            maxDate={row.original.endDate ?? undefined}
                            onChange={(val) => {
                                updateTaskDetail(id, {
                                    startDate: val ?? undefined,
                                    isEnabled: true
                                });
                            }}
                        />
                    );
                },

            },
            {
                accessorKey: "endDate",
                header: "Ngày kết thúc",
                Cell: ({ row }) => {
                    const id = row.original.eaqCriteria!.id!;
                    if (readOnly) return row.original.endDate;
                    return (
                        <CustomDateInput
                            placeholder="Ngày kết thúc"
                            value={row.original.endDate ?? null}
                            minDate={row.original.startDate ?? undefined}
                            onChange={(val) => {
                                updateTaskDetail(id, {
                                    endDate: val ?? undefined,
                                    isEnabled: true
                                });
                            }}
                        />
                    );
                },
            },
            {
                accessorKey: "note",
                header: "Ghi chú",
                size: 400,
                Cell: ({ row }) => {
                    const id = row.original.eaqCriteria!.id!
                    if (readOnly) return row.original.note;
                    return (
                        <CustomTextArea
                            placeholder="Ghi chú"
                            onBlur={(e) => {
                                updateTaskDetail(id, {
                                    note: e.currentTarget.value ?? "",
                                    isEnabled: true
                                });
                            }}
                            defaultValue={row.original.note ?? ""}
                            // onChange={(e) => {
                            //     updateTaskDetail(id, { note: e.currentTarget.value ?? "" });
                            // }}
                            maxLength={3000}
                            minRows={4}
                        />
                    );
                },
            },
        ], [taskDetailTemp, taskDetailUpdate, userOptions, users]
    );

    return (
        <Stack w={"100%"} py={24}>
            <CustomDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={taskDetailTemp || []}
                getRowId={(r: ITaskDetail) => r.eaqCriteria!.code!}
            />
        </Stack>
    );
}
