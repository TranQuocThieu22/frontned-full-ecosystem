import { CustomDataTable } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { colorsObject } from "@aq-fe/aq-legacy-framework/shared/const/object/colorsObject";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import {
    Button,
    FileInput,
    Grid,
    Group,
    Modal,
    ModalProps,
    Select,
    Stack,
    Text
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCircleFilled } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { read, utils } from "xlsx";
function toVietnamTime(utcString: string): string {
    // Parse chuỗi ISO UTC thành Date
    const utcDate = new Date(utcString);

    // Lấy giờ Việt Nam bằng cách cộng 7 tiếng
    const vnDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

    // Trả về chuỗi dạng YYYY-MM-DD HH:mm:ss
    const year = vnDate.getFullYear();
    const month = String(vnDate.getMonth() + 1).padStart(2, "0");
    const day = String(vnDate.getDate()).padStart(2, "0");
    // const hours = String(vnDate.getHours()).padStart(2, "0");
    // const minutes = String(vnDate.getMinutes()).padStart(2, "0");
    // const seconds = String(vnDate.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
interface Props extends Omit<ModalProps, "onChange"> {
    value: any[];
    onChange: (value: any[]) => void;
    onContinute?: () => void
    onExportStructure?: () => void
}
function isValidDateFormat(dateStr: string): boolean {
    const ddmmyyyy = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // DD/MM/YYYY
    return ddmmyyyy.test(dateStr);
}
function isValidDate(dateStr: string): boolean {
    // Kiểm tra định dạng YYYY-MM-DD bằng regex
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;

    // Parse thành Date để kiểm tra ngày hợp lệ
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year!, month! - 1, day);

    // Kiểm tra lại xem Date object có đúng như input không
    return (
        date.getFullYear() === year &&
        date.getMonth() === month! - 1 &&
        date.getDate() === day
    );
}

function toIsoDate(dateStr: string): string | null {
    const mmddyy = /^\d{1,2}\/\d{1,2}\/\d{2}$/;
    const ddmmyyyy = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

    if (mmddyy.test(dateStr)) {
        // MM/DD/YY
        const [m, d, yy] = dateStr.split("/").map(Number);
        const year = yy! + 2000; // giả sử chỉ cho năm 20xx
        return `${year.toString().padStart(4, "0")}-${m!.toString().padStart(2, "0")}-${d!.toString().padStart(2, "0")}`;
    } else if (ddmmyyyy.test(dateStr)) {
        // DD/MM/YYYY
        const [d, m, yyyy] = dateStr.split("/").map(Number);
        return `${yyyy!.toString().padStart(4, "0")}-${m!.toString().padStart(2, "0")}-${d!.toString().padStart(2, "0")}`;
    }

    return null; // không đúng định dạng
}
function formatForDisplay(value: any): any {
    if (isValidDate(value)) {
        return dateUtils.toDDMMYYYY(value)
    }
    return value;
}
export default function FileImportConfigModal({
    onChange,
    onContinute,
    onExportStructure,
    ...rest
}: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [rawData, setRawData] = useState<any[][]>([]);
    const [parsedValueOnly, setParsedValueOnly] = useState<any[]>([]);
    const [titleIndex, setTitleIndex] = useState<string | null>("2");
    const [dataStartIndex, setDataStartIndex] = useState<string | null>("3");
    const fileInputError = useState('')

    const parseExcel = async (file: File) => {
        const data = await file.arrayBuffer();
        const workbook = read(data, { cellDates: true });
        const sheet = workbook.Sheets[workbook.SheetNames[0]!];
        const json = utils.sheet_to_json(sheet!, { header: 1 }) as any[][];

        // Chuyển đổi dữ liệu từng ô
        const parsed = json.map((row) =>
            row.map((cell) => {
                if (cell instanceof Date) {
                    return toVietnamTime(cell.toString())
                }
                if (isValidDateFormat(cell)) {
                    return toIsoDate(cell)
                }
                return cell;
            })
        );
        // Lọc bỏ các dòng hoàn toàn trống
        const filtered = parsed.filter(
            (row) => row.some((cell) => cell !== null && cell !== undefined && cell !== "")
        );
        setRawData(filtered);
    };

    const handleSelectFile = (file: File | null) => {
        if (!file) return;
        fileInputError[1]("")
        setFile(file);
        setRawData([]);
        setParsedValueOnly([]);
        setTitleIndex("2");
        setDataStartIndex("3");
        if (file) parseExcel(file);
    };

    useEffect(() => {
        const headerRowIndex = titleIndex ? parseInt(titleIndex) - 1 : null;
        const dataRowIndex = dataStartIndex ? parseInt(dataStartIndex) - 1 : null;

        if (
            !rawData ||
            headerRowIndex === null ||
            dataRowIndex === null ||
            dataRowIndex >= rawData.length ||
            headerRowIndex >= rawData.length
        ) {
            setParsedValueOnly([]);
            onChange([]);
            return;
        }

        const headers = rawData[headerRowIndex];
        const result = rawData.slice(dataRowIndex).map((row) => {
            const rowObj: any = {};
            headers!.forEach((key: string, idx: number) => {
                rowObj[key || `col_${idx}`] = row[idx];
            });
            return rowObj;
        });

        setParsedValueOnly(result);
        onChange(result);
    }, [rawData, titleIndex, dataStartIndex]);

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
        if (!rawData || rawData.length === 0) return [];

        const maxColLength = Math.max(...rawData.map((row) => row.length));

        return Array.from({ length: maxColLength }, (_, idx) => ({
            accessorKey: `col_${idx}`,
            header: `Cột ${idx + 1}`,
        }));
    }, [rawData]);

    const tableDisplayData = useMemo(() => {
        return rawData.map((row) => {
            const obj: any = {};
            row.forEach((cell, idx) => {
                obj[`col_${idx}`] = formatForDisplay(cell); // 🔥 dùng format hiển thị
            });
            return obj;
        });
    }, [rawData]);

    useEffect(() => {
        if (titleIndex && dataStartIndex && parseInt(dataStartIndex) <= parseInt(titleIndex)) {
            setDataStartIndex((parseInt(titleIndex) + 1).toString());
        }
    }, [titleIndex]);
    return (
        <Modal
            title="Import"
            size={"80%"}
            {...rest}
        >
            <Stack>
                <Grid>
                    <Grid.Col span={12}>
                        <FileInput
                            error={fileInputError[0]}
                            clearable={false}
                            label="Chọn tập tin"
                            placeholder="Chọn file dữ liệu"
                            value={file}
                            onChange={handleSelectFile}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Select
                            searchable={false}
                            value={titleIndex}
                            onChange={setTitleIndex}
                            label={<Group>
                                <IconCircleFilled size={20} color={colorsObject.mantineBackgroundTealLight} />
                                <Text>Dòng tiêu đề bắt đầu từ</Text>

                            </Group>}
                            data={rawData.map((_, i) => (i + 1).toString())}
                            disabled={!file}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Select
                            searchable={false}
                            value={dataStartIndex}
                            onChange={setDataStartIndex}
                            label={<Group>
                                <IconCircleFilled size={20} color={colorsObject.mantineBackgroundBlueLight} />
                                <Text>Dòng dữ liệu bắt đầu từ</Text>
                            </Group>}
                            data={rawData
                                .map((_, i) => (i + 1).toString())
                                .filter((i) => !titleIndex || parseInt(i) > parseInt(titleIndex))} // chỉ cho phép lớn hơn titleIndex
                            disabled={!file || !titleIndex}
                        />
                    </Grid.Col>
                </Grid>

                <CustomFieldset title="Danh sách trường thông tin trong file dữ liệu">
                    <CustomDataTable
                        mantineTableBodyRowProps={({ row }) => {
                            const isTitleRow = titleIndex
                                ? row.index === parseInt(titleIndex) - 1
                                : false;

                            const isDataRow =
                                dataStartIndex && row.index >= parseInt(dataStartIndex) - 1;

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
                        columns={columns}
                        data={tableDisplayData}
                    />
                </CustomFieldset>

                <Group justify="end">
                    <Button
                        onClick={onExportStructure}
                    >
                        Xuất file cấu trúc
                    </Button>
                    <Button onClick={() => {
                        if (file == null) {
                            fileInputError[1]("Vui lòng chọn file")
                            return
                        }
                        if (dataStartIndex == "" || dataStartIndex == null) {

                            notifications.show({
                                message: "Dòng dữ liệu bắt đầu không được để trống",
                                color: "red"
                            })
                            return
                        }
                        fileInputError[1]("")
                        onContinute?.()
                    }}>Tiếp tục</Button>
                    <Button variant="outline" onClick={rest.onClose}>
                        Đóng
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}
