import { Box, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

import { service_event } from "@/api/services/service_event";
import { ENUM_GENDER } from "@/constants/enum/global";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { RegisterType } from "../TabGeneralInfo/PlanningApprovalInfo";

// ----------------- Types -----------------
type RegisterTarget = "FACULTY" | "MAJOR" | "CLASS" | "STUDENT_LIST" | "ALL_STUDENTS";

export const registerTypeToTargetMap: Record<RegisterType, RegisterTarget> = {
    [RegisterType.School]: "ALL_STUDENTS",
    [RegisterType.Faculty]: "FACULTY",
    [RegisterType.Major]: "MAJOR",
    [RegisterType.Class]: "CLASS",
    [RegisterType.Students]: "STUDENT_LIST",
};

interface IRegisterObjectProps {
    form: any;
}

export default function RegisterObject({
    form,
}: IRegisterObjectProps) {
    const registrationTarget = registerTypeToTargetMap[form.values.registerType as RegisterType];

    const eventRegisterQuery = useCustomReactQuery({
        queryKey: ["EventRegisterQuery", form.values.id],
        axiosFn: async () => await service_event.getEventRegisterByEventId({ eventId: form.values.id }),
        options: {
            enabled: form.values.id > 0 && form.values.registerType > 1,
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

    return (
        <Box>
            <CustomDataTable
                enableRowSelection={false}
                columns={columns}
                data={currentData}
            />
        </Box>
    );
}
