"use client"
import baseAxios from '@/api/config/baseAxios'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn'
import MyDataTableSelect from '@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect'
import { Checkbox, Fieldset, Group, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useListState } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { MRT_ColumnDef } from 'mantine-react-table'
import { useEffect, useMemo, useState } from 'react'

interface IExam {
    id?: number;
    code?: string;
    name?: string;
    certificateReviewBatchId?: number
}
interface ICertificate {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
}
interface ICreateCertificateReviewBatch {
    id?: number;
    code?: string;
    name?: string;
    certificate?: ICertificate;
    certificateId?: number;
    conditionPass?: boolean;
    examIds?: number[]
}




export default function F11_1Create() {
    const SelectedExam = useListState<IExam>()
    const [fileData, setFileData] = useState<any[]>([]);
    const certificate = useQuery<ICertificate[]>({
        queryKey: ['getCertificate'],
        queryFn: async () => {
            const response = await baseAxios.get("/Certificate/getall")
            const result = response.data.data;
            return result;
        }
    })
    const allExam = useQuery<IExam[]>({
        queryKey: [`F11_1ExamList`],
        queryFn: async () => {
            const response = await baseAxios.get("/Exam/Getall");
            return response.data.data
        }
    })
    const columnChonKhoaHoc = useMemo<MRT_ColumnDef<IExam>[]>(
        () => [
            {
                accessorKey: "code",
                header: "Mã khóa thi"
            },
            {
                accessorKey: "name",
                header: "Tên khóa thi"
            },

            {
                accessorKey: "dat",
                header: "Đạt"
            },
        ],
        []
    );
    const form = useForm<ICreateCertificateReviewBatch>({
        initialValues: {
            code: "",
            name: "",
            certificateId: 0,
            conditionPass: false,
            examIds: []
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống', // Validation for mã đợt xét cấp chứng chỉ
        }

    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData })
    }, [fileData])
    useEffect(() => {
        if (!certificate.data) {
            return
        }
        form.setFieldValue("certificateId", certificate.data?.[0]?.id)
    }, [certificate.data])
    return (
        <Group>
            <MyButtonCreate modalSize={'80%'}
                objectName='đợt xét chứng chỉ'
                form={form}
                onSubmit={(value) => {
                    // Chuyển danh sách exam thành một mảng ID
                    let exams = SelectedExam[0].map((exam) => exam.id).filter(id => id !== undefined);

                    form.setFieldValue("examIds", exams); // Gán danh sách ID vào examIds

                    return baseAxios.post("CertificateReviewBatch/create", {
                        ...value,
                        examIds: exams, // Truyền danh sách ID vào request
                    });
                }}>
                <MyFlexColumn>
                    <MyTextInput label="Mã đợt xét cấp chứng chỉ" {...form.getInputProps("code")} />
                    <MyTextInput label="Tên đợt xét cấp chứng chỉ" {...form.getInputProps("name")} />

                    {
                        certificate.data &&
                        <Select
                            clearable
                            placeholder='Chọn chứng chỉ'
                            label='Chứng chỉ'
                            data={certificate.data?.map((item) => ({
                                value: item.id?.toString()!,
                                label: item.name! == null ? "" : item.name!
                            }))}
                            value={form.values.certificate?.toString()}
                            defaultValue={certificate.data?.[0]?.id?.toString()}
                            onChange={(value: any) => form.setFieldValue("certificateId", parseInt(value?.toString()!))}
                        />
                    }
                    <Fieldset legend="Bộ điều kiện đạt">

                        <Checkbox label="Đạt thi" {...form.getInputProps("conditionPass")} />

                    </Fieldset>
                </MyFlexColumn>


                {allExam.isLoading && "Đang tải danh sách khóa thi..."}
                {allExam.isError && "Có lỗi khi lấy dữ liệu..."}
                {allExam.data === undefined ? "Không có dữ liệu..."
                    :
                    <MyDataTableSelect
                        listLabel="Danh sách khóa thi cần xét"
                        columns={columnChonKhoaHoc}
                        listState={SelectedExam as any}
                        data={allExam.data?.filter(exam => exam.certificateReviewBatchId === null) ?? []}
                    />
                }

            </MyButtonCreate >
        </Group >
    )
}


