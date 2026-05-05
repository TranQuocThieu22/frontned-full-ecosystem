'use client'
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"; // Component nhập ngày
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Anchor, Fieldset } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id?: number;
    soQuyetDinh?: string;
    ngayQuyetDinh?: Date;
    tenQuyetDinh?: string;
    tenDeTai?: string;
    fileQuyetDinhSrc?: string;
}

export interface I5_4_1_1ListOfMember {
    code?: string //Mã giảng viên
    name?: string //Họ tên
    position?: string //Chức vụ hội đồng

}

export interface I5_4_1_1ListOfTopic {
    code?: string //Mã đề tài
    name?: string //Tên đề tài
    leaderName?: string //Chủ nhiệm đề tài
}
export default function F5_4_1_1Update({ values }: { values: I }) {
    const form = useForm<I>({
        initialValues: {
            id: undefined, // Sử dụng `undefined` cho giá trị số
            soQuyetDinh: "",
            ngayQuyetDinh: undefined, // Sử dụng `undefined` cho giá trị ngày
            tenQuyetDinh: "",
            tenDeTai: "",
            fileQuyetDinhSrc: ""
        }
    });

    const query = useQuery<I5_4_1_1ListOfMember[]>({
        queryKey: [`ListOfCouncilMember`],
        queryFn: async () => [
            {
                code: "GV001",
                name: "Nguyễn Văn A",
                position: "Chủ tịch",
            },
            {
                code: "GV002",
                name: "Trần Thị B",
                position: "Thư ký",
            },
            {
                code: "GV003",
                name: "Lê Văn C",
                position: "Ủy viên",
            },
        ],
    });

    const query1 = useQuery<I5_4_1_1ListOfTopic[]>({
        queryKey: [`ListOfTopics`],
        queryFn: async () => [
            {
                code: "DT001",
                name: "Nghiên cứu công nghệ AI trong giáo dục",
                leaderName: "Nguyễn Văn A",
            },
            {
                code: "DT002",
                name: "Phát triển hệ thống IoT cho nông nghiệp",
                leaderName: "Trần Thị B",
            },
            {
                code: "DT003",
                name: "Ứng dụng Blockchain trong quản lý dữ liệu",
                leaderName: "Lê Văn C",
            },
        ],
    });
    const columns = useMemo<MRT_ColumnDef<I5_4_1_1ListOfMember>[]>(() => [
        {
            header: "Mã giảng viên",
            accessorKey: "code",
        },
        {
            header: "Họ tên",
            accessorKey: "name",
        },
        {
            header: "Chức vụ hội đồng",
            accessorKey: "position",
        },
        {
            header: "Lý lịch",
            accessorKey: "lyLich",
            Cell: ({ cell }) => <Anchor>Xem lý lịch</Anchor>,
        },
    ], []);

    const columns1 = useMemo<MRT_ColumnDef<I5_4_1_1ListOfTopic>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "name",
        },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "leaderName",
        },
    ], []);
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";





    if (query1.isLoading) return "Đang tải dữ liệu...";
    if (query1.isError) return "Không có dữ liệu...";
    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyTextInput
                label="Số Quyết Định"
                {...form.getInputProps("soQuyetDinh")}
            />
            <MyDateInput
                label="Ngày Quyết Định"
                {...form.getInputProps("ngayQuyetDinh")}
            />
            <MyTextInput
                label="Tên Quyết Định"
                {...form.getInputProps("tenQuyetDinh")}
            />
            <Fieldset legend="Đề tài">
                <MyDataTable
                    columns={columns}
                    data={query.data!}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <MyActionIcon crudType="update" />
                                <MyActionIcon crudType="delete" />
                            </MyCenterFull>
                        );
                    }}
                />
            </Fieldset>
            <Fieldset legend="Đề tài">
                <MyDataTable
                    columns={columns1}
                    data={query1.data!}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <MyActionIcon crudType="update" />
                                <MyActionIcon crudType="delete" />
                            </MyCenterFull>
                        );
                    }}
                />
            </Fieldset>

        </MyActionIconUpdate>
    );
}
