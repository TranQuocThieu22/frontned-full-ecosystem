import { Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { MyButton, MyButtonModal, MyCheckbox, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import { IF12_2_1ReadNewCurriculum } from '../(12)/(2)/12-2-1/F12_2_1ReadNewCurriculum';
export default function ProposalTableCheck({values}:{values:IF12_2_1ReadNewCurriculum}) {
    const disclosure = useDisclosure(false);
    const Form= useForm({
        initialValues: {
            ...values,
        },
        // validate:{
        //     suggestionStatus: (value) => (value ? null : "Trạng thái đề xuất là bắt buộc"),
        //     suggestionResult: (value) => (value ? null : "Kết quả kiểm tra sơ bộ là bắt buộc"),
        //     suggestionCritics: (value) => (value ? null : "Nhận xét kiểm tra sơ bộ là bắt buộc"),
            
        // }
    });
    const columns=useMemo<MRT_ColumnDef<IF12_2_1ReadNewCurriculum>[]>(() => [
        {
            header: "Trạng thái đề xuất",
            accessorKey: "suggestionStatus",
        },
        {
            header: "Kết quả kiểm tra sơ bộ",
            accessorKey: "suggestionResult",
        },
        {
            header: "Nhận xét Kiểm tra sơ bộ",
            accessorKey: "suggestionCritics",
        },
        {
            header: "Đã gửi thông báo",
            accessorKey: "announcementCheck",
            accessorFn: (row) => <MyCheckbox checked={row.announcementCheck} readOnly={true}/>
        },
    ], []);
    return(
        <MyButtonModal variant='outline' color='blue' modalSize={'xl'} label="Kiểm tra" title="Chi tiết kiểm tra sơ bộ" disclosure={disclosure}>
            <Grid>
            <Grid.Col span={6}>
                <MySelect label="Trạng thái đề xuất hiện tại" data={mockDataSuggestionStatus} {...Form.getInputProps("suggestionStatus")}></MySelect>
                <MyTextInput label="Kết quả kiểm tra sơ bộ" {...Form.getInputProps("suggestionResult")}></MyTextInput>
                <MyCheckbox mt={'10px'} label="Gửi thông báo" checked={values.announcementCheck} {...Form.getInputProps("announcementCheck")}></MyCheckbox>
            </Grid.Col>
            <Grid.Col span={6}>
            <MyTextArea label="Nhận xét Kiểm tra sơ bộ" {...Form.getInputProps("suggestionCritics")}></MyTextArea>
            </Grid.Col>
           
            <MyButton crudType="save" fullWidth={true} onClick={() => {}}></MyButton>
            </Grid>
        </MyButtonModal>

    );
}
const mockDataSuggestionStatus=[
    "Đang chờ sơ duyệt",
    "Yêu cầu chỉnh sửa",
    "Đã sơ duyệt",
    "Đã từ chối",
    "Đã duyệt"
]