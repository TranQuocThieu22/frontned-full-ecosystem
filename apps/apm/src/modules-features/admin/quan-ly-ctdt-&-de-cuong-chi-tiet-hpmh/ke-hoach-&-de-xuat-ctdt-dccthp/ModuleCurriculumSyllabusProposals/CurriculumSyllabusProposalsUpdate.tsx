"use client";
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import { Grid, Group, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MyActionIconUpdate, MyButtonCreate, MyCheckbox, MyFieldset, MyFileInput, MySelect, MyTextInput } from 'aq-fe-framework/components';
import { useEffect, useState } from 'react';
import { DepartmentLabel, I_Proposal, ProposalTypeLabel, ProposerLabel } from './CurriculumSyllabusProposalsTable';
import ServantTable, { I_Servant } from './ServantTable';

export default function CurriculumSyllabusProposalsUpdate({data}: {data: I_Proposal}) {
    const [opened, setOpened] = useState(false);
    const [servantList, setServantList] = useState<I_Servant[]>([]);

    const proposalTypeOptions = Object.entries(ProposalTypeLabel).map(([key, value]) => ({
        value: key.toString(),
        label: value,
    }))

    const departmentOptions = Object.entries(DepartmentLabel).map(([key, value]) => ({
        value: key.toString(),
        label: value,
    }));

    const proposerOptions = Object.entries(ProposerLabel).map(([key, value]) => ({
        value: key.toString(),
        label: value
    }))

    const form = useForm<I_Proposal>({
        initialValues: data,
        validate: {
            code: (value: any) => value ? null : 'Không được để trống',
            name: (value: any) => value ? null : 'Không được để trống',
        }
    });

    return (
        <Group>
            <MyActionIconUpdate
                title="Chỉnh sửa đề xuất"
                form={form}
                onSubmit={() => { }}
                modalSize={"80%"}
            >
                <Grid gutter="md">
                    <Grid.Col span={6}>
                        <MyTextInput style={{ paddingTop: 10 }} withAsterisk label="Mã đề xuất" {...form.getInputProps("code")} />
                        <MyTextInput style={{ paddingTop: 10 }} withAsterisk label="Tên đề xuất" {...form.getInputProps("name")} />
                        <MySelect style={{ paddingTop: 10 }}
                            data={proposalTypeOptions}
                            label="Loại đề xuất"
                            defaultValue={form.values.type.toString()}
                        />
                        <MyTextArea style={{ paddingTop: 10 }} label="Lý do" />
                        <MyTextArea style={{ paddingTop: 82 }} label="Ghi chú" {...form.getInputProps("note")} />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <MySelect style={{ paddingTop: 10 }}
                            data={departmentOptions}
                            label="Phòng ban đề xuất"
                            defaultValue={form.values.type.toString()}
                        />
                        <MySelect style={{ paddingTop: 10 }}
                            data={proposerOptions}
                            label="Người đề xuất"
                            defaultValue={form.values.type.toString()}
                        />
                        <MyTextInput style={{ paddingTop: 10 }} label="Đối tượng đào tạo" {...form.getInputProps("subject")} />
                        <MySelect style={{ paddingTop: 10 }}
                            label="Danh sách thành viên"
                            defaultValue=""
                            error={form.errors.receiverList}
                            onClick={() => setOpened(true)}
                            data={[]}
                        />
                        <MyDateInput style={{ paddingTop: 0 }} label="Thời gian dự kiến hoàn thành" {...form.getInputProps("expectedEnd")} />
                        <MyFileInput style={{ paddingTop: 15 }} label="Đính kèm file" {...form.getInputProps("attachment")} />
                        <MyTextArea style={{ paddingTop: 10 }} label="Mục tiêu chính" {...form.getInputProps("objective")} />
                    </Grid.Col>
                </Grid>


                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Danh sách viên chức"
                    size="80%"
                    centered
                >
                    <ServantTable setServantList={setServantList} />
                </Modal>
            </MyActionIconUpdate>
        </Group >
    );
}