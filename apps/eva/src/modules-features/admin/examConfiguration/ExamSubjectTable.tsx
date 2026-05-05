'use client';

import { Button, Flex, Group, Modal, Select, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MyCenterFull, MyDataTable, MyFieldset, MyTextEditor } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ExamSectionListModal from "./ExamSectionListModal";

export interface ExamSubject {
    code?: string;
    name?: string;
    totalExamSections?: number;
    rules?: string;
    questionDisplayType?: string;
    studentExecutionType?: string;
}

export default function ExamSubjectTable() {

    const discUpdateExamSubject = useDisclosure(false);

    const query = useQuery<ExamSubject[]>({
        queryKey: [`ExamSubjectList`],
        queryFn: async () => mockData
    })

    const columns = useMemo<MRT_ColumnDef<ExamSubject>[]>(
        () => [
            {
                header: "Mã môn học",
                accessorKey: "code",
            },
            {
                header: "Tên môn học",
                accessorKey: "name",
            },
            {
                header: "Số nhóm thi",
                accessorKey: "totalExamSections",
                accessorFn: (row) => {
                    return <ExamSectionListModal soLuong={row.totalExamSections!} />;
                }
            },
            {
                header: "Nội quy",
                accessorKey: "rules",
            }, {
                header: "Cách trình bày",
                accessorKey: "questionDisplayType",
            }, {
                header: "Hình thức thi",
                accessorKey: "studentExecutionType",
            },
        ],
        []
    );

    return (
        <>
            <MyFieldset title="Danh sách môn thi" >
                <MyDataTable
                    enableRowSelection={false}
                    columns={columns}
                    enableRowNumbers={true}
                    data={query.data || []}
                    exportAble={true}
                    renderRowActions={({ row }) => (
                        <>
                            <MyCenterFull>
                                <Button
                                    color="violet"
                                    variant="light"
                                    onClick={() => discUpdateExamSubject[1].open()}>
                                    Cập nhật
                                </Button>
                            </MyCenterFull>
                        </>
                    )}
                />
            </MyFieldset >
            <Modal
                size={"lg"}
                opened={discUpdateExamSubject[0]}
                onClose={discUpdateExamSubject[1].close}
                title="Chi tiết cấu hình thi">
                <>
                    <Flex
                        direction="column"
                    >
                        <Group
                            w={"100%"}
                            align="start"
                            justify="space-between"
                        >
                            <Group gap={5} w={"100%"}><Text fw={600}>Môn học: </Text>CSDLCB - Cơ sở dữ liệu cơ bản</Group>
                            <Select
                                label="Cách trình bày"
                                placeholder="chọn cách trình bày"
                                data={[
                                    { value: '1', label: 'Từng câu' },
                                    { value: '2', label: 'Cuộn trang' }
                                ]}
                                defaultValue={"1"}
                                clearable
                                w={{ base: "100%" }}
                            />
                            <Select
                                label="Hình thức thi"
                                placeholder="chọn hình thức thi"
                                data={[
                                    { value: '1', label: 'Tập trung' },
                                    { value: '2', label: 'Cuốn chiếu' }
                                ]}
                                defaultValue={"1"}
                                clearable
                                w={{ base: "100%" }}
                            />
                            <MyTextEditor
                                label="Nội quy thi"
                                contentHeight="200px"
                            />
                            <Button
                                w={"100%"}
                                color="blue" onClick={() => discUpdateExamSubject[1].close()}>
                                Lưu
                            </Button>
                        </Group>
                    </Flex>
                </>
            </Modal>
        </>
    )
}

const mockData: ExamSubject[] = [
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "totalExamSections": 5,
        "rules": "Không mang tài liệu vào phòng thi, không sử dụng điện thoại di động.",
        "questionDisplayType": "Từng câu",
        "studentExecutionType": "Tập trung",
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "totalExamSections": 2,
        "rules": "Không mang tài liệu vào phòng thi, không sử dụng điện thoại di động.",
        "questionDisplayType": "Từng câu",
        "studentExecutionType": "Tập trung",
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "totalExamSections": 5,
        "rules": "Không mang tài liệu vào phòng thi, không sử dụng điện thoại di động.",
        "questionDisplayType": "Từng câu",
        "studentExecutionType": "Tập trung",
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "totalExamSections": 2,
        "rules": "Không mang tài liệu vào phòng thi, không sử dụng điện thoại di động.",
        "questionDisplayType": "Từng câu",
        "studentExecutionType": "Tập trung",
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "totalExamSections": 4,
        "rules": "Không mang tài liệu vào phòng thi, không sử dụng điện thoại di động.",
        "questionDisplayType": "Từng câu",
        "studentExecutionType": "Tập trung",
    },
    {
        "code": "TCC",
        "name": "Toán cao cấp",
        "totalExamSections": 3,
        "rules": "Không mang tài liệu vào phòng thi, không sử dụng điện thoại di động.",
        "questionDisplayType": "Từng câu",
        "studentExecutionType": "Tập trung",
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "totalExamSections": 5,
        "rules": "Không mang tài liệu vào phòng thi, không sử dụng điện thoại di động.",
        "questionDisplayType": "Từng câu",
        "studentExecutionType": "Tập trung",
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "totalExamSections": 2,
        "rules": "Không mang tài liệu vào phòng thi, không sử dụng điện thoại di động.",
        "questionDisplayType": "Từng câu",
        "studentExecutionType": "Tập trung",
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "totalExamSections": 5,
        "rules": "Không mang tài liệu vào phòng thi, không sử dụng điện thoại di động.",
        "questionDisplayType": "Từng câu",
        "studentExecutionType": "Tập trung",
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "totalExamSections": 2,
        "rules": "Không mang tài liệu vào phòng thi, không sử dụng điện thoại di động.",
        "questionDisplayType": "Từng câu",
        "studentExecutionType": "Tập trung",
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "totalExamSections": 4,
        "rules": "Không mang tài liệu vào phòng thi, không sử dụng điện thoại di động.",
        "questionDisplayType": "Từng câu",
        "studentExecutionType": "Tập trung",
    },
    {
        "code": "TCC",
        "name": "Toán cao cấp",
        "totalExamSections": 3,
        "rules": "Không mang tài liệu vào phòng thi, không sử dụng điện thoại di động.",
        "questionDisplayType": "Cuộn trang",
        "studentExecutionType": "Cuốn chiếu",
    }
]