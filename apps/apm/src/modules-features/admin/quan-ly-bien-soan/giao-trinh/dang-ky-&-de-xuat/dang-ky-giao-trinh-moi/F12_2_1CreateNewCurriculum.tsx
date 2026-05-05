'use client'
import { Grid, MultiSelect, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIcon, MyActionIconDelete, MyButtonCreate, MyCenterFull, MyDataTable, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IF12_2_1ReadNewCurriculum, IF12_2_1ReadNewCurriculumTable } from "./F12_2_1ReadNewCurriculum";
import { mockDataFieldOfStudy, mockDataMajorApplied } from "./mockData";
export default function F12_2_1CreateNewCurriculum() {
    const columns = useMemo<MRT_ColumnDef<IF12_2_1ReadNewCurriculumTable>[]>(() => [
        {
            header: "Mã NS",
            id: "code",
            accessorFn: row => (
                <MyTextInput
                    value={row.code}
                    onChange={() => { }}
                />
            ),
        },
        {
            header: "Họ tên",
            id: "name",
            accessorFn: row => (
                <MyTextInput
                    value={row.name}
                    onChange={() => { }}
                />
            ),
        },
        {
            header: "Đơn vị",
            id: "department",
            accessorFn: row => (
                <MyTextInput
                    value={row.department}
                    onChange={() => { }}
                />
            ),
        },
        {
            header: "Email",
            id: "email",
            accessorFn: row => (
                <MyTextInput
                    value={row.email}
                    onChange={() => { }}
                />
            ),
        },
        {
            header: "Số điện thoại",
            id: "phoneNumber",
            accessorFn: row => (
                <MyTextInput
                    value={row.phoneNumber}
                    onChange={() => { }}
                />
            ),
        },
        {
            header: "Vai trò",
            id: "role",
            accessorFn: row => (
                <MySelect
                    data={["Chủ biên", "Biên tập viên", "Thành viên"]}
                    value={row.role}
                    onChange={() => { }}
                />
            ),
        },
    ], []);
    const form = useForm<IF12_2_1ReadNewCurriculum>({
        initialValues: {
            suggestionCode: "",
            curriculumVietnameseName: "",
            curriculumEnglishName: "",
            fieldOfStudy: {
                fieldName: "",
                fieldMajor: ""
            },
            majorApplied: [],
            curriculumDescription: "",
            authors: [],
            informationOfAuthor: [
                {
                    emailOfAuthor: "",
                    phoneNumberOfAuthor: "",
                }
            ],
            expectedEditorialsMembers: [],
            applicationOfCurriculum: "",
            targetOfCurriculum: "",
            expectedChapters: 0,
            expectedPages: 0,
            expectedCompletionMonth: "",
            suggestionStatus: "",
            suggestionDate: "",
            suggestedBy: "",
        },
        validate: {
            suggestionCode: (value) => (value ? null : "Mã đề xuất không được để trống"),
            curriculumVietnameseName: (value) => (value ? null : "Tên giáo trình tiếng Việt không được để trống"),
            curriculumEnglishName: (value) => (value ? null : "Tên giáo trình tiếng Anh không được để trống"),
            fieldOfStudy: (value) => (value && value.fieldName && value.fieldMajor ? null : "Lĩnh vực học không được để trống"),
            majorApplied: (value) => (value ? null : "Chuyên ngành áp dụng không được để trống"),
            curriculumDescription: (value) => (value ? null : "Mô tả giáo trình không được để trống"),
            authors: (value) => (value && value.length > 0 ? null : "Danh sách tác giả không được để trống"),
            informationOfAuthor: {
                emailOfAuthor: (value) => (value ? null : "Email của tác giả không được để trống"),
                phoneNumberOfAuthor: (value) => (value ? null : "Số điện thoại của tác giả không được để trống"),
            },
            expectedEditorialsMembers: (value) => (value && value.length > 0 ? null : "Danh sách thành viên biên tập không được để trống"),
            applicationOfCurriculum: (value) => (value ? null : "Mục đích của giáo trình không được để trống"),
            targetOfCurriculum: (value) => (value ? null : "Đối tượng sử dụng giáo trình không được để trống"),
            expectedChapters: (value) => (typeof value === 'number' && value > 0 ? null : "Số chương dự kiến phải lớn hơn 0"),
            expectedPages: (value) => (typeof value === 'number' && value > 0 ? null : "Số trang dự kiến phải lớn hơn 0"),
            expectedCompletionMonth: (value) => (value ? null : "Tháng hoàn thành dự kiến không được để trống"),
            needOfUsage: (value) => (value ? null : "Nhu cầu sử dụng không được để trống"),
        },
    });

    const studyFieldOptions = useMemo(() =>
        mockDataFieldOfStudy.map(field => ({
            value: JSON.stringify(field),
            label: field.fieldName
        })),
        []
    );

    return (
        <MyButtonCreate modalSize={"80%"} objectName="đăng ký đề xuất" form={form} onSubmit={(values) => console.log(values)}>
            <Tabs defaultValue={"Thông tin chung"}>
                <Tabs.List>
                    <Tabs.Tab value="Thông tin chung">Thông tin chung</Tabs.Tab>
                    <Tabs.Tab value="Thành viên">Thành viên</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="Thông tin chung" pt="xs">
                    <Grid>
                        <Grid.Col span={6}>
                            <MyTextInput label="Mã đề xuất" {...form.getInputProps("suggestionCode")}></MyTextInput>

                            <MyTextInput pt={10} label="Tên giáo trình tiếng Việt" {...form.getInputProps("curriculumVietnameseName")}></MyTextInput>

                            <MyTextInput pt={10} label="Tên giáo trình tiếng Anh" {...form.getInputProps("curriculumEnglishName")}></MyTextInput>

                            <MySelect
                                label="Lĩnh vực học"
                                data={studyFieldOptions}
                                pt={10}
                            />

                            <MultiSelect pt={10} label="Chuyên ngành áp dụng" data={mockDataMajorApplied}
                                value={form.values.majorApplied} {...form.getInputProps("majorApplied")}
                            />

                            <MyTextInput pt={10} label="Mục đích của Giáo trình" {...form.getInputProps("applicationOfCurriculum")}></MyTextInput>
                            <MyTextInput label="Mã đề xuất" {...form.getInputProps("suggestionCode")}></MyTextInput>
                        </Grid.Col>


                            <Grid.Col span={6}>
                                <MyTextInput label="Đối tượng sử dụng giáo trình" {...form.getInputProps("targetOfCurriculum")}></MyTextInput>

                                <MyTextInput pt={10} label="Các chương dự kiến" type="number" {...form.getInputProps("expectedChapters")}></MyTextInput>

                                <MyTextInput pt={10} label="Số trang dự kiến" type="number" {...form.getInputProps("expectedPages")}></MyTextInput>

                                <MyTextInput pt={10} label="Dự kiến thời gian hoàn thành" {...form.getInputProps("expectedCompletionMonth")}></MyTextInput>

                                <MyTextInput pt={10} label="Nhu cầu sử dụng" {...form.getInputProps("needOfUsage")}></MyTextInput>

                                <MyFileInput pt={10} label="File đính kèm" {...form.getInputProps("fileAttachment")}></MyFileInput>
                            </Grid.Col>
                    </Grid>
                    <MyTextArea pt={10} label="Mô tả tóm tắt Giáo trình" {...form.getInputProps("curriculumDescription")} />

                </Tabs.Panel>
                <Tabs.Panel value="Thành viên">
                    <MyDataTable
                        columns={columns}
                        data={[]}
                        enableRowSelection={false}
                        enableRowNumbers={false}
                        exportAble={false}
                        renderRowActions={({ row }) => (
                            <MyCenterFull>
                                <MyActionIconDelete onSubmit={() => { }} />
                            </MyCenterFull>
                        )}
                        renderTopToolbarCustomActions={() => (
                            <>
                                <MyActionIcon crudType="create" color={"green"} onSubmit={() => { }} />
                            </>
                        )}
                    >
                    </MyDataTable>
                </Tabs.Panel>
            </Tabs>
        </MyButtonCreate>
    );
}