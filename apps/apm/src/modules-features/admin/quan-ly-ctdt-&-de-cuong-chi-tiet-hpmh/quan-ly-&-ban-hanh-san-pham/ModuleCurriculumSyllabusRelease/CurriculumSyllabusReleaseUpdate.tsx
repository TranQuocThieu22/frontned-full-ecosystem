"use client";
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import { Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { MyDateInput, MyFieldset, MyFileInput, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { DocumentStatusLabel, I_DocumentIssuance } from './CurriculumSyllabusReleaseTable';

export default function CurriculumSyllabusReleaseUpdate({ rowData, queryData }: { rowData: I_DocumentIssuance, queryData: I_DocumentIssuance[] }) {
    const disc = useDisclosure(false)

    const form = useForm<I_DocumentIssuance>({
        initialValues: rowData,
    });

    const uniqueDocumentNames = Array.from(
        new Set(queryData.map((item) => item.applicableDocumentName).filter((item) => item !== null && item !== undefined))
    );

    const compilingDocumentOptions = uniqueDocumentNames.map((name) => ({
        value: name,
        label: name,
    }));

    const documentStatusOptions = Object.entries(DocumentStatusLabel).map(([value, label]) => ({
        value,
        label,
    }));

    return (
        <MyActionIconUpdate
        form={form}
            modalSize={"60%"}
            title="Chi tiết ban hành"
            onSubmit={() => {
            }}
        >
                <Grid gutter="md">
                    <Grid.Col span={6}>
                        <MyTextInput style={{ paddingTop: 10 }} withAsterisk label="Mã số Văn bản Ban hành" {...form.getInputProps("code")} />
                        <MyTextInput style={{ paddingTop: 10 }} withAsterisk label="Tên Văn bản Ban hành" {...form.getInputProps("name")} />
                        <MyTextInput style={{ paddingTop: 10 }} withAsterisk label="Tài liệu CTDT/DCCTHP áp dụng" {...form.getInputProps("applicableDocumentName")} />
                        <MySelect style={{ paddingTop: 10 }}
                            data={compilingDocumentOptions}
                            label="Tài liệu CTDT/DCCTHP biên soạn"
                            defaultValue={form.values.applicableDocumentName}
                        />
                        <MyTextArea style={{ paddingTop: 10 }} label="Ghi chú" {...form.getInputProps("note")} />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <MyDateInput style={{ paddingTop: 10 }} label="Ngày ban hành" {...form.getInputProps("issuedDate")} />
                        <MyDateInput style={{ paddingTop: 10 }} label="Ngày có hiệu lực" {...form.getInputProps("effectiveDate")} />
                        <MyTextInput style={{ paddingTop: 10 }} label="Phiên bản CTDT/DCCTHP áp dụng" {...form.getInputProps("applicableDocumentVersion")} />
                        <MyFileInput style={{ paddingTop: 10 }} label="File Văn bản Ban hành (PDF/Scan)" {...form.getInputProps("fileName")} />
                        <MySelect style={{ paddingTop: 10 }}
                            label="Trạng thái văn bản"
                            defaultValue={form.values.status?.toString()}
                            error={form.errors.status}
                            data={documentStatusOptions}
                        />
                    </Grid.Col>

                </Grid>
        </MyActionIconUpdate>
    );
}
