import { contractService } from "@/shared/APIs/contractService";
import { EnumLabelProductType, EnumProductType } from "@/shared/consts/enum/EnumProductType";
import { SRMCompletedProduct } from "@/shared/interfaces/SRMCompletedProduct";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useProgressReportStore } from "../useProgressReportStore";

export default function ProgressReportCompletedProductsCreateUpdate({ values }: { values?: SRMCompletedProduct }) {
    const progressReportStore = useProgressReportStore()
    const isUpdate = values != undefined
    const form = useForm<SRMCompletedProduct>({
        mode: "uncontrolled",
        validate: {
            author: (value) => (!value ? "Tên tác giả không được để trống" : null),
            publicationYear: (value) => {
                if (!value) return "Năm công bố không được để trống"
                return null
            },
            workTitle: (value) => (!value ? "Tên công trình không được để trống" : null),
            journalName: (value) => (!value ? "Tên tạp chí/ NXB/ Số tập trang đăng không được để trống" : null),
            issn: (value) => (!value ? "ISSN/ISBN không được để trống" : null),
            productType: (value) => (!value ? "Loại sản phẩm không được để trống" : null),
        }
    })
    useEffect(() => {
        if (!values) return
        const valuesSetter: SRMCompletedProduct = {
            ...values,
            attachmentDetail: {
                fileName: values.attachmentPath
            }
        }
        form.setValues(valuesSetter)
        form.setInitialValues(valuesSetter)
    }, [values])
    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            form={form}
            modalProps={{
                title: "Chi tiết sản phẩm",
                size: "70rem"
            }}
            onSubmit={(formValues) => {
                const id = values ? values.id : 0
                return contractService.insertOrUpdateCompletedProduct({
                    id: id,
                    srmContractReportHistoryId: progressReportStore.state.historyReportId,
                    ...formValues
                })
            }}
        >
            <CustomTextInput label="Tên tác giả" {...form.getInputProps("author")} />
            <CustomNumberInput label="Năm công bố" maxLength={4} max={5000}  {...form.getInputProps("publicationYear")} />

            <CustomTextInput label="Tên công trình" {...form.getInputProps("workTitle")} />
            <CustomTextInput label="Tên tạp chí/ NXB/ Số tập trang đăng" {...form.getInputProps("journalName")} />
            <CustomTextInput label="ISSN/ISBN" {...form.getInputProps("issn")} />
            <CustomSelect label="Loại sản phẩm" value={form.getValues().productType?.toString()} data={converterUtils.mapEnumToSelectData(EnumProductType, EnumLabelProductType)} {...form.getInputProps("productType")} />
            <CustomFileInput
                label="Minh chứng"
                {...form.getInputProps("attachmentDetail")}
                value={new File([], form.getValues().attachmentDetail?.fileName || "")}
                onChange={async (e) => form.setFieldValue("attachmentDetail", await fileUtils.fileToAQDocumentType(e!))}
            />
        </CustomButtonCreateUpdate>
    )
}
