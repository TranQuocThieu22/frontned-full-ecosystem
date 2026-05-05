"use client"

import { tenantService } from "@aq-fe/aq-core-framework/shared/APIs/tenantService";
import { userService } from "@aq-fe/aq-core-framework/shared/APIs/userService";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-core-framework/shared/components/button/CustomButtonCreateUpdate";
import { useCustomReactQuery } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactQuery";
import { User } from "@aq-fe/aq-core-framework/shared/interfaces/User";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import CustomSimpleGrid from "@aq-fe/core-ui/shared/components/layout/CustomSimpleGrid";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function UsersCreateUpdate({ values, isIAM = false, tenantId }: { values?: User, isIAM?: boolean, tenantId?: string }) {
  const isUpdate = !!values?.id;
  const authTenantId = useAuthenticateStore((s) => s.state.tenantId)

  const form = useForm<User>({
    mode: "uncontrolled",
  });

  const tenantQuery = useCustomReactQuery({
    queryKey: ["tenants"],
    serviceFn: () => tenantService.getAll(),
    enabled: isIAM && !isUpdate
  });
  useEffect(() => {
    if (values) {
      form.setValues(values)
      form.setInitialValues(values)
      if (tenantId) {
        form.setFieldValue("tenantId", tenantId)
      }
    } else {
      const initialTenantId = tenantId || (!isIAM ? authTenantId : null)
      if (initialTenantId) {
        form.setFieldValue("tenantId", initialTenantId)
      }
    }
  }, [values, isIAM, authTenantId, tenantId])

  return (
    <CustomButtonCreateUpdate
      isUpdate={isUpdate}
      form={form}
      onSubmit={(formValues) => {
        if (isUpdate) {
          return userService.update({
            id: values.id!,
            data: {
              ...formValues,
              gender: Number(formValues.gender),
              tenantId: formValues.tenantId,
            },
          })
        } else {
          return userService.create({
            data: {
              ...formValues,
              gender: Number(formValues.gender),
            },
          });
        }
      }}
      modalProps={{
        title: "Chi tiết người dùng",
        size: "38em",
      }}
    >
      <CustomSimpleGrid>
        <CustomTextInput
          label="Mã người dùng"
          readOnly={isUpdate}
          key={form.key("code")}
          {...form.getInputProps("code")}
        />
        {!isUpdate && <CustomTextInput
          label="Username"
          readOnly={isUpdate}
          key={form.key("username")}
          {...form.getInputProps("username")}
        />}

        <CustomTextInput
          label="Họ"
          key={form.key("firstName")}
          {...form.getInputProps("firstName")}
        />
        <CustomTextInput
          label="Tên"
          key={form.key("lastName")}
          {...form.getInputProps("lastName")}
        />

        <CustomTextInput
          label="Email"
          readOnly={isUpdate}
          type="email"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <CustomTextInput
          label="Số CCCD/CMND"
          key={form.key("identifier")}
          {...form.getInputProps("identifier")}
        />

        <CustomTextInput
          label="Số điện thoại"
          key={form.key("phoneNumber")}
          {...form.getInputProps("phoneNumber")}
        />
        <CustomSelect
          label="Giới tính"
          data={[
            { value: "0", label: "Nam" },
            { value: "1", label: "Nữ" },
          ]}
          key={form.key("gender")}
          {...form.getInputProps("gender")}
          value={form.getValues().gender?.toString()}
          onChange={(value) => form.setFieldValue("gender", Number(value))}
        />

        {!isUpdate && (
          <CustomTextInput
            label="Mật khẩu"
            type="password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
        )}

        {!isUpdate && isIAM && <CustomSelect
          label="Tenant"
          isLoading={tenantQuery.isLoading}
          data={tenantQuery.data?.map((item) => ({
            value: item.id?.toString()!,
            label: `${item.code} - ${item.name}`,
          }))}
          key={form.key("tenantId")}
          {...form.getInputProps("tenantId")}
        />}
      </CustomSimpleGrid>
    </CustomButtonCreateUpdate>
  );
}
