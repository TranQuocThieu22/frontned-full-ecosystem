import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyFileInput, MyNumberInput, MyTextArea } from "aq-fe-framework/components";
import { MySelect, MyTextInput } from "aq-fe-framework/core";
import { IGiftCatalog } from "./interfaces";

export default function GiftCatalogCreateUpdate({
  values,
}: {
  values?: IGiftCatalog;
}) {

  const form = useForm<IGiftCatalog>({
    initialValues: {
      ...values,
    },
    validate: {

    },
  });


  return (
    <CustomButtonCreateUpdate
      modalProps={{
        size: "lg",
        title: "Chi tiết quà tặng",
      }}
      form={form}
      onSubmit={() => { }}
      isUpdate={!!values}
    >
      <Grid>
        <Grid.Col span={6}>
          <MyTextInput
            label="Mã quà"
            {...form.getInputProps("code")}
            readOnly={!!values}
          />
          <MyTextInput
            pt={20}
            label="Tên quà"
            {...form.getInputProps("giftName")}
          />
          <MySelect
            pt={20}
            label="Loại"
            data={["Quà vật lý", "Phiếu quà tặng", "Khác"]}
            defaultValue="Quà vật lý"
            {...form.getInputProps("")}
          />
          <MyTextArea
            pt={20}
            label="Đơn vị tính"
            {...form.getInputProps("unit")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MyNumberInput
            label="Số lượng ticker quy đổi"
            min={0}
            {...form.getInputProps("ticketConversionAmount")}
          />
          <MyNumberInput
            pt={20}
            label="Giá trị ước tính (VND)"
            min={0}
            {...form.getInputProps("estimatedValue")}
          />
          <MyFileInput
            pt={20}
            label="Ảnh minh họa"
            {...form.getInputProps("imageUrl")}
          />
        </Grid.Col>
      </Grid>

    </CustomButtonCreateUpdate>
  );
}
