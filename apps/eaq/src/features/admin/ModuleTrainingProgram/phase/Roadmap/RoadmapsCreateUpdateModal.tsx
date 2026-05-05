"use client";

import { IPhase } from '@/shared/interfaces/Phase/IPhase';
import { IRoadmap } from "@/shared/interfaces/roadmap/Roadmap";
import { service_EAQRoadmap } from "@/shared/APIs/service_EAQRoadmap";
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useIsFetching } from "@tanstack/react-query";
import { useEffect } from "react";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import {
  CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";

export interface RoadMapsUpdateTableProps {
  values: IRoadmap;
  index: number;
  phase: IPhase;
  phaseStartDate: string;
  phaseEndDate: string;
}

export default function RoadmapsCreateUpdateModal(
  props: Partial<RoadMapsUpdateTableProps>
) {
  const disc = useDisclosure(false);
  const isFetchingValue = useIsFetching({ queryKey: ["roadmapTable", props.phase?.id] });

  useEffect(() => {
    if (!props.values) return;
    form.setValues({
      ...props.values,
    });
  }, [props]);

  function getNewOrder(roadmaps?: IRoadmap[]): number {
    if (!roadmaps || roadmaps.length === 0) return 1;

    const highestOrder = roadmaps.reduce(
      (max, roadmap) =>
        roadmap.order && roadmap.order > max ? roadmap.order : max,
      0
    );

    return highestOrder + 1;
  }

  function isDuplicateCode(code: string): boolean {
    let roadmaps = props.phase?.eaqRoadmaps ?? [];
    return roadmaps.some((roadmap, index) => {
      if (props.index !== undefined && index === props.index) return false;
      return roadmap.code === code;
    });
  }

  const form = useForm<IRoadmap>({
    initialValues: {
      id: 0,
      code: "",
      name: "",
      concurrencyStamp: "string",
      isEnabled: true,
      startDate: "",
      endDate: "",
      order: getNewOrder(props.phase?.eaqRoadmaps),
      note: "",
      eaqPhaseId: props.phase?.id ?? -1,
    },
    validate: {
      code: (value) => {
        if (!value) return "Vui lòng nhập mã lộ trình";
        if (isDuplicateCode(value))
          return "Mã đã tồn tại trong danh sách lộ trình";
        return null;
      },
      name: (value) => (value ? null : "Vui lòng nhập tên lộ trình"),
      startDate: (value) => {
        if (!value) return "Vui lòng chọn ngày bắt đầu";
        return null;
      },
      endDate: (value, values) => {
        if (!value) return "Vui lòng chọn ngày kết thúc";

        if (new Date(value) > new Date(props.phaseEndDate!)) {
          return `Ngày kết thúc lộ trình không được phép sau ngày ${dateUtils.toDDMMYYYY(new Date(props.phaseEndDate!))}`;
        }

        const end = new Date(value);
        const start = new Date(values.startDate || "");

        if (start && !isNaN(start.getTime()) && end < start) return "Ngày kết thúc lộ trình phải sau ngày bắt đầu";

        return null;
      },
    },
  });

  function handleSubmit(
    formValues: IRoadmap,
    isUpdate: boolean
  ) {
    const validationResult = form.validate();
    if (validationResult.hasErrors) {
      return false;
    }

    const payload = {
      ...formValues,
      code: formValues.code?.trim(),
    };

    if (isUpdate) {
      return service_EAQRoadmap.update(formValues);
    }

    return service_EAQRoadmap.create(payload);
  }

  return (
    <CustomButtonCreateUpdate
      form={form}
      modalProps={{
        size: "80%",
        title: !props.values ? "Tạo lộ trình mới" : "Chi tiết lộ trình",
      }}
      buttonProps={{
        loading: isFetchingValue > 0,
      }}
      actionIconProps={{
        loading: isFetchingValue > 0,
      }}
      isUpdate={!!props.values}
      onSubmit={() => handleSubmit(form.values, !!props.values)}
      disclosure={disc}
    >
      <Grid>
        <Grid.Col span={6}>
          <CustomNumberInput
            label="Số thứ tự"
            min={0}
            {...form.getInputProps("order")}
            error={form.errors.order}
          />
          <CustomTextInput
            withAsterisk
            pt={10}
            label="Mã Lộ trình"
            {...form.getInputProps("code")}
            error={form.errors.code}
            readOnly={!!props.values}
          />
          <CustomTextInput
            withAsterisk
            pt={10}
            label="Tên Lộ trình"
            {...form.getInputProps("name")}
            error={form.errors.name}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <CustomDateInput
            withAsterisk
            label="Ngày bắt đầu"
            {...form.getInputProps("startDate")}
            error={form.errors.startDate}
          />
          <CustomDateInput
            withAsterisk
            pt={10}
            minDate={new Date(new Date(form.values.startDate || new Date()).getTime())}
            maxDate={new Date(props.phaseEndDate!)}
            label="Ngày kết thúc"
            {...form.getInputProps("endDate")}
            error={form.errors.endDate}
          />
        </Grid.Col>
      </Grid>
      <CustomTextArea
        label="Ghi chú"
        placeholder="Ghi chú"
        value={form.values.note || ""}
        {...form.getInputProps("note")}
      />
    </CustomButtonCreateUpdate>
  );
}
