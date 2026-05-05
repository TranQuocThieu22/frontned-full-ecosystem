
'use client'
import { Select } from '@mantine/core'
import { useForm, UseFormReturnType } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { MyActionIconUpdate, MyFlexColumn, MySelect, MyTextInput } from 'aq-fe-framework/components'
import { useEffect } from "react"

interface ICreateUserViewModel {
    id?: number; // STT
    code?: string; // Mã khóa
    name?: string; // Tên khóa
    coeSemesterStartId?: number; // Học kì bắt đầu
    coeSemesterEndId?: number; // Học kì kết thúc
    coeDegreeLevelId?: number; // 
    coeProgramId?: number;
    coeUnitId?: number;
    note?: string; // Ghi chú
    concurrencyStamp?: string; // ID thay đổi
    isEnabled?: boolean; // Đã xóa
    degreeLevels?: Array<any>; // Training Levels
    semesters?: Array<any>; // Semesters
    programs?: Array<any>; // Programs
}

export default function FeatCoursesUpdate(
    { values }: { values: ICreateUserViewModel }
) {
    const disc = useDisclosure();

    const semestersQuery = useQuery({
        queryKey: ["semesters"],
        queryFn: async () => tempSemesters
    });
    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            ...values
        },
        validate: {
            name: (value) => !value ? "Tên khóa không được để trống" : null,
        }
    })



    useEffect(() => {
        if (values) {
            form.setValues(values);
        }
    }, [values]);

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => {

            }}
            modalSize={"40%"}
            disclosure={disc}
        >
            <MyFlexColumn>
                <MyTextInput
                    disabled
                    label="Mã khóa"
                    withAsterisk
                    {...form.getInputProps("code")}
                    error={form.errors.code}
                />
                <MyTextInput
                    label="Tên khóa"
                    withAsterisk
                    {...form.getInputProps("name")}
                    error={form.errors.name}
                />
                <Select w={"100%"}
                    label="Năm học - Học kì vào:"
                    value={form.getInputProps("coeSemesterStartId").value?.toString()}
                    error={form.errors.coeSemesterStartId}
                    data={semestersQuery.data?.map((semester: any) => ({
                        value: semester.id.toString(),
                        label: semester.name
                    }))}
                    defaultValue={semestersQuery.data?.[0]?.id.toString() || ""} />
                <Select w={"100%"}
                    label="Năm học - Học kì ra:"
                    value={form.getInputProps("coeSemesterEndId").value?.toString()}
                    error={form.errors.coeSemesterEndId}
                    data={semestersQuery.data?.map((semester: any) => ({
                        value: semester.id.toString(),
                        label: semester.name
                    }))}
                    defaultValue={semestersQuery.data?.[1]?.id.toString() || ""} />

                <MySelect
                    w={"100%"}
                    label="Bậc đào tạo:"
                    error={form.errors.coeDegreeLevelId}
                    data={mockDegree?.map((level: any) => ({
                        value: level.id.toString(),
                        label: level.name
                    })) || []}
                    defaultValue={mockDegree[0]?.id.toString() || ""} // Default value for the select input
                />
                <MySelect
                    w={"100%"}
                    label="Chương trình"
                    error={form.errors.coeProgramId}
                    data={mockCourse?.map((program: any) => ({
                        value: program.id.toString(),
                        label: program.programName
                    })) || []}
                    defaultValue={mockCourse[0]?.id.toString() || ""}

                />
                <MyTextInput
                    label="Ghi chú"
                    {...form.getInputProps("note")}
                    onChange={(event) => form.setFieldValue("note", event.target.value)}
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

const tempSemesters = [
    {
        "startDate": "2025-03-11T00:06:21.393",
        "endDate": "2025-03-20T00:06:21.393",
        "coeSchoolYearId": 3032,
        "numberWeek": 2,
        "note": "string",
        "isCurrent": true,
        "coeSchoolYear": null,
        "id": 1,
        "code": "20251",
        "name": "H\u1ECDc k\u00EC 1 - N\u0103m h\u1ECDc 2010-2011",
        "concurrencyStamp": "5a45a0a7-325a-4f4c-be9e-a31afa0aa966",
        "isEnabled": true,
        "modifiedWhen": "2025-06-20T10:30:11.657",
        "modifiedBy": 19136,
        "modifiedFullName": "Dev H\u1EEFu Lu\u00E2n"
    },
    {
        "startDate": "2024-07-31T17:00:00",
        "endDate": "2024-12-30T17:00:00",
        "coeSchoolYearId": 35,
        "numberWeek": 22,
        "note": "",
        "isCurrent": false,
        "coeSchoolYear": null,
        "id": 2028,
        "code": "20241",
        "name": "H\u1ECDc k\u00EC 2 - N\u0103m h\u1ECDc 2014-2015",
        "concurrencyStamp": "7c22a7b6-8b8a-462a-bcad-1b4c94b556d8",
        "isEnabled": true,
        "modifiedWhen": "2025-06-20T10:35:19.03",
        "modifiedBy": 19136,
        "modifiedFullName": "Dev H\u1EEFu Lu\u00E2n"
    },
]

const mockDegree = [{ id: "1", name: "Đại học" }]
const mockCourse = [
    {
        code: 'KTO21',
        name: 'Kế toán 2021',
        programName: 'Kế toán',
        unitName: 'Kinh tế',

        id: 1, // Assigning an ID
        concurrencyStamp: 'b3f5d1c2-7e89-4a0b-9d4e-1f7c3a2b0e9d', // Example GUID
        isEnabled: true, // Assuming active
    },

];
