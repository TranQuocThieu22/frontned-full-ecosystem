

import { EnumSurveyType, EnumSurveyTypeLabel } from "@/enums/EnumSurveyType";
import { Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import SurveyCreateButton from "./SurveyCreateButton";
import SurveyDeleteButton from "./SurveyDeleteButton";
import SurveyEditButton from "./SurveyEditButton";

export interface ISurveyInTable {
    code: string,
    name: string,
    surveyType: EnumSurveyType,
    isStopUsed?: boolean,
    course?: number,
    subject?: number
}

export interface ICourse {
    id: number
    code: string,
    name: string
}

export interface ISubject {
    id: number,
    code: string,
    name: string
}

export default function SurveyFormListTable() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({ initialValues: { importedData: [] } });

    const surveysQuery = useMyReactQuery({
        queryKey: ['surveys'],
        axiosFn: () => Promise.resolve({
            data: { data: mockDataSurveyTable, message: '', success: true },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        } as import('axios').AxiosResponse),
        mockData: mockDataSurveyTable
    })


    const columns = useMemo<MRT_ColumnDef<ISurveyInTable>[]>(() => [
        {
            header: "Mã phiếu",
            accessorKey: "code"
        },
        {
            header: "Tên phiếu",
            accessorKey: "name"
        },
        {
            header: "Loại khảo sát",
            accessorKey: "surveyType",
            accessorFn: (row) => EnumSurveyTypeLabel[row.surveyType]
        },
        {
            header: "Ngừng sử dụng",
            accessorKey: "isStopUsed",
            accessorFn: (row) => <Checkbox checked={row.isStopUsed} readOnly />
        },
    ], [])

    const exportConfig = {
        fields: [
            {
                header: "Mã phiếu",
                fieldName: "code"
            },
            {
                header: "Tên phiếu",
                fieldName: "name"
            },
            {
                header: "Loại khảo sát",
                fieldName: "surveyType",
            },
            {
                header: "Ngừng sử dụng",
                fieldName: "isStopUsed",
            },
        ]
    };

    return (<>
        <MyFieldset title={"Danh sách phiếu khảo sát"}>
            <MyDataTable
                columns={columns}
                isLoading={surveysQuery.isLoading}
                isError={surveysQuery.isError}
                data={surveysQuery.data || []}
                renderTopToolbarCustomActions={() =>
                    <>
                        <SurveyCreateButton />
                        <AQButtonCreateByImportFile
                            setImportedData={setFileData}
                            onSubmit={() => { }}
                            form={form_multiple} />
                        <AQButtonExportData
                            objectName="Danh sách phiếu khảo sát"
                            data={surveysQuery.data || []}
                            exportConfig={exportConfig} />
                        <MyButton color="red" crudType="delete">Xoá</MyButton>
                    </>
                }
                renderRowActions={({ row }) =>
                    <Group>
                        <SurveyEditButton data={row.original} />
                        <SurveyDeleteButton contextData={row.original.code} />
                    </Group>
                }
            />
        </MyFieldset>
    </>);
}


const mockDataSurveyTable: ISurveyInTable[] = [
    {
        code: "sv-mh-01",
        name: "Sinh viên đánh giá môn học",
        surveyType: EnumSurveyType.StudentEvaluateLecturerSubject,
        isStopUsed: false,
    },
    {
        code: "NH-MH-02",
        name: "Người học đánh giá CLO môn học",
        surveyType: EnumSurveyType.LearnerEvaluateCLOSubject,
        isStopUsed: false,
    },
    {
        code: "NH-CTDT-03",
        name: "Người học đánh giá PLO chương trình đào tạo",
        surveyType: EnumSurveyType.LearnerEvaluatePLOCurriculum,
        isStopUsed: false,
    },
    {
        code: "NTD-CTDT-04",
        name: "Nhà tuyển dụng đánh giá PLO chương trình đào tạo",
        surveyType: EnumSurveyType.EmployerEvaluatePLOCurriculum,
        isStopUsed: false,
    }
]

const mockDataCourse: ICourse[] = [
    {
        id: 1,
        code: "IT2401",
        name: "Công nghệ thông tin 2024 - Đợt 1"
    },
    {
        id: 2,
        code: "IT24012",
        name: "Công nghệ thông tin 2024 - Đợt 2"
    }
]

const mockDataSubject: ISubject[] = [
    {
        id: 1,
        code: "CSDL",
        name: "Cơ sở dữ liệu"
    },
    {
        id: 2,
        code: "CTDT&GT",
        name: "Cấu trúc dữ liệu và giải thuật"
    }
]

export const subjectOptions = mockDataSubject.map((s) => ({
    value: s.id.toString(),
    label: `${s.code} - ${s.name}`
}));

export const courseOptions = mockDataCourse.map((c) => ({
    value: c.id.toString(),
    label: `${c.code} - ${c.name}`
}));




