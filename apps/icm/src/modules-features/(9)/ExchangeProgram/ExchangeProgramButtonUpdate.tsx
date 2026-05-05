import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { useForm } from "@mantine/form";
import {
  MyActionIconUpdate,
  MyDateInput,
  MyFlexRow,
  MyNumberInput,
  MySelect,
  MyTextInput
} from "aq-fe-framework/components";
import { useMemo } from "react";
import { sampleData } from "./ExchangeProgramTable"; // **Điều chỉnh đường dẫn này cho phù hợp với cấu trúc dự án của bạn**
import { IExchangeProgram } from "./interface/ExchangeProgramViewModel";

export default function ExchangeProgramButtonUpdate({
  values,
}: {
  values: IExchangeProgram;
}) {
  const form = useForm<IExchangeProgram>({
    initialValues: values,
    validate: {
      exchangeCode: (value) => (value ? null : "Vui lòng nhập mã chương trình"),
      exchangeName: (value) => (value ? null : "Vui lòng nhập tên chương trình"),
      mainPartner: (value) => (value ? null : "Vui lòng chọn đối tác"),
      targetType: (value) => (value ? null : "Vui lòng chọn loại đối tượng"),
      direction: (value) => (value ? null : "Vui lòng chọn chiều"),
      submissionDeadline: (value) => (value ? null : "Vui lòng nhập hạn nộp hồ sơ"),
      publishDate: (value) => (value ? null : "Vui lòng nhập ngày công bố"),
      status: (value) => (value ? null : "Vui lòng chọn trạng thái chương trình"),
      maxSlots: (value) => (value && value >= 0 ? null : "Vui lòng nhập số suất tối đa hợp lệ"),
      supportCostVND: (value) => (value && value >= 0 ? null : "Vui lòng nhập kinh phí hỗ trợ hợp lệ"),
      approvalType: (value) => (value ? null : "Vui lòng chọn quy trình xét duyệt"),
    },
  });


  const partnerOptions = useMemo(() => {
    const uniquePartners = Array.from(new Set(sampleData.map(item => item.mainPartner)));
    return uniquePartners.map(partner => ({ value: partner as string, label: partner as string }));

  }, [sampleData]);

  const directionOptions = useMemo(() => {
    const uniqueDirections = Array.from(new Set(sampleData.map(item => item.direction)));
    return uniqueDirections.map(direction => ({ value: direction as string, label: direction as string }));
  }, [sampleData]);

  const statusOptions = useMemo(() => {
    const uniqueStatuses = Array.from(new Set(sampleData.map(item => item.status)));
    return uniqueStatuses.map(status => ({ value: status as string, label: status as string }));
  }, [sampleData]);

  const approvalTypeOptions = useMemo(() => {
    const uniqueApprovalTypes = Array.from(new Set(sampleData.map(item => item.approvalType)));
    return uniqueApprovalTypes.map(type => ({ value: type as string, label: type as string }));
  }, [sampleData]);

  const targetTypeOptions = useMemo(() => {
    const uniqueTargetTypes = Array.from(new Set(sampleData.map(item => item.targetType)));
    return uniqueTargetTypes.map(type => ({ value: type as string, label: type as string }));
  }, [sampleData]);

  return (
    <MyActionIconUpdate
      modalSize={"40%"}
      form={form}
      title="Chi tiết chương trình trao đổi"
      onSubmit={() => { console.log("Form values:", form.values); }}
    >
      <MyFlexColumn>
        <MyFlexRow>
          <MyTextInput
            label="Mã chương trình"
            placeholder="Nhập mã chương trình"
            style={{ flex: 1 }}
            {...form.getInputProps("exchangeCode")}
          />
          <MyDateInput
            label="Hạn nộp hồ sơ"
            placeholder="Chọn ngày"
            style={{ flex: 1 }}
            {...form.getInputProps("submissionDeadline")}
          />
        </MyFlexRow>

        <MyFlexRow>
          <MyTextInput
            label="Tên chương trình"
            placeholder="Nhập tên chương trình"
            style={{ flex: 1 }}
            {...form.getInputProps("exchangeName")}
          />
          <MyDateInput
            label="Ngày công bố"
            placeholder="Chọn ngày"
            style={{ flex: 1 }}
            {...form.getInputProps("publishDate")}
          />
        </MyFlexRow>

        <MyFlexRow>
          <MySelect
            label="Đối tác"
            data={partnerOptions}
            style={{ flex: 1 }}
            {...form.getInputProps("mainPartner")}
          />
          <MySelect
            label="Trạng thái chương trình"
            data={statusOptions}
            style={{ flex: 1 }}
            {...form.getInputProps("status")}
          />
        </MyFlexRow>

        <MyFlexRow>
          <MySelect
            label="Chiều"
            data={directionOptions}
            style={{ flex: 1 }}
            {...form.getInputProps("direction")}
          />
          <MySelect
            label="Quy trình xét duyệt"
            data={approvalTypeOptions}
            style={{ flex: 1 }}
            {...form.getInputProps("approvalType")}
          />
        </MyFlexRow>

        <MyFlexRow>
          <MyNumberInput
            label="Số suất tối đa"
            placeholder="Nhập số suất tối đa"
            style={{ flex: 1 }}
            {...form.getInputProps("maxSlots")}
          />
          <MyNumberInput
            label="Kinh phí hỗ trợ"
            placeholder="Nhập kinh phí hỗ trợ"
            style={{ flex: 1 }}
            {...form.getInputProps("supportCostVND")}
          />
        </MyFlexRow>

      </MyFlexColumn>
    </MyActionIconUpdate>
  );
}



