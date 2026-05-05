import {
    Button,
    Group,
    Modal,
    ModalProps,
    Select,
    Stack,
    Table,
    Title,
} from "@mantine/core";
import {
    IconChevronLeft,
    IconChevronRight,
    IconPlus,
    IconRowRemove,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

export interface FieldDefinition {
    key: string;
    label: string;
    isRequired?: boolean;
}

interface Props extends Omit<ModalProps, "onSubmit"> {
    jsonData: any[];
    fieldDefinitions: FieldDefinition[];
    onContinute: (mappedData: any[]) => void;
    handleBack: () => void;
    onCloseAll: () => void;
    isLoading?: boolean
}

// ------------------ Utils ------------------
const findMatchingColumn = (columns: string[], fieldKey: string) =>
    columns.find((col) => col.toLowerCase() === fieldKey.toLowerCase()) || "";

const getDefaultMapping = (
    fields: FieldDefinition[],
    columns: string[]
): { selected: FieldDefinition[]; mapping: Record<string, string> } => {
    const selected: FieldDefinition[] = [];
    const mapping: Record<string, string> = {};

    fields.forEach((f) => {
        const match = findMatchingColumn(columns, f.key);
        if (f.isRequired || match) {
            selected.push(f);
            if (match) mapping[f.key] = match;
        }
    });

    return { selected, mapping };
};

// ------------------ Component ------------------
export default function FileFieldMappingModal({
    jsonData,
    fieldDefinitions,
    onContinute,
    handleBack,
    onCloseAll,
    isLoading,
    ...rest
}: Props) {
    const [selectedFields, setSelectedFields] = useState<FieldDefinition[]>([]);
    const [columnMapping, setColumnMapping] = useState<Record<string, string>>(
        {}
    );

    // Lấy danh sách cột từ jsonData
    const excelColumns = useMemo(
        () => (jsonData.length > 0 ? Object.keys(jsonData[0]) : []),
        [jsonData]
    );

    // Khởi tạo: auto-add field bắt buộc + field có match
    useEffect(() => {
        const { selected, mapping } = getDefaultMapping(fieldDefinitions, excelColumns);
        setSelectedFields(selected);
        setColumnMapping(mapping);
    }, [fieldDefinitions, excelColumns]);

    const unselectedFields = useMemo(
        () =>
            fieldDefinitions.filter(
                (f) => !selectedFields.some((s) => s.key === f.key) && !f.isRequired
            ),
        [fieldDefinitions, selectedFields]
    );

    const handleAddField = (field: FieldDefinition) => {
        setSelectedFields((prev) => [...prev, field]);
        const match = findMatchingColumn(excelColumns, field.key);
        if (match) setColumnMapping((prev) => ({ ...prev, [field.key]: match }));
    };

    const handleRemoveField = (field: FieldDefinition) => {
        if (field.isRequired) return;
        setSelectedFields((prev) => prev.filter((f) => f.key !== field.key));
        setColumnMapping((prev) => {
            const { [field.key]: _, ...rest } = prev;
            return rest;
        });
    };

    const handleContinute = () => {
        const mapped = jsonData.map((row) => {
            const mappedRow: Record<string, any> = {};
            selectedFields.forEach((field) => {
                const colKey = columnMapping[field.key];
                if (colKey) mappedRow[field.key] = row[colKey];
            });
            return mappedRow;
        });
        onContinute(mapped);
    };

    const handleAddAll = () => {
        setSelectedFields((prev) => [...prev, ...unselectedFields]);
        const newMappings: Record<string, string> = {};
        unselectedFields.forEach((field) => {
            const match = findMatchingColumn(excelColumns, field.key);
            if (match) newMappings[field.key] = match;
        });
        setColumnMapping((prev) => ({ ...prev, ...newMappings }));
    };

    const handleRemoveAll = () => {
        const { selected, mapping } = getDefaultMapping(
            fieldDefinitions.filter((f) => f.isRequired),
            excelColumns
        );
        setSelectedFields(selected);
        setColumnMapping(mapping);
    };

    return (
        <Modal title="Mapping dữ liệu" size="80%" {...rest}>
            <Group align="start" grow>
                {/* Left Table */}
                <Stack w="45%">
                    <Title order={5}>Danh sách trường thông tin</Title>
                    <Table striped>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Mã field</Table.Th>
                                <Table.Th>Tên field</Table.Th>
                                <Table.Th>
                                    <Button size="xs" leftSection={<IconPlus />} onClick={handleAddAll}>
                                        Thêm tất cả
                                    </Button>
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {unselectedFields.map((field) => (
                                <Table.Tr key={field.key}>
                                    <Table.Td>{field.key}</Table.Td>
                                    <Table.Td>{field.label}</Table.Td>
                                    <Table.Td>
                                        <Button
                                            variant="light"
                                            onClick={() => handleAddField(field)}
                                            leftSection={<IconChevronRight size={14} />}
                                        >
                                            Thêm
                                        </Button>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Stack>

                {/* Right Table */}
                <Stack w="55%">
                    <Title order={5}>Trường đã chọn & cột map</Title>
                    <Table striped>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Mã field</Table.Th>
                                <Table.Th>Tên field</Table.Th>
                                <Table.Th>Cột map</Table.Th>
                                <Table.Th>
                                    <Button
                                        size="xs"
                                        leftSection={<IconRowRemove />}
                                        color="red"
                                        onClick={handleRemoveAll}
                                    >
                                        Bỏ tất cả
                                    </Button>
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {selectedFields.map((field) => (
                                <Table.Tr key={field.key}>
                                    <Table.Td>{field.key}</Table.Td>
                                    <Table.Td>
                                        {field.label}
                                        {field.isRequired && (
                                            <span style={{ color: "red", marginLeft: 4 }}>*</span>
                                        )}
                                    </Table.Td>
                                    <Table.Td>
                                        <Select
                                            placeholder="Chọn cột"
                                            data={excelColumns}
                                            value={columnMapping[field.key] || null}
                                            onChange={(val) =>
                                                setColumnMapping((prev) => ({
                                                    ...prev,
                                                    [field.key]: val || "",
                                                }))
                                            }
                                            searchable
                                        />
                                    </Table.Td>
                                    <Table.Td>
                                        {!field.isRequired && (
                                            <Button
                                                variant="light"
                                                onClick={() => handleRemoveField(field)}
                                                leftSection={<IconChevronLeft size={14} />}
                                            >
                                                Bỏ
                                            </Button>
                                        )}
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Stack>
            </Group>

            <Group justify="end" mt="md">
                <Button onClick={handleBack}>Quay lại</Button>
                <Button onClick={handleContinute} loading={isLoading}>Tiếp tục</Button>
                <Button variant="outline" onClick={onCloseAll}>
                    Đóng
                </Button>
            </Group>
        </Modal>
    );
}
