import MySelect from "@/components/Combobox/Select/MySelect";
import { Grid, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyDateInput, MyFileInput, MyTab, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { IReviewCommitteeInfoViewModel } from "./interfaces/ReviewCommitteeViewModel";
import ReviewCommitteeLectures from "./ReviewCommitteeLectures";
import ReviewCommitteeMembers from "./ReviewCommitteeMembers";

export const EnumReviewCommitteeStatus = {
    "1": "Chờ họp",
    "2": "Đã hoàn thành",
};

interface I extends IReviewCommitteeInfoViewModel {
    file?: File
}

export default function ReviewCommitteeUpdate( { data }: { data: IReviewCommitteeInfoViewModel } ) {
    const form = useForm<I>({
        initialValues: {
            ...data,
            file: new File([], data.filePath?.split("/")[data.filePath.split("/").length - 1]!),
        }
    })  

    const tabData = [
        { label: "Thông tin chung" },
        { label: "Thành viên" },
        { label: "Danh sách đề xuất" }
    ]

    return (
        <MyActionIconUpdate modalSize="70%" title="Chi tiết hội đồng xét duyệt" form={form} onSubmit={() => { }}>
            <MyTab variant="outline" tabList={tabData}>
                <Tabs.Panel value="Thông tin chung">
                    <Grid gutter="xl">
                        <Grid.Col span={6}>
                            <MyTextInput label="Mã hội đồng" {...form.getInputProps("code")} />
                            <MyTextInput label="Tên hội đồng" {...form.getInputProps("name")} />
                            <MySelect
                                label="Trạng thái hội đồng"
                                data={Object.entries(EnumReviewCommitteeStatus).map(([key, value]) => ({ value: key, label: value }))}
                                {...form.getInputProps("status")}
                            />
                            <MyTextArea
                                label="Ghi chú"
                                {...form.getInputProps("note")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <MyDateInput label="Ngày họp dự kiến" {...form.getInputProps("date")} />
                            <MyFileInput label="Đính kèm file" {...form.getInputProps("file")} />
                            <MyTextInput label="Địa điểm họp" {...form.getInputProps("location")} />
                        </Grid.Col>
                    </Grid>
                </Tabs.Panel>
                <Tabs.Panel value="Thành viên">
                    <ReviewCommitteeMembers data={data.members} />
                </Tabs.Panel>
                <Tabs.Panel value="Danh sách đề xuất">
                    <ReviewCommitteeLectures data={data.lectures} />
                </Tabs.Panel>
            </MyTab>
        </MyActionIconUpdate>
    );
}