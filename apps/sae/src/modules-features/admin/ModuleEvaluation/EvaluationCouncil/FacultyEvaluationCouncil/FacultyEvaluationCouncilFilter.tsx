import { Class } from '@/interfaces/class';
import { Faculty } from '@/interfaces/faculty';
import { Majors } from '@/interfaces/majors';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';
import { Grid } from '@mantine/core';
import { UseQueryResult } from '@tanstack/react-query';
import React, { SetStateAction } from 'react'
interface Props {
    queryFacultyGetAll: UseQueryResult<Faculty[], Error> & {
        dataCount: number;
        rawData: CustomApiResponse<Faculty[]> | null;
    }
    queryClassFindBy: UseQueryResult<Class[], Error> & {
        dataCount: number;
        rawData: CustomApiResponse<Class[]> | null;
    }
    queryMajorsFindBy: UseQueryResult<Majors[], Error> & {
        dataCount: number;
        rawData: CustomApiResponse<Majors[]> | null;
    }
    setFacultySelect: (value: SetStateAction<number | null>) => void
    setClassSelect: (value: SetStateAction<number | null>) => void
    setMajorsSelect: (value: SetStateAction<number | null>) => void
    facultySelect: number | null
    classSelect: number | null
    majorsSelect: number | null

}
export default function FacultyEvaluationCouncilFilter({
    queryClassFindBy,
    queryFacultyGetAll,
    queryMajorsFindBy,
    setFacultySelect,
    setClassSelect,
    setMajorsSelect,
    facultySelect,
    classSelect,
    majorsSelect,

}: Props) {
    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <CustomSelect
                    label="Chọn khoa"
                    placeholder="Chọn khoa"
                    data={queryFacultyGetAll.data
                        ? queryFacultyGetAll.data.map((item) => ({ value: String(item.id), label: `${item.code} - ${item.name}` || '' }))
                        : []}
                    onChange={(value) => {
                        setFacultySelect(value ? Number(value) : null);
                        setClassSelect(null);
                        setMajorsSelect(null);
                    }}
                    value={facultySelect ? String(facultySelect) : null}
                    clearable={false}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <CustomSelect
                    label="Chọn lớp"
                    clearable
                    placeholder="Chọn lớp"
                    data={queryClassFindBy.data
                        ? queryClassFindBy.data.map((item) => ({ value: String(item.id), label: `${item.code} - ${item.name}` || '' }))
                        : []}
                    onChange={(value) => {
                        if (!value && majorsSelect) {
                            setMajorsSelect(null);
                        }
                        setClassSelect(value ? Number(value) : null);
                    }}
                    value={classSelect ? String(classSelect) : null}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <CustomSelect
                    label="Chọn chuyên ngành"
                    clearable
                    placeholder="Chọn chuyên ngành"
                    data={queryMajorsFindBy.data
                        ? queryMajorsFindBy.data.map((item) => ({ value: String(item.id), label: `${item.code} - ${item.name}` || '' }))
                        : []}
                    onChange={(value) => {
                        setMajorsSelect(value ? Number(value) : null);
                    }}
                    value={majorsSelect ? String(majorsSelect) : null}
                />
            </Grid.Col>
        </Grid>
    )
}
