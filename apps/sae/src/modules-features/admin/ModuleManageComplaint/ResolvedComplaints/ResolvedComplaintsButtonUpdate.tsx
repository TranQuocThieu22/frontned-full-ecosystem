import { service_eventComplaint } from "@/api/services/service_eventComplaint";
import { ENUM_EVENT_COMPLAINT_STATUS } from "@/constants/enum/global";
import { EventComplaint } from "@/interfaces/eventComplaint";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { Divider, Grid, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import EventProofModal from "./EventProofModal";

export default function ResolvedComplaintsButtonUpdate({ data }: { data: EventComplaint }) {
  const form = useForm<EventComplaint>({
    initialValues: data,
    validate: {
      newPoint: (value) => {
        if (!value) {
          return "Không được phép để trống"
        }
        if (value <= 0) {  // Changed from value >= 0 to value <= 0
          return "Điểm phải lớn hơn 0"
        }
        if (value > 100) {
          return "Điểm không được vượt quá 100"  // Fixed typo: vụt -> vượt
        }
        return null
      },
    }
  });

  return (
    <CustomButtonCreateUpdate
      isUpdate
      form={form}
      onSubmit={() => {
        return service_eventComplaint.complaintProcess({
          id: form.values.id,
          note: form.values.note,
          status: form.values.status,
          newPoint: form.values.newPoint,
          studentId: form.values.studentId
        });
      }}

      modalProps={{
        size: "70%",
        title: "Xử lý khiếu nại"
      }}
    >
      <Divider my="xs" />
      <Grid gutter={{ base: 5, xs: 'sm', md: 'sm', xl: 'sm' }} >
        <Grid.Col span={3}>
          <Text fw={600}>Sinh viên </Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text>{form.values ? `${form.values?.studentCode} - ${form.values?.studentName}` : "Không xác định"}</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text fw={600}>Khoa</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text>{form.values ? `${form.values.facultyName}` : "Không xác định"}</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text fw={600}>Điều</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text fw={600}>{form.values.standardCode} </Text>
          <Text>{form.values.standardName}</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text fw={600}>Hoạt động</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text fw={600}>{form.values?.eventCode}</Text>
          <CustomHtmlWrapper html={form.values?.eventName || ""} />
        </Grid.Col>

        <Grid.Col span={3}>
          <Text fw={600}>Điểm</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text>{form.values?.point}</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text fw={600}>Điểm cần khiếu nại</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text>{form.values?.complaintPoint}</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text fw={600}>Nội dung khiếu nại</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text>{form.values?.description}</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text fw={600}>File minh chứng</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text>
            {
              (form.values?.path !== null && form.values?.path !== "") && <EventProofModal filePath={form.values.path || ""} />
            }
          </Text>
        </Grid.Col>
      </Grid>
      <Divider my="xs" />

      <Grid>
        <Grid.Col span={{ base: 12, md: 2 }} style={{ display: "flex", alignItems: "center" }}>
          <Text fw={600}>Điểm mới</Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <CustomNumberInput
            min={0}
            allowNegative={false}
            max={100}
            style={{ flex: "1" }}
            value={form.values.newPoint}
            onChange={value => form.setFieldValue("newPoint", Number(value) || 0)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 2 }} style={{ display: "flex", alignItems: "center" }}>
          <Text fw={600}>Trạng thái</Text>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <CustomSelect
            style={{ flex: "1" }}
            data={Object.entries(ENUM_EVENT_COMPLAINT_STATUS)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => ({ label: key, value: value.toString() }))}
            value={form.values?.status?.toString() || null}
            onChange={(value: any) => form.setFieldValue("status", parseInt(value))}
            clearable={false}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 2 }}>
          <Text fw={600}>Ghi chú</Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 10 }}>
          <CustomTextArea
            style={{ flex: "1" }}
            maxLength={1500}
            {...form.getInputProps("note")}
            value={form.values?.note || ""}
          />
        </Grid.Col>

      </Grid>
    </CustomButtonCreateUpdate>
  );
}