import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { Modal, ModalProps, Text, Tooltip } from "@mantine/core";
import { DataValidationSummary } from "./CustomDataValidaionResultModal";
import {
    FieldOption,
    FormatResult,
    MappingError,
} from "./CustomMappingDataModal/CustomMappingFormatDataModal";

interface CustomValidateResultDetailProps<T> extends ModalProps {
    dataSummary?: DataValidationSummary<T>;
    fields?: FieldOption<T>[]; // dùng để xác định isRequired
}

export default function CustomValidateResultDetail<T>({
    dataSummary,
    fields,
    ...rest
}: CustomValidateResultDetailProps<T>) {
    const tableData = dataSummary?.data ?? [];
    const isErrorView = tableData.some((r) => r.error?.length);

    // ✅ Lấy danh sách key động
    const dynamicKeys =
        tableData.length > 0
            ? Object.keys((tableData[0]?.rawData as object))
            : [];

    // ✅ Sinh cột động
    const dynamicColumns = dynamicKeys.map((key) => {
        const fieldInfo = fields?.find((f) => String(f.fieldKey) === key);
        const isRequired = !!fieldInfo?.isRequired;
        return {
            header: key,
            Header: (
                <Text size="sm">
                    {fieldInfo?.fieldName}
                    {isRequired && (
                        <Text component="span" c="red">
                            {" "}
                            *
                        </Text>
                    )}
                </Text>
            ),
            accessorKey: key,
            size: 160,
            accessorFn: (row: FormatResult<T>) => {
                // Lấy giá trị gốc hoặc format
                const value = (row.rawData as any)?.[key]

                // Lấy toàn bộ lỗi của field này
                const fieldErrors: MappingError[] =
                    row.error?.filter((e) => e.fieldKey === key) || [];

                // Có lỗi hay không
                const hasError = fieldErrors.length > 0;

                // Có lỗi "bắt buộc nhưng để trống" không
                const blankError = fieldErrors.find(
                    (e) => e.type === "blankInRequired"
                );

                // Tooltip lỗi (nếu có)
                const tooltipLabel =
                    fieldErrors.map((e) => e.description).join("\n") ||
                    (isRequired && (value === null || value === "" || value === undefined)
                        ? `Trường "${key}" là bắt buộc nhưng bị để trống`
                        : "");

                const showAsError = hasError || !!blankError;

                return (
                    <Tooltip
                        disabled={!showAsError && !tooltipLabel}
                        position="bottom"
                        color="red"
                        withArrow
                        multiline
                        label={tooltipLabel}
                    >
                        <Text
                            size="sm"
                            style={{
                                borderBottom: showAsError ? "1px dashed red" : undefined,
                                backgroundColor: showAsError ? "#ffeaea" : undefined,
                                color: showAsError ? "red" : undefined,
                                cursor: showAsError ? "help" : "default",
                                textAlign: "left",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: 150,
                                display: "inline-block",
                            }}
                        >
                            {/* ⚠️ Nếu field bắt buộc mà trống thì hiển thị ký hiệu để người dùng nhận ra */}
                            {value === null || value === undefined || value === ""
                                ? isRequired
                                    ? "(trống)"
                                    : ""
                                : String(value)}
                        </Text>
                    </Tooltip>
                );
            },
        };
    });

    return (
        <Modal
            size={"90em"}
            title={isErrorView ? "Chi tiết dữ liệu lỗi" : "Chi tiết dữ liệu hợp lệ"}
            {...rest}
        >
            <CustomDataTable
                enableFilters={false}
                enableColumnActions={false}
                enableBottomToolbar={true}
                data={tableData}
                columns={[
                    {
                        header: "Dòng Excel",
                        accessorKey: "rowIndex",
                        size: 90,
                    },
                    ...dynamicColumns,
                ]}
            />
        </Modal>
    );
}
