import baseAxios from "@/api/config/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { Checkbox, Fieldset, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useListState } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
interface IBranchViewModel {
    id?: number;
    code?: string;
    name?: string;
}
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
export default function F11_1Update({ data }: { data: ICreateCertificateReviewBatch }) {
    const [selectedExams, selectedExamsHandlers] = useListState<IExam>([]);

    const danhSachKhoaCanXet = useQuery<IExam[]>({
        queryKey: [`F11_1Update`],
        queryFn: async () => {
            const response = await baseAxios.get("/Exam/Getall");
            return response.data.data
        },
    })
    const certificate = useQuery<ICertificate[]>({
        queryKey: ['getCertificate'],
        queryFn: async () => {
            const response = await baseAxios.get("/Certificate/getall")
            const result = response.data.data;
            return result;
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
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<ICreateCertificateReviewBatch>({
        initialValues: {
            ...data
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống', // Validation for mã đợt xét cấp chứng chỉ
            name: (value) => value ? null : 'Không được để trống', // Validation for tên đợt xét cấp chứng chỉ
        }

    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const filteredExams = useMemo(() => {
        if (!danhSachKhoaCanXet.data || !data.id) return [];

        return danhSachKhoaCanXet.data.filter(exam => exam.certificateReviewBatchId === data.id);
    }, [danhSachKhoaCanXet.data, data.id]);

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData })
    }, [fileData])
    useEffect(() => {
        selectedExamsHandlers.setState(filteredExams); // Use setState instead of setList
    }, [filteredExams]);




    return (
        <Group>
            <MyActionIconUpdate modalSize={"80%"}
                form={form}
                onSubmit={(values) => {
                    // Lấy danh sách ID của các khóa thi đã chọn
                    const selectedExamIds = selectedExams.map(exam => exam.id).filter(id => id !== undefined);

                    // Gửi dữ liệu lên API
                    return baseAxios.post("/CertificateReviewBatch/create", {
                        ...values,
                        examIds: selectedExamIds, // ✅ Thêm danh sách ID khóa thi vào request
                    });
                }}
            >
                <MyFlexColumn>
                    <MyTextInput disabled label="Mã đợt xét cấp chứng chỉ" {...form.getInputProps("code")} />
                    <MyTextInput label="Tên đợt xét cấp chứng chỉ" {...form.getInputProps("name")} />

                    {
                        certificate.data &&
                        <Select
                            clearable
                            placeholder="Chọn chứng chỉ"
                            label="Chứng chỉ"
                            data={certificate.data?.map((item) => ({
                                value: item.id?.toString() ?? "", // ✅ Không để null
                                label: item.name ?? "" // ✅ Không để null
                            }))}
                            value={form.values.certificateId ? form.values.certificateId.toString() : ""} // ✅ Đổi null thành chuỗi rỗng
                            defaultValue={form.values.certificateId ? form.values.certificateId.toString() : ""} // ✅ Không để null
                            onChange={(value) => form.setFieldValue("certificateId", value ? parseInt(value) : undefined)}
                        />
                    }
                    <Fieldset legend="Bộ điều kiện đạt">

                        <Checkbox
                            label="Đạt thi"
                            checked={form.values.conditionPass ?? false} // ✅ Nếu null thì mặc định là false
                            {...form.getInputProps("conditionPass", { type: "checkbox" })}
                        />

                    </Fieldset>


                </MyFlexColumn>
                {danhSachKhoaCanXet.isLoading && "Đang tải danh sách khóa thi..."}
                {danhSachKhoaCanXet.isError && "Có lỗi khi lấy dữ liệu..."}
                {danhSachKhoaCanXet.data === undefined ? "Không có dữ liệu..." :
                    <MyDataTableSelect
                        listLabel="Danh sách khóa thi cần xét"
                        columns={columnChonKhoaHoc}
                        listState={[selectedExams, selectedExamsHandlers]} // Pass the whole tuple
                        data={danhSachKhoaCanXet.data}
                    />

                }
            </MyActionIconUpdate >
        </Group >
    )
}

