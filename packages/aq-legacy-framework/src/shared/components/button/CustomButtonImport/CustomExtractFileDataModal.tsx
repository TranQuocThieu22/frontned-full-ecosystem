import { CustomDataTable } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { colorsObject } from "@aq-fe/aq-legacy-framework/shared/const/object/colorsObject";
import { Button, Modal, ModalProps, SimpleGrid, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowRight, IconDatabaseExport, IconRun } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { read, utils } from "xlsx";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomFlexEnd } from "@aq-fe/aq-legacy-framework/shared/components/layout/CustomFlexEnd";

interface CustomExtractFileDataFormProps extends ModalProps {
    onContinute: (values: any[]) => void
    handleExportStructure: () => void
}

export default function CustomExtractFileDataModal({
    onContinute,
    onClose,
    handleExportStructure,
    ...rest
}: CustomExtractFileDataFormProps) {
    const fileState = useState<File | null>()
    const titleIndexState = useState<string | null>()
    const dataStartIndexState = useState<string | null>()
    const rawDataState = useState<any[][]>([])
    const [fileKey, setFileKey] = useState(Date.now());
    const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
        if (!rawDataState[0] || rawDataState[0].length === 0) return [];
        const maxColLength = Math.max(...rawDataState[0].map((row) => row.length));
        return Array.from({ length: maxColLength }, (_, idx) => ({
            accessorKey: `col_${idx}`,
            header: `Cột ${idx + 1}`,
        }));
    }, [rawDataState[0]]);

    const data = useMemo(() => {
        const finalData = rawDataState[0].map((row) => {
            const obj: any = {};
            row.forEach((cell, idx) => {
                obj[`col_${idx}`] = cell; // 🔥 dùng format hiển thị
            });
            return obj;
        });
        return finalData
    }, [rawDataState[0]]);

    const handleContinute = () => {
        if (!handleValidate()) return
        const headerRowIndex = titleIndexState[0] ? parseInt(titleIndexState[0]) - 1 : null;
        const dataRowIndex = dataStartIndexState[0] ? parseInt(dataStartIndexState[0]) - 1 : null;

        const headers = rawDataState[0][headerRowIndex!];
        const result = rawDataState[0].slice(dataRowIndex!).map((row) => {
            const rowObj: any = {}
            headers?.forEach((key: string, idx: number) => {
                rowObj[key || `col_${idx}`] = row[idx]
            })
            return rowObj
        })
        onContinute(result)
    }

    const handleValidate = (): boolean => {
        if (dataStartIndexState[0] == null || titleIndexState[0] == null) {
            notifications.show({
                color: "red",
                message: "Vui lòng chọn vị trí dòng tiêu đề và ví trí dòng dữ liệu bắt đầu!"
            })
            return false
        }
        if (dataStartIndexState[0] <= titleIndexState[0]) {
            notifications.show({
                color: "red",
                message: "Vị trí dòng dữ liệu bắt đầu phải lớn hơn vị trí dòng tiêu đề!"
            })
            return false
        }
        return true
    }
    return (
        <Modal
            title="Cấu hình lấy dữ liệu"
            size={"80em"}
            onClose={onClose}
            {...rest}
        >
            <Stack >
                <CustomFileInput
                    clearable
                    value={fileState[0]}
                    accept=".xlsx,.xls,.csv"
                    key={fileKey}
                    onChange={async (file) => {
                        titleIndexState[1](null)
                        dataStartIndexState[1](null)
                        setFileKey(Date.now());
                        rawDataState[1]([])
                        fileState[1](null)
                        if (!file) return;

                        fileState[1](file);
                        const buffer = await file.arrayBuffer();
                        const workbook = read(buffer, { cellDates: true, dateNF: "dd/MM/yyyy" });
                        const sheet = workbook.Sheets[workbook.SheetNames[0] ?? ""];
                        const json = utils.sheet_to_json(sheet ?? {}, { header: 1, raw: false }) as any[][];
                        // Lọc bỏ các dòng hoàn toàn trống
                        const filtered = json.filter(
                            (row) => row.some((cell) => cell !== null && cell !== undefined && cell !== "")
                        );
                        rawDataState[1](filtered)
                        if (filtered.length == 2) {
                            titleIndexState[1]('1')
                            dataStartIndexState[1]('2')
                        }
                        if (filtered.length >= 3) {
                            titleIndexState[1]('2')
                            dataStartIndexState[1]('3')
                        }
                    }}
                    label="Tập tin dữ liệu"
                />
                <SimpleGrid cols={{ base: 1, md: 2 }}>
                    <CustomSelect
                        label="Vị trí dòng tiêu đề"
                        data={rawDataState[0]
                            .map((_, index) => (index + 1).toString())}
                        value={titleIndexState[0]}
                        onChange={titleIndexState[1]}
                        disabled={!fileState[0]}
                    />
                    <CustomSelect
                        label="Ví trí dòng dữ liệu bắt đầu"
                        data={rawDataState[0]
                            .map((_, i) => (i + 1).toString())
                            .filter((i) => !titleIndexState[0]
                                || parseInt(i) > parseInt(titleIndexState[0])
                            )
                        }
                        value={dataStartIndexState[0]}
                        onChange={dataStartIndexState[1]}
                        disabled={!fileState[0]}
                    />
                </SimpleGrid>
                <CustomFieldset title="Danh sách trường thông tin trong file dữ liệu">
                    <CustomDataTable
                        mantineTableContainerProps={{
                            mah: "300px", // 👈 gợi ý chính thống
                        }}
                        mantinePaperProps={{
                            mah: "500px"
                        }}
                        columns={columns}
                        data={data}
                        mantineTableBodyRowProps={({ row }) => {
                            const isTitleRow = titleIndexState[0]
                                ? row.index === parseInt(titleIndexState[0]) - 1
                                : false;

                            const isDataRow = dataStartIndexState[0]
                                && row.index >= parseInt(dataStartIndexState[0]) - 1;

                            return {
                                style: {
                                    backgroundColor: isTitleRow
                                        ? colorsObject.mantineBackgroundTealLight // xanh cho dòng tiêu đề
                                        : isDataRow
                                            ? colorsObject.mantineBackgroundBlueLight // xanh nhạt cho dữ liệu
                                            : colorsObject.mantineBackgroundPrimary,
                                    fontWeight: isTitleRow ? "bold" : isDataRow ? "500" : "normal",
                                },
                            };
                        }}
                    />
                </CustomFieldset>
                <CustomFlexEnd>
                    <Button
                        color="grape"
                        leftSection={<IconDatabaseExport />}
                        onClick={() => {
                            handleExportStructure()
                        }}
                    >
                        Xuất file cấu trúc
                    </Button>
                    <Button
                        variant="gradient"
                        leftSection={<IconArrowRight />}
                        onClick={handleContinute}
                        disabled={!fileState[0]}
                    >
                        Tiếp tục
                    </Button>
                    <Button
                        onClick={onClose}
                        color="red"
                        leftSection={<IconRun />}>
                        Thoát
                    </Button>
                </CustomFlexEnd>
            </Stack >
        </Modal>
    )
}


