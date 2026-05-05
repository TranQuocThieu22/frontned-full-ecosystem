"use client"
import baseAxios from "@/api/config/baseAxios";
import { MyActionIconModal } from "@/components/ActionIcons/ActionIconModal/MyActionIconModal";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { utils_notification_show } from "@/utils/notification";
import { Group, Select, SimpleGrid, Tabs, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconArticle, IconEdit, IconPresentationAnalytics } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { MyFieldset, MyNumberInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import F3_3CreateExamScore from "./Exam/F3_3CreateExamScore";
import F3_3DeleteExamScore from "./Exam/F3_3DeleteExamScore";
import F3_3DeleteListExamScore from "./Exam/F3_3DeleteListExamScore";
import F3_3UpdateExamScore from "./Exam/F3_3UpdateExamScore";
import F3_3CreateProgressScore from "./Progress/F3_3CreateProgressScore";
import F3_3DeleteDiemQuaTrinh from "./Progress/F3_3DeleteProgressScore";
import F3_3UpdateProgressScore from "./Progress/F3_3UpdateProgressScore";


export default function F3_3UpdateProgram({ data }: { data: Program }) {
    const disc = useDisclosure()
    const queryClient = useQueryClient()
    const HE_NHAP_DIEM = {
        TRONG_SO: 1,
        TRUNG_BINH_CONG: 2,
        TONG_CONG: 3,
        DIEM_DANH: 4
    }
    const LOAI_DIEM = {
        DIEM_QUA_TRINH: 1,
        DIEM_THI: 2,
    }
    const handleExtractTrongSo = (scoreType: number) => {
        return data.scoreConfigs
            .filter((row) => row.scoreType === scoreType)
            .map((row) => row.percentScore)
            .filter((value): value is number => value !== undefined) || [];
    };

    const handleExtractDiemMax = (scoreType: number) => {
        return data.scoreConfigs
            .filter((row) => row.scoreType === scoreType)
            .map((row) => row.scoreMax)
            .filter((value): value is number => value !== undefined) || [];

    };
    const [activeTab, setActiveTab] = useState<string | null>('diemQuaTrinh');

    const form = useForm<Program>({
        mode: "uncontrolled",
        initialValues: data,
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            programType: (value) => value ? null : 'Không được để trống',
        }
    })
    const validateDataBeforeSubmit = (data: any): boolean => {
        const { scoreSystem, scoreFormula, testScoreFormula, scorePass } = data;

        // 1. Validate attendance-based score pass threshold
        if (scoreSystem === HE_NHAP_DIEM.DIEM_DANH) {
            const isPassThresholdValid = checkNguongDat(scorePass);
            if (!isPassThresholdValid) return false;
        }

        // 2. Validate process score formula
        if (!validateScoreFormula(scoreFormula, LOAI_DIEM.DIEM_QUA_TRINH, scoreSystem)) {
            return false;
        }

        // 3. Validate test score formula
        if (!validateScoreFormula(testScoreFormula, LOAI_DIEM.DIEM_THI, scoreSystem)) {
            return false;
        }

        return true;

    };

    function validateScoreFormula(
        formula: number,
        loaiDiem: number,
        scoreSystem: number
    ): boolean {
        if (formula === HE_NHAP_DIEM.TRONG_SO) {
            const weights = handleExtractTrongSo(loaiDiem);
            return calculateTrongDiem(weights, 100);
        }

        if (formula === HE_NHAP_DIEM.TONG_CONG) {
            const maxScores = handleExtractDiemMax(loaiDiem);
            return calculateDiemMax(maxScores, scoreSystem);
        }

        return true; // Assume valid if no matching formula
    }


    const columnsDiemQuaTrinh = useMemo<MRT_ColumnDef<ScoreConfig>[]>(
        () => [

            {
                header: "Mã thành phần",
                accessorKey: "code"
            },
            {
                header: "Tên thành phần",
                accessorKey: "name"
            },
            {
                header: "Trọng số",
                accessorKey: "percentScore",

            },
            {
                header: "Điểm max",
                accessorKey: "scoreMax",

            },
            {
                header: "Ngưỡng liệt",
                accessorKey: "scoreMin",

            },
        ]
        ,
        []
    );
    const columnsDiemThi = useMemo<MRT_ColumnDef<ScoreConfig>[]>(
        () => [

            {
                header: "Mã thành phần",
                accessorKey: "code"
            },
            {
                header: "Tên thành phần",
                accessorKey: "name"
            },
            {
                header: "Trọng số",
                accessorKey: "percentScore",

            },
            {
                header: "Điểm max",
                accessorKey: "scoreMax",

            },
            {
                header: "Ngưỡng liệt",
                accessorKey: "scoreMin",

            },

        ]
        ,
        []
    );
    const handleInnerSubmit = async (value: Program) => {
        if (!validateDataBeforeSubmit(form.getValues())) {
            return
        }
        const targetData = mapSourceToTarget(value);
        await baseAxios.post("/Program/ProgramScoreConfig", targetData)
        notifications.show({
            message: "Thêm thành công"
        })
        await queryClient.invalidateQueries({ queryKey: ["F3_3Read"] })
        disc[1].close()
    };
    useEffect(() => {
        if (data) {
            form.setValues(data);
        }
    }, [data]);
    if (!data) return "Không có dữ liệu..."
    return (
        <>
            <MyActionIconModal
                color='yellow'
                icon={<IconEdit />}
                disclosure={disc}
                modalSize={"90%"}
            >

                <form >
                    <Tabs value={activeTab} onChange={setActiveTab}>
                        <Tabs.List mb={16}>
                            <Tabs.Tab
                                bg={"rgba(131, 204, 235, 0.3)"}
                                color="rgba(131, 204, 235, 1)"
                                leftSection={<IconPresentationAnalytics />}
                                style={{ width: "50%" }}
                                value="diemQuaTrinh">Điểm quá trình</Tabs.Tab>
                            <Tabs.Tab
                                bg={"rgba(247, 216, 54, 0.3)"}
                                color="rgba(247, 216, 54, 1)"
                                leftSection={<IconArticle />}
                                style={{ width: "50%" }}
                                value="diemThi">Điểm thi </Tabs.Tab>
                        </Tabs.List>
                        {/* Điểm quá trình Tab */}

                        <Tabs.Panel value="diemQuaTrinh" >
                            <MyFlexColumn>
                                <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
                                    <Group>
                                        <Text fw={700}>Mã chương trình:</Text>
                                        <Text> {form.values.code}</Text>
                                    </Group>
                                    <Group>
                                        <Text fw={700}>Loại chương trình:</Text>
                                        <Text> {form.values.programType?.name}</Text>
                                    </Group>
                                    <Group>
                                        <Text fw={700}>Tên chương trình: </Text>
                                        <Text> {form.values.name}</Text>
                                    </Group>
                                    <Select
                                        clearable={false}
                                        placeholder='Chọn hệ điểm nhập'
                                        label='Hệ điểm nhập'
                                        data={[
                                            {
                                                value: "1",
                                                label: "Hệ 4"
                                            },
                                            {
                                                value: "2",
                                                label: "Hệ 10"
                                            },
                                            {
                                                value: "3",
                                                label: "Hệ 100"
                                            },
                                            {
                                                value: "4",
                                                label: "điểm danh"
                                            },
                                        ]}
                                        {...form.getInputProps("scoreSystem")}
                                        value={form.getValues().scoreSystem?.toString() ?? null}
                                        onChange={(value: any) => {
                                            form.setFieldValue("scoreSystem", parseInt(value?.toString()!))

                                        }}
                                    />


                                    <Group>
                                        <Text fw={700}>Tổng số tiết: </Text>
                                        <Text>{form.values.totalClassPeriodNumber}</Text>

                                    </Group>
                                    <Select
                                        clearable={false}

                                        placeholder='Chọn cách tổng kết'
                                        label='Cách tổng kết'
                                        data={[
                                            {
                                                value: "1",
                                                label: "Trọng số"
                                            },
                                            {
                                                value: "2",
                                                label: "Trung bình cộng"
                                            },
                                            {
                                                value: "3",
                                                label: "Tổng cộng"
                                            },
                                        ]}
                                        {...form.getInputProps("scoreFormula")}
                                        value={form.getValues().scoreFormula?.toString() ?? null}
                                        onChange={(value: any) => form.setFieldValue("scoreFormula", parseInt(value?.toString()!))}
                                    />
                                    <Text></Text>
                                    <MyNumberInput hideControls defaultValue="1" label="Ngưỡng đạt" {...form.getInputProps("scorePass", { defaultValue: 1 })} />

                                </SimpleGrid>
                            </MyFlexColumn>
                            <MyFieldset title="Danh sách thành phần điểm">

                                <MyDataTable
                                    enableRowSelection={true}
                                    columns={columnsDiemQuaTrinh}
                                    enableRowNumbers={true}
                                    data={data.scoreConfigs!.filter(config => config.scoreType === 1) || []}
                                    renderTopToolbarCustomActions={({ table }) => {
                                        return (
                                            <Group>
                                                <F3_3CreateProgressScore programId={data.id} programData={form.getValues()} />
                                                <F3_3DeleteListExamScore values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                                            </Group>
                                        )
                                    }}
                                    renderRowActions={({ row }) => {
                                        return (
                                            <MyCenterFull>
                                                <F3_3UpdateProgressScore ScoreConfigData={row.original} programData={form.getValues()} />
                                                <F3_3DeleteDiemQuaTrinh data={row.original} />
                                            </MyCenterFull>
                                        )
                                    }}
                                />
                            </MyFieldset>
                        </Tabs.Panel>
                        {/* Điểm thi Tab */}
                        <Tabs.Panel value="diemThi">
                            <MyFlexColumn>
                                <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
                                    <Group>
                                        <Text fw={700}>Mã chương trình:</Text>
                                        <Text> {form.values.code}</Text>
                                    </Group>
                                    <Group>
                                        <Text fw={700}>Loại chương trình:</Text>
                                        <Text> {form.values.programType?.name}</Text>
                                    </Group>
                                    <Group>
                                        <Text fw={700}>Tên chương trình: </Text>
                                        <Text> {form.values.name}</Text>
                                    </Group>

                                    <Select
                                        clearable={false}

                                        placeholder='Chọn hệ điểm nhập'
                                        label='Hệ điểm nhập'
                                        data={[
                                            {
                                                value: "1",
                                                label: "Hệ 4"
                                            },
                                            {
                                                value: "2",
                                                label: "Hệ 10"
                                            },
                                            {
                                                value: "3",
                                                label: "Hệ 100"
                                            },

                                        ]}
                                        {...form.getInputProps("testScoreSystem")}
                                        value={form.getValues().testScoreSystem?.toString() ?? null}
                                        onChange={(value: any) => form.setFieldValue("testScoreSystem", parseInt(value?.toString()!))}

                                    // onChange={(_value, option) => {
                                    //     if (_value !== null) {
                                    //         form.setFieldValue("heDiemNhap", parseInt(_value.toString()))
                                    //     }
                                    // }}
                                    />


                                    <Group>
                                        <Text fw={700}>Tổng số tiết: </Text>
                                        <Text>{form.values.totalClassPeriodNumber}</Text>

                                    </Group>
                                    <Select
                                        clearable={false}

                                        placeholder='Chọn cách tổng kết'
                                        label='Cách tổng kết'
                                        data={[
                                            {
                                                value: "1",
                                                label: "Trọng số"
                                            },
                                            {
                                                value: "2",
                                                label: "Trung bình cộng"
                                            },
                                            {
                                                value: "3",
                                                label: "Tổng cộng"
                                            },
                                        ]}
                                        value={form.getValues().testScoreFormula?.toString() ?? null}
                                        onChange={(value: any) => form.setFieldValue("testScoreFormula", parseInt(value?.toString()!))}

                                    />
                                    <Text></Text>
                                    <MyNumberInput defaultValue="1" label="Ngưỡng đạt" {...form.getInputProps("testScorePass", { defaultValue: 1 })} />
                                </SimpleGrid>
                            </MyFlexColumn>
                            <MyFieldset title="Danh sách thành phần điểm">
                                <MyDataTable

                                    enableRowSelection={true}
                                    columns={columnsDiemThi}
                                    enableRowNumbers={true}
                                    data={data.scoreConfigs?.filter(config => config.scoreType === 2) || []}
                                    renderTopToolbarCustomActions={({ table }) => {
                                        return (
                                            <Group>
                                                <F3_3CreateExamScore programId={data.id} programData={form.getValues()} />
                                                <F3_3DeleteListExamScore values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                                            </Group>
                                        )
                                    }}
                                    renderRowActions={({ row }) => {
                                        return (
                                            <MyCenterFull>
                                                <F3_3UpdateExamScore ScoreConfigData={row.original} programData={form.getValues()} />
                                                <F3_3DeleteExamScore data={row.original} />
                                            </MyCenterFull>
                                        )
                                    }}
                                />
                            </MyFieldset>
                        </Tabs.Panel>
                    </Tabs>
                </form>
                <MyButton crudType='save' type='button'
                    onClick={() => handleInnerSubmit(form.getValues())}></MyButton>
            </MyActionIconModal>

        </>
    )
}



function IsTrongSo(trongDiem: number[]) {
    return trongDiem.length === 0 ? false : true

}

function isTrongSoEqualTo(trongDiem: number[], target: number): boolean {
    const total = trongDiem.reduce((sum, value) => sum + value, 0);
    return total == target;
}

function calculateTrongDiem(trongSoDiemThanhPhan: number[], target: number) {
    const isTrongSoDiem = IsTrongSo(trongSoDiemThanhPhan);
    const isTotalEqualToTarget = isTrongSoEqualTo(trongSoDiemThanhPhan, target);

    if (!isTrongSoDiem) {
        utils_notification_show({ crudType: "error", message: "Bạn chưa nhập trọng số cho thành phần điểm chương trình, vui lòng kiểm tra lại" });
        return false
    }
    if (!isTotalEqualToTarget) {
        utils_notification_show({ crudType: "error", message: "Trọng số % đã nhập chưa đủ 100%, bạn vui lòng kiểm tra lại" });
        return false
    }
    return true
}
function calculateDiemMax(
    diemMaxDiemThanhPhanValues: number[],
    heDiemNhap: number
): boolean {
    const dataHeDiemNhap: { [key: number]: number } = {
        1: 4,
        2: 10,
        3: 100,
    };
    const expectedSum = dataHeDiemNhap[heDiemNhap] ?? 0;
    const totalDiemMax = diemMaxDiemThanhPhanValues.reduce((sum, value) => sum + value, 0);
    console.log('====================================');
    console.log('totalDiemMax', totalDiemMax);
    console.log('expectedSum', expectedSum);
    console.log('====================================');
    const isDiemMaxValid = totalDiemMax === expectedSum;
    if (isDiemMaxValid) {
        return true;
    } else {
        utils_notification_show({
            crudType: "error",
            message: "Tổng điểm max của thành phần không khớp với hệ điểm nhập, vui lòng kiểm tra lại"
        });
        return false
    }
}

function checkNguongDat(nguongDat: number) {
    if (nguongDat <= 0) {
        utils_notification_show({ crudType: "error", message: "Ngưỡng đạt phải lớn hơn 0, vui lòng kiểm tra lại" });
        return false
    }
}
function mapSourceToTarget(source: Program): TargetData {
    return {
        programId: source.id,
        scoreSystem: source.scoreSystem,
        scoreFormula: source.scoreFormula,
        scorePass: source.scorePass,
        testScoreSystem: source.testScoreSystem,
        testScoreFormula: source.testScoreFormula,
        testScorePass: source.testScorePass,
        scoreConfigs: source.scoreConfigs.map(config => ({
            id: config.id,
            code: config.code,
            name: config.name,
            concurrencyStamp: config.concurrencyStamp,
            isEnabled: config.isEnabled,
            programId: config.programId,
            scoreType: config.scoreType,
            percentScore: config.percentScore,
            scoreMax: config.scoreMax,
            scoreMin: config.scoreMin,
        })),
    };
}

interface TargetScoreConfig {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    programId: number;
    scoreType: number;
    percentScore: number;
    scoreMax: number;
    scoreMin: number;
}

interface TargetData {
    programId: number;
    scoreSystem: number;
    scoreFormula: number;
    scorePass: number;
    testScoreSystem: number | null;
    testScoreFormula: number | null;
    testScorePass: number | null;
    scoreConfigs: TargetScoreConfig[];
}

export interface Program {
    skillCenterId: number;
    programTypeId: number;
    totalClassPeriodNumber: number;
    totalHours: number;
    isTesting: boolean;
    certificateId: number;
    isCancel: boolean;
    note: string;
    price: number;
    scoreSystem: number;
    scoreFormula: number;
    scorePass: number;
    testScoreSystem: number | null;
    testScoreFormula: number | null;
    testScorePass: number | null;
    certificate: any; // Adjust the type based on the actual structure
    skillCenter: any; // Adjust the type based on the actual structure
    subjects: any; // Adjust the type based on the actual structure
    programType: ProgramType;
    programSubjects: any[]; // Adjust the type based on the actual structure
    scoreConfigs: ScoreConfig[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ProgramType {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ScoreConfig {
    programId: number;
    scoreType: number;
    percentScore: number;
    scoreMax: number;
    scoreMin: number;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
