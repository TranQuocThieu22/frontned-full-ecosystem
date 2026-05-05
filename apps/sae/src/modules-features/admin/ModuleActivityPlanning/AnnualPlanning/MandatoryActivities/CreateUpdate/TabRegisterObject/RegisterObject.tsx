import { Box, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

import { service_classActivityPlan } from "@/api/services/service_classActivityPlan";
import { service_event } from "@/api/services/service_event";
import { service_faculty } from "@/api/services/service_faculty";
import { service_majors } from "@/api/services/service_majors";
import { service_studentActivityPlan } from "@/api/services/service_studentActivityPlan";
import { ENUM_GENDER } from "@/constants/enum/global";
import { RegisterType } from "../TabGeneralInfo/MandatoryActivityInfo";
import ClassCreate from "./RegisterObject/Class/ClassCreate";
import ClassDelete from "./RegisterObject/Class/ClassDelete";
import FacultyCreate from "./RegisterObject/Faculty/FacultyCreate";
import FacultyDelete from "./RegisterObject/Faculty/FacultyDelete";
import MajorCreate from "./RegisterObject/Major/MajorCreate";
import MajorDelete from "./RegisterObject/Major/MajorDelete";
import StudentCreate from "./RegisterObject/Student/StudentCreate";
import StudentDelete from "./RegisterObject/Student/StudentDelete";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

// ----------------- Types -----------------
export type RegisterTarget = "FACULTY" | "MAJOR" | "CLASS" | "STUDENT_LIST" | "ALL_STUDENTS";

export const registerTypeToTargetMap: Record<RegisterType, RegisterTarget> = {
    [RegisterType.School]: "ALL_STUDENTS",
    [RegisterType.Faculty]: "FACULTY",
    [RegisterType.Major]: "MAJOR",
    [RegisterType.Class]: "CLASS",
    [RegisterType.Students]: "STUDENT_LIST",
};

interface IRegisterObjectProps {
    form: any;
    pendingChangesByTarget: Record<
        Exclude<RegisterTarget, "ALL_STUDENTS">,
        { toAdd: any[]; toDelete: any[] }
    >;
    setPendingChangesByTarget: React.Dispatch<
        React.SetStateAction<
            Record<Exclude<RegisterTarget, "ALL_STUDENTS">, { toAdd: any[]; toDelete: any[] }>
        >
    >;
    oldRegisterType?: number
}

export default function RegisterObject({
    form,
    pendingChangesByTarget,
    setPendingChangesByTarget,
    oldRegisterType
}: IRegisterObjectProps) {
    const registrationTarget = registerTypeToTargetMap[form.values.registerType as RegisterType];

    const eventRegisterQuery = useCustomReactQuery({
        queryKey: ["EventRegisterQuery", form.values.id],
        axiosFn: async () => await service_event.getEventRegisterByEventId({ eventId: form.values.id }),
        options: {
            enabled: form.values.id > 0 && form.values.registerType > 1 && oldRegisterType !== 1,
        }
    })

    // Track table data per registrationTarget
    const [dataByTarget, setDataByTarget] = useState<
        Record<Exclude<RegisterTarget, "ALL_STUDENTS">, any[]>
    >({
        FACULTY: [],
        MAJOR: [],
        CLASS: [],
        STUDENT_LIST: [],
    });

    useEffect(() => {
        setDataByTarget({
            FACULTY: eventRegisterQuery.data?.falcuties || [],
            MAJOR: eventRegisterQuery.data?.majors || [],
            CLASS: eventRegisterQuery.data?.classes || [],
            STUDENT_LIST: eventRegisterQuery.data?.students || [],
        })
    }, [eventRegisterQuery.data])

    // Column definitions
    const facultyColumns = useMemo<MRT_ColumnDef<any>[]>(() => [
        { header: "Mã khoa", accessorKey: "code", size: 150 },
        { header: "Tên khoa", accessorKey: "name", size: 300 },
    ], []);

    const majorColumns = useMemo<MRT_ColumnDef<any>[]>(() => [
        { header: "Mã ngành", accessorKey: "code", size: 150 },
        { header: "Tên ngành", accessorKey: "name", size: 300 },
        { header: "Mã khoa", accessorFn: (row) => row.faculty ? row.faculty.code : "", size: 150 },
    ], []);

    const classColumns = useMemo<MRT_ColumnDef<any>[]>(() => [
        { header: "Mã lớp", accessorKey: "code", size: 150 },
        { header: "Tên lớp", accessorKey: "name", size: 200 },
        { header: "Mã khoa", accessorFn: (row) => row.majors?.faculty ? row.majors?.faculty?.code : "", size: 150 },
        { header: "Mã ngành", accessorFn: (row) => row.majors ? row.majors.code : "", size: 150 },
    ], []);

    const studentColumns = useMemo<MRT_ColumnDef<any>[]>(() => [
        {
            header: "Mã SV",
            accessorKey: "code",
            size: 150,
        },
        {
            header: "Họ và tên", size: 150,
            accessorKey: "fullName",
        },
        {
            header: "Giới tính",
            accessorFn: (row) => ENUM_GENDER[row.gender]
        },
        {
            header: "Mã lớp",
            accessorKey: "classCode",
        },
        {
            header: "Email",
            accessorKey: "email",
            size: 250,
        },

    ], []);

    // Current target key & data
    const targetKey = registrationTarget as Exclude<RegisterTarget, "ALL_STUDENTS">;
    const currentData = dataByTarget[targetKey] || [];

    const facultyQuery = useCustomReactQuery({
        queryKey: ["faculty"],
        axiosFn: () => service_faculty.getAll(),
        options: {
            enabled: targetKey === "FACULTY",
        }
    })

    const majorQuery = useCustomReactQuery({
        queryKey: ["majorQuery"],
        axiosFn: () => service_majors.getAll(),
        options: {
            enabled: targetKey === "MAJOR",
        }
    })

    const classQuery = useCustomReactQuery({
        queryKey: ["classQuery", form.values.futurePlanId],
        axiosFn: () => service_classActivityPlan.getByActivityPlan({
            activityPlanId: form.values.futurePlanId,
            cols: "Class,Majors,Faculty",
        }),
        options: {
            enabled: targetKey === "CLASS",
        }
    })

    const studentQuery = useCustomReactQuery({
        queryKey: ["studentQuery", form.values.futurePlanId],
        axiosFn: async () => {
            return await service_studentActivityPlan.findbyActivityPlan({
                activityPlanId: form.values.futurePlanId
            })
        },
        options: {
            enabled: targetKey === "STUDENT_LIST",
        }
    })

    // Special Case
    if (registrationTarget === "ALL_STUDENTS") {
        return (
            <Box p="md">
                <Text c="dimmed" ta="center">
                    Dữ liệu toàn trường đã được chọn
                </Text>
            </Box>
        );
    }

    const columns =
        targetKey === "FACULTY"
            ? facultyColumns
            : targetKey === "MAJOR"
                ? majorColumns
                : targetKey === "CLASS"
                    ? classColumns
                    : studentColumns;

    const availableData =
        targetKey === "FACULTY"
            ? facultyQuery.data || []
            : targetKey === "MAJOR"
                ? majorQuery.data || []
                : targetKey === "CLASS"
                    ? classQuery.data || []
                    : studentQuery.data || [];

    return (
        <Box>
            <CustomDataTable
                enableRowSelection={false}
                columns={columns}
                data={currentData}
                renderTopToolbarCustomActions={() => {
                    switch (targetKey) {
                        case "FACULTY":
                            return (
                                <FacultyCreate
                                    availableFaculties={availableData.filter(
                                        (f) => !currentData.some((d) => d.id === f.id)
                                    )}
                                    onCreate={(selected) => {
                                        setDataByTarget((prev) => ({
                                            ...prev,
                                            [targetKey]: [
                                                ...currentData,
                                                ...selected.map((item) => ({ ...item, isNew: true })), // mark as new
                                            ],
                                        }));

                                        setPendingChangesByTarget((prev) => ({
                                            ...prev,
                                            [targetKey]: {
                                                ...prev[targetKey],
                                                toAdd: [
                                                    ...prev[targetKey].toAdd,
                                                    ...selected, // only add if it's new
                                                ],
                                            },
                                        }));
                                    }}

                                />
                            );
                        case "MAJOR":
                            return (
                                <MajorCreate
                                    availableMajors={availableData.filter(
                                        (m) => !currentData.some((d) => d.id === m.id)
                                    )}
                                    onCreate={(selected) => {
                                        setDataByTarget((prev) => ({
                                            ...prev,
                                            [targetKey]: [
                                                ...currentData,
                                                ...selected.map((item) => ({ ...item, isNew: true })), // mark as new
                                            ],
                                        }));

                                        setPendingChangesByTarget((prev) => ({
                                            ...prev,
                                            [targetKey]: {
                                                ...prev[targetKey],
                                                toAdd: [
                                                    ...prev[targetKey].toAdd,
                                                    ...selected, // only add if it's new
                                                ],
                                            },
                                        }));
                                    }}

                                />
                            );
                        case "CLASS":
                            return (
                                <ClassCreate
                                    availableClasses={availableData.filter(
                                        (c) => !currentData.some((d) => d.id === (c as any).class?.id)
                                    )}
                                    onCreate={(selected) => {
                                        setDataByTarget((prev) => ({
                                            ...prev,
                                            [targetKey]: [
                                                ...currentData,
                                                ...selected.map((item) => ({
                                                    ...item.class,
                                                    isNew: true,
                                                })), // mark as new
                                            ],
                                        }));

                                        setPendingChangesByTarget((prev) => ({
                                            ...prev,
                                            [targetKey]: {
                                                ...prev[targetKey],
                                                toAdd: [
                                                    ...prev[targetKey].toAdd,
                                                    ...selected.map((item) => ({
                                                        ...item.class,
                                                    }))
                                                ],
                                            },
                                        }));
                                    }}
                                />
                            );
                        default:
                            return (
                                <>
                                    <StudentCreate
                                        availableStudents={availableData.filter(
                                            (s) => !currentData.some((d) => d.id === (s as any).user?.id)
                                        )}
                                        onCreate={(selected) => {
                                            setDataByTarget((prev) => ({
                                                ...prev,
                                                [targetKey]: [
                                                    ...currentData,
                                                    ...selected.map((item) => ({
                                                        ...item.user,
                                                        isNew: true
                                                    })), // mark as new
                                                ],
                                            }));

                                            setPendingChangesByTarget((prev) => ({
                                                ...prev,
                                                [targetKey]: {
                                                    ...prev[targetKey],
                                                    toAdd: [
                                                        ...prev[targetKey].toAdd,
                                                        ...selected.map((item) => ({
                                                            ...item.user,
                                                        }))
                                                    ],
                                                },
                                            }));
                                        }}

                                    />
                                    <CustomButton actionType="import" />
                                </>
                            );
                    }
                }}
                renderRowActions={({ row }) => {
                    switch (targetKey) {
                        case "FACULTY":
                            return (
                                <FacultyDelete
                                    facultyData={row.original}
                                    onDelete={(id) => {
                                        const item = currentData.find((x) => x.id === id);
                                        if (!item) return;

                                        setDataByTarget((prev) => ({
                                            ...prev,
                                            [targetKey]: currentData.filter((x) => x.id !== id),
                                        }));

                                        setPendingChangesByTarget((prev) => {
                                            const current = prev[targetKey];

                                            // If it's a newly created item, remove it from toAdd and don't add to toDelete
                                            if (item.isNew) {
                                                return {
                                                    ...prev,
                                                    [targetKey]: {
                                                        ...current,
                                                        toAdd: current.toAdd.filter((x) => x.id !== id),
                                                    },
                                                };
                                            }

                                            // If it's from API (not new), add to toDelete
                                            return {
                                                ...prev,
                                                [targetKey]: {
                                                    ...current,
                                                    toDelete: [...current.toDelete, item],
                                                },
                                            };
                                        });
                                    }}

                                />
                            );
                        case "MAJOR":
                            return (
                                <MajorDelete
                                    majorData={row.original}
                                    onDelete={(id) => {
                                        const item = currentData.find((x) => x.id === id);
                                        if (!item) return;

                                        setDataByTarget((prev) => ({
                                            ...prev,
                                            [targetKey]: currentData.filter((x) => x.id !== id),
                                        }));

                                        setPendingChangesByTarget((prev) => {
                                            const current = prev[targetKey];

                                            // If it's a newly created item, remove it from toAdd and don't add to toDelete
                                            if (item.isNew) {
                                                return {
                                                    ...prev,
                                                    [targetKey]: {
                                                        ...current,
                                                        toAdd: current.toAdd.filter((x) => x.id !== id),
                                                    },
                                                };
                                            }

                                            // If it's from API (not new), add to toDelete
                                            return {
                                                ...prev,
                                                [targetKey]: {
                                                    ...current,
                                                    toDelete: [...current.toDelete, item],
                                                },
                                            };
                                        });
                                    }}

                                />
                            );
                        case "CLASS":
                            return (
                                <ClassDelete
                                    classData={row.original}
                                    onDelete={(id) => {
                                        const item = currentData.find((x) => x.id === id);
                                        if (!item) return;

                                        setDataByTarget((prev) => ({
                                            ...prev,
                                            [targetKey]: currentData.filter((x) => x.id !== id),
                                        }));

                                        setPendingChangesByTarget((prev) => {
                                            const current = prev[targetKey];

                                            // If it's a newly created item, remove it from toAdd and don't add to toDelete
                                            if (item.isNew) {
                                                return {
                                                    ...prev,
                                                    [targetKey]: {
                                                        ...current,
                                                        toAdd: current.toAdd.filter((x) => x.id !== id),
                                                    },
                                                };
                                            }

                                            // If it's from API (not new), add to toDelete
                                            return {
                                                ...prev,
                                                [targetKey]: {
                                                    ...current,
                                                    toDelete: [...current.toDelete, item],
                                                },
                                            };
                                        });
                                    }}

                                />
                            );
                        default:
                            return (
                                <StudentDelete
                                    student={row.original}
                                    onDelete={(id) => {
                                        const item = currentData.find((x) => x.id === id);
                                        if (!item) return;

                                        setDataByTarget((prev) => ({
                                            ...prev,
                                            [targetKey]: currentData.filter((x) => x.id !== id),
                                        }));

                                        setPendingChangesByTarget((prev) => {
                                            const current = prev[targetKey];

                                            // If it's a newly created item, remove it from toAdd and don't add to toDelete
                                            if (item.isNew) {
                                                return {
                                                    ...prev,
                                                    [targetKey]: {
                                                        ...current,
                                                        toAdd: current.toAdd.filter((x) => x.id !== id),
                                                    },
                                                };
                                            }

                                            // If it's from API (not new), add to toDelete
                                            return {
                                                ...prev,
                                                [targetKey]: {
                                                    ...current,
                                                    toDelete: [...current.toDelete, item],
                                                },
                                            };
                                        });
                                    }}

                                />
                            );
                    }
                }}
            />
        </Box>
    );
}
