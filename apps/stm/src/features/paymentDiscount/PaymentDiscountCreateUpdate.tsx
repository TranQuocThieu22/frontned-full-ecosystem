"use client";

import { IPaymentDiscount } from "@/features/paymentDiscount/PaymentDiscountTable";
import { branchService } from "@/shared/APIs/branchService";
import { courseService } from "@/shared/APIs/courseService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Checkbox, Fieldset, NumberInput, ScrollArea, Select, SimpleGrid, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";

interface PaymentDiscountCreateUpdateProps {
  isUpdate?: boolean;
  data?: IPaymentDiscount;
}

export default function PaymentDiscountCreateUpdate(props: PaymentDiscountCreateUpdateProps) {
  const { isUpdate, data } = props;
  const queryClient = useQueryClient();

  const courseQuery = useCustomReactQuery({
    queryKey: ["paymentDiscount_course"],
    axiosFn: () => courseService.getAll(),
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const branchQuery = useCustomReactQuery({
    queryKey: ["paymentDiscount_branch"],
    axiosFn: () => branchService.getAll(),
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const form = useForm<IPaymentDiscount & Record<string, any>>({
    initialValues: {
      id: 0,
      code: "",
      name: "",
      price: 0,
      percent: 0,
      mode: 1,
      note: "",
      discountType: 1,
      status: 1,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      concurrencyStamp: "",
      isEnabled: true,
      maxCount: 0,
      isCancel: false,
      isAllCourse: false,
      isAllBranch: false,
      courseDiscounts: [],
      branchDiscounts: [],
      ...(data ?? {}),
      ...(branchQuery.data
        ? branchQuery.data.reduce((acc: Record<string, boolean>, branch) => {
          if (!branch.code) return acc;
          acc[branch.code] = data?.branchDiscounts?.some((bd) => bd.branchId === branch.id) ?? false;
          return acc;
        }, {})
        : {}),
      ...(courseQuery.data
        ? courseQuery.data.reduce((acc: Record<string, boolean>, course) => {
          if (!course.code) return acc;
          acc[course.code] = data?.courseDiscounts?.some((cd) => cd.courseId === course.id) ?? false;
          return acc;
        }, {})
        : {}),
    },
    validate: {
      code: (value) => (value ? null : "Không được để trống"),
      startDate: (value, values) => {
        if (!value) return "Không được để trống";
        if (values.endDate && value > values.endDate) {
          return "Ngày bắt đầu phải trước ngày kết thúc";
        }
        return null;
      },
      endDate: (value) => (value ? null : "Không được để trống"),
      price: (value, values) => {
        if ((value && value > 0) || (values.percent && values.percent > 0)) {
          return null;
        }
        return "Số tiền giảm hoặc phần trăm giảm phải lớn hơn 0";
      },
      percent: (value, values) => {
        if ((value && value > 0) || (values.price && values.price > 0)) {
          return null;
        }
        return "Số tiền giảm hoặc phần trăm giảm phải lớn hơn 0";
      },
    },
  });

  const buildSelectedBranches = () => {
    if (!branchQuery.data) return [];

    if (form.values.isAllBranch) {
      return branchQuery.data.map((branch) => ({
        id: 0,
        code: branch.code || "",
        name: branch.name || "",
        concurrencyStamp: "",
        isEnabled: true,
        discountId: form.values.id,
        branchId: branch.id!,
      }));
    }

    return branchQuery.data
      .filter((branch) => branch.code && form.values[branch.code])
      .map((branch) => ({
        id: 0,
        code: branch.code || "",
        name: branch.name || "",
        concurrencyStamp: "",
        isEnabled: true,
        discountId: form.values.id,
        branchId: branch.id!,
      }));
  };

  const buildSelectedCourses = () => {
    if (!courseQuery.data) return [];

    if (form.values.isAllCourse) {
      return courseQuery.data.map((course) => ({
        id: 0,
        code: course.code || "",
        name: course.name || "",
        concurrencyStamp: "",
        isEnabled: true,
        discountId: form.values.id,
        courseId: course.id!,
      }));
    }

    return courseQuery.data
      .filter((course) => course.code && form.values[course.code])
      .map((course) => ({
        id: 0,
        code: course.code || "",
        name: course.name || "",
        concurrencyStamp: "",
        isEnabled: true,
        discountId: form.values.id,
        courseId: course.id!,
      }));
  };

  const buildPayload = (values: IPaymentDiscount & Record<string, any>): IPaymentDiscount => {
    const selectedBranches = buildSelectedBranches();
    const selectedCourses = buildSelectedCourses();

    const dynamicKeys = [
      ...selectedBranches.map((b) => b.code),
      ...selectedCourses.map((c) => c.code),
    ].filter(Boolean);

    const cleaned: any = { ...values };

    dynamicKeys.forEach((key) => {
      if (key in cleaned) {
        delete cleaned[key];
      }
    });

    cleaned.name = cleaned.code;
    cleaned.courseDiscounts = selectedCourses;
    cleaned.branchDiscounts = selectedBranches;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const start = new Date(cleaned.startDate);
    const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());

    const end = new Date(cleaned.endDate);
    const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

    if (startDate > today) {
      cleaned.status = 1;
    } else if (startDate <= today && today <= endDate) {
      cleaned.status = 2;
    } else if (endDate < today) {
      cleaned.status = 3;
    }

    return cleaned;
  };

  return (
    <CustomButtonCreateUpdate
      form={form}
      isUpdate={isUpdate}
      modalProps={{
        size: "80%"
      }}
      buttonProps={{ children: "Thêm chiết khấu" }}
      onSubmit={async (values, isUpdateFlag) => {
        const payload = buildPayload(values);
        const url = isUpdateFlag ? "/Discount/Update" : "/Discount/Create";

        const response = await baseAxios.post(url, {
          ...payload,
          concurrencyStamp: data?.concurrencyStamp,
        });

        await queryClient.invalidateQueries({ queryKey: ["paymentDiscount_list"] });
        return response;
      }}
    >
      <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
        <TextInput
          disabled={isUpdate}
          label="Mã chiết khấu"
          {...form.getInputProps("code")}
        />
        <Select
          label="Loại chiết khấu"
          data={[
            {
              value: "1",
              label: "Loại HP trước khai giảng",
            },
          ]}
          value={form.values.mode?.toString()}
          onChange={(value) =>
            form.setFieldValue("mode", value ? parseInt(value, 10) : undefined)
          }
        />
        <NumberInput
          label="Số tiền giảm"
          {...form.getInputProps("price")}
        />
        <NumberInput
          label="Số ngày đăng ký trước khai giảng"
          {...form.getInputProps("soNgayDangKyTruocNgayKhaiGiang" as any)}
        />
        <NumberInput
          label="Phần trăm giảm"
          max={100}
          {...form.getInputProps("percent")}
        />
        <TextInput
          label="Mô tả"
          {...form.getInputProps("note")}
        />
        <NumberInput
          label="Số lần sử dụng"
          {...form.getInputProps("maxCount")}
        />
        <Checkbox
          mt={26}
          label="Dừng ưu đãi"
          {...form.getInputProps("isCancel", { type: "checkbox" })}
        />
        <DateInput
          label="Ngày bắt đầu"
          valueFormat="DD/MM/YYYY"
          value={form.values.startDate ? new Date(form.values.startDate) : null}
          onChange={(value) =>
            form.setFieldValue("startDate", value ? value : "")
          }
        />
        <DateInput
          label="Ngày kết thúc"
          valueFormat="DD/MM/YYYY"
          value={form.values.endDate ? new Date(form.values.endDate) : null}
          onChange={(value) =>
            form.setFieldValue("endDate", value ? value : "")
          }
        />
        {branchQuery.data && (
          <Fieldset legend="Chi nhánh">
            <ScrollArea h={150} type="always" scrollbars="y">
              <Checkbox
                mt={5}
                label="Tất cả"
                checked={form.values.isAllBranch}
                onChange={(event) => {
                  const checked = event.currentTarget.checked;
                  form.setFieldValue("isAllBranch", checked);
                  branchQuery.data.forEach((branch) => {
                    if (branch.code) {
                      form.setFieldValue(branch.code, checked);
                    }
                  });
                }}
              />
              {branchQuery.data.map((branch) => (
                <Checkbox
                  key={branch.id}
                  mt={5}
                  label={`${branch.name} - ${branch.code}`}
                  checked={branch.code ? form.values[branch.code] : false}
                  onChange={(event) => {
                    const checked = event.currentTarget.checked;
                    if (branch.code) {
                      form.setFieldValue(branch.code, checked);
                    }
                    if (!checked) {
                      form.setFieldValue("isAllBranch", false);
                    }
                  }}
                />
              ))}
            </ScrollArea>
          </Fieldset>
        )}
        {courseQuery.data && (
          <Fieldset legend="Khóa học">
            <ScrollArea h={150} type="always" scrollbars="y">
              <Checkbox
                mt={5}
                label="Tất cả"
                checked={form.values.isAllCourse}
                onChange={(event) => {
                  const checked = event.currentTarget.checked;
                  form.setFieldValue("isAllCourse", checked);
                  courseQuery.data.forEach((course) => {
                    if (course.code) {
                      form.setFieldValue(course.code, checked);
                    }
                  });
                }}
              />
              {courseQuery.data.map((course) => (
                <Checkbox
                  key={course.id}
                  mt={5}
                  label={`${course.name} - ${course.code}`}
                  checked={course.code ? form.values[course.code] : false}
                  onChange={(event) => {
                    const checked = event.currentTarget.checked;
                    if (course.code) {
                      form.setFieldValue(course.code, checked);
                    }
                    if (!checked) {
                      form.setFieldValue("isAllCourse", false);
                    }
                  }}
                />
              ))}
            </ScrollArea>
          </Fieldset>
        )}
      </SimpleGrid>
    </CustomButtonCreateUpdate>
  );
}

