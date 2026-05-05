"use client"
import ScoreConfigExamScoreCreateUpdate from "@/features/admin/scoreConfig/Exam/ScoreConfigExamScoreCreateUpdate";
import ScoreConfigProgressScoreCreateUpdate from "@/features/admin/scoreConfig/Progress/ScoreConfigProgressScoreCreateUpdate";
import { ProgramScoreConfigBody, programService } from "@/shared/APIs/programService";
import { Program } from "@/shared/interfaces/program";
import { ScoreConfig } from "@/shared/interfaces/scoreConfig";
import { utils_notification_show } from "@/utils/notification";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group, Select, SimpleGrid, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArticle, IconPresentationAnalytics } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";

/** Build body để vô hiệu hóa (xóa) một hoặc nhiều score config */
function buildDisableScoreConfigBody(
    programId: number,
    scoreType: 1 | 2,
    configs: ScoreConfig[]
): ProgramScoreConfigBody {
    return {
        programId,
        scoreSystem: 0,
        scoreFormula: 0,
        scorePass: 0,
        scoreConfigs: configs.map((c) => ({
            id: c.id,
            code: c.code,
            name: c.name,
            concurrencyStamp: c.concurrencyStamp ?? "lam",
            isEnabled: false,
            programId: c.programId,
            scoreType,
            percentScore: c.percentScore,
            scoreMax: c.scoreMax,
            scoreMin: c.scoreMin,
        })),
    };
}

export default function ScoreConfigUpdateProgram({ data }: { data: Program }) {
    const queryClient = useQueryClient();
    const programId = data.id ?? 0;

    const progressScoreConfigsQuery = useCustomReactQuery<ScoreConfig[]>({
        queryKey: ["program", programId, "scoreConfigs", "progress"],
        axiosFn: async () => {
            const res = await programService.get({ id: programId, params: "?cols=ScoreConfigs" });
            const list = (res.data?.data?.scoreConfigs ?? []).filter((c: ScoreConfig) => c.scoreType === 1);
            return { data: { data: list, isSuccess: 1 as const, message: "" }, status: 200, statusText: "", headers: {}, config: {} } as any;
        },
        options: { enabled: !!programId },
    });

    const examScoreConfigsQuery = useCustomReactQuery<ScoreConfig[]>({
        queryKey: ["program", programId, "scoreConfigs", "exam"],
        axiosFn: async () => {
            const res = await programService.get({ id: programId, params: "?cols=ScoreConfigs" });
            const list = (res.data?.data?.scoreConfigs ?? []).filter((c: ScoreConfig) => c.scoreType === 2);
            return { data: { data: list, isSuccess: 1 as const, message: "" }, status: 200, statusText: "", headers: {}, config: {} } as any;
        },
        options: { enabled: !!programId },
    });

    const invalidateProgramAndList = () => {
        queryClient.invalidateQueries({ queryKey: ["program", programId] });
        queryClient.invalidateQueries({ queryKey: ["scoreConfigs"] });
    };
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
        return (data.scoreConfigs ?? [])
            .filter((row) => row.scoreType === scoreType)
            .map((row) => row.percentScore)
            .filter((value): value is number => value !== undefined) || [];
    };

    const handleExtractDiemMax = (scoreType: number) => {
        return (data.scoreConfigs ?? [])
            .filter((row) => row.scoreType === scoreType)
            .map((row) => row.scoreMax)
            .filter((value): value is number => value !== undefined) || [];

    };
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
    useEffect(() => {
        if (data) {
            form.setValues(data);
        }
    }, [data]);
    if (!data) return "Không có dữ liệu..."
    return (
        <CustomButtonCreateUpdate
            isUpdate
            form={form}
            onSubmit={(values) => {
                if (!validateDataBeforeSubmit(values)) return false;
                const targetData = mapSourceToTarget(values);
                return programService.saveProgramScoreConfig(targetData);
            }}
            modalProps={{
                title: "Cấu hình điểm chương trình",
                size: "90%",
            }}
            actionIconProps={{ actionType: "update", color: "yellow" }}
            resetFormWhenSubmit={false}
            useCustomReactMutationProps={{
                successNotification: "Cập nhật thành công",
                options: { onSuccess: invalidateProgramAndList },
            }}
        >
            <CustomTabs
                tabs={[
                    {
                        label: "Điểm quá trình",
                        leftSection: <IconPresentationAnalytics />,
                        children: (
                            <>
                                <CustomFlexColumn>
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
                                                { value: "1", label: "Hệ 4" },
                                                { value: "2", label: "Hệ 10" },
                                                { value: "3", label: "Hệ 100" },
                                                { value: "4", label: "điểm danh" },
                                            ]}
                                            {...form.getInputProps("scoreSystem")}
                                            value={form.getValues().scoreSystem?.toString() ?? null}
                                            onChange={(value: any) => form.setFieldValue("scoreSystem", parseInt(value?.toString()!))}
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
                                                { value: "1", label: "Trọng số" },
                                                { value: "2", label: "Trung bình cộng" },
                                                { value: "3", label: "Tổng cộng" },
                                            ]}
                                            {...form.getInputProps("scoreFormula")}
                                            value={form.getValues().scoreFormula?.toString() ?? null}
                                            onChange={(value: any) => form.setFieldValue("scoreFormula", parseInt(value?.toString()!))}
                                        />
                                        <Text></Text>
                                        <CustomNumberInput hideControls defaultValue={1} label="Ngưỡng đạt" {...form.getInputProps("scorePass", { defaultValue: 1 })} />
                                    </SimpleGrid>
                                </CustomFlexColumn>
                                <CustomFieldset title="Danh sách thành phần điểm">
                                    <CustomDataTableAPI<ScoreConfig>
                                        query={progressScoreConfigsQuery}
                                        columns={columnsDiemQuaTrinh}
                                        enableRowSelection
                                        initialState={{ columnVisibility: { modifiedWhen: false, modifiedFullName: false } }}
                                        deleteFn={async (id) => {
                                            const row = progressScoreConfigsQuery.data?.find((r) => r.id === id);
                                            if (!row) return;
                                            await programService.saveProgramScoreConfig(buildDisableScoreConfigBody(programId, 1, [row]));
                                            invalidateProgramAndList();
                                        }}
                                        deleteListFn={async (ids) => {
                                            const rows = (progressScoreConfigsQuery.data ?? []).filter((r) => r.id != null && ids.includes(r.id));
                                            if (rows.length === 0) return;
                                            await programService.saveProgramScoreConfig(buildDisableScoreConfigBody(programId, 1, rows));
                                            invalidateProgramAndList();
                                        }}
                                        renderTopToolbarCustomActions={() => (
                                            <Group>
                                                <ScoreConfigProgressScoreCreateUpdate programId={programId} programData={form.getValues()} />
                                            </Group>
                                        )}
                                        renderRowActions={({ row }) => (
                                            <Group>
                                                <ScoreConfigProgressScoreCreateUpdate data={row.original} programId={programId} programData={form.getValues()} />
                                            </Group>
                                        )}
                                    />
                                </CustomFieldset>
                            </>
                        ),
                    },
                    {
                        label: "Điểm thi",
                        leftSection: <IconArticle />,
                        children: (
                            <>
                                <CustomFlexColumn>
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
                                                { value: "1", label: "Hệ 4" },
                                                { value: "2", label: "Hệ 10" },
                                                { value: "3", label: "Hệ 100" },
                                            ]}
                                            {...form.getInputProps("testScoreSystem")}
                                            value={form.getValues().testScoreSystem?.toString() ?? null}
                                            onChange={(value: any) => form.setFieldValue("testScoreSystem", parseInt(value?.toString()!))}
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
                                                { value: "1", label: "Trọng số" },
                                                { value: "2", label: "Trung bình cộng" },
                                                { value: "3", label: "Tổng cộng" },
                                            ]}
                                            value={form.getValues().testScoreFormula?.toString() ?? null}
                                            onChange={(value: any) => form.setFieldValue("testScoreFormula", parseInt(value?.toString()!))}
                                        />
                                        <Text></Text>
                                        <CustomNumberInput defaultValue={1} label="Ngưỡng đạt" {...form.getInputProps("testScorePass", { defaultValue: 1 })} />
                                    </SimpleGrid>
                                </CustomFlexColumn>
                                <CustomFieldset title="Danh sách thành phần điểm">
                                    <CustomDataTableAPI<ScoreConfig>
                                        query={examScoreConfigsQuery}
                                        columns={columnsDiemThi}
                                        enableRowSelection
                                        initialState={{ columnVisibility: { modifiedWhen: false, modifiedFullName: false } }}
                                        deleteFn={async (id) => {
                                            const row = examScoreConfigsQuery.data?.find((r) => r.id === id);
                                            if (!row) return;
                                            await programService.saveProgramScoreConfig(buildDisableScoreConfigBody(programId, 2, [row]));
                                            invalidateProgramAndList();
                                        }}
                                        deleteListFn={async (ids) => {
                                            const rows = (examScoreConfigsQuery.data ?? []).filter((r) => r.id != null && ids.includes(r.id));
                                            if (rows.length === 0) return;
                                            await programService.saveProgramScoreConfig(buildDisableScoreConfigBody(programId, 2, rows));
                                            invalidateProgramAndList();
                                        }}
                                        renderTopToolbarCustomActions={() => (
                                            <Group>
                                                <ScoreConfigExamScoreCreateUpdate programId={programId} programData={form.getValues()} />
                                            </Group>
                                        )}
                                        renderRowActions={({ row }) => (
                                            <Group>
                                                <ScoreConfigExamScoreCreateUpdate data={row.original} programId={programId} programData={form.getValues()} />
                                            </Group>
                                        )}
                                    />
                                </CustomFieldset>
                            </>
                        ),
                    },
                ]}
            />
        </CustomButtonCreateUpdate>
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

function checkNguongDat(nguongDat: number): boolean {
    if (nguongDat <= 0) {
        utils_notification_show({ crudType: "error", message: "Ngưỡng đạt phải lớn hơn 0, vui lòng kiểm tra lại" });
        return false;
    }
    return true;
}
function mapSourceToTarget(source: Program): ProgramScoreConfigBody {
    return {
        programId: source.id!,
        scoreSystem: source.scoreSystem ?? 0,
        scoreFormula: source.scoreFormula ?? 0,
        scorePass: source.scorePass ?? 0,
        testScoreSystem: source.testScoreSystem ?? null,
        testScoreFormula: source.testScoreFormula ?? null,
        testScorePass: source.testScorePass ?? null,
        scoreConfigs: (source.scoreConfigs ?? []).map(config => ({
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

