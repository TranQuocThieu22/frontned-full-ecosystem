"use client";

import { service_classActivityPlan } from "@/api/services/service_classActivityPlan";
import { ClassActivityPlan } from "@/interfaces/classActivityPlan";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import ConfigRegistrationDeleteList from "./ConfigRegistrationCRUD/ConfigRegistrationDeleteList";
import ConfigRegistrationImport from "./ConfigRegistrationCRUD/ConfigRegistrationImport";
import ConfigRegistrationUpdate from "./ConfigRegistrationCRUD/ConfigRegistrationUpdate";

export default function ConfigRegistrationTable() {
  const activityPlanStore = useS_Shared_ActivityPlan();

  const [editedData, setEditedData] = useState<Record<number, Partial<ClassActivityPlan>>>({});

  const [validationErrors, setValidationErrors] = useState<Record<number, Record<string, string>>>(
    {}
  );

  // NOTE: Loại bỏ validation ban đầu, chỉ validate trước khi save

  const validateAllData = () => {
    const originalData = ClassActivityPlanQuery.data || [];
    const errors: Record<number, Record<string, string>> = {};

    // NOTE: Chỉ validate những item đang được edit
    const editedItemIds = Object.keys(editedData).map(Number);

    editedItemIds.forEach((itemId) => {
      const item = originalData.find((x) => x.id === itemId);
      if (!item) return;

      const currentEditedData = editedData[itemId] || {};
      const startDate = currentEditedData.startRegistration !== undefined
        ? currentEditedData.startRegistration
        : item.startRegistration;
      const endDate = currentEditedData.endRegistration !== undefined
        ? currentEditedData.endRegistration
        : item.endRegistration;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!errors[itemId]) {
        errors[itemId] = {};
      }

      if (startDate) {
        const compareStartDate = new Date(startDate);
        compareStartDate.setHours(0, 0, 0, 0);
        if (compareStartDate < today) {
          errors[itemId].startRegistration = "Ngày bắt đầu đăng ký phải lớn hơn ngày hiện tại";
        } else {
          errors[itemId].startRegistration = "";
        }
      } else {
        errors[itemId].startRegistration = "";
      }

      if (endDate) {
        const compareEndDate = new Date(endDate);
        compareEndDate.setHours(0, 0, 0, 0);
        if (compareEndDate <= today) {
          errors[itemId].endRegistration = "Ngày kết thúc đăng ký phải lớn hơn ngày hiện tại";
        } else if (startDate) {
          const compareStartDate = new Date(startDate);
          compareStartDate.setHours(0, 0, 0, 0);
          if (compareEndDate <= compareStartDate) {
            errors[itemId].endRegistration =
              "Ngày kết thúc đăng ký phải lớn hơn ngày bắt đầu đăng ký";
          } else {
            errors[itemId].endRegistration = "";
          }
        } else {
          errors[itemId].endRegistration = "";
        }
      } else {
        errors[itemId].endRegistration = "";
      }
    });

    setValidationErrors(errors);

    return !Object.values(errors).some((itemErrors) =>
      Object.values(itemErrors).some((error) => error !== "")
    );
  };

  const updateEditedData = (id: number, field: keyof ClassActivityPlan, value: any) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));

    // NOTE: Clear validation errors khi user thay đổi, sẽ validate lại khi save
    setValidationErrors((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: "",
      },
    }));
  };

  const handleSaveAll = async () => {
    // NOTE: Validate tất cả data trước khi save
    const isValid = validateAllData();

    if (!isValid) {
      return;
    }

    const originalData = ClassActivityPlanQuery.data || [];
    const updatePromises = originalData
      .filter((item) => editedData[item.id!])
      .map((item) => {
        const changes = editedData[item.id!];
        return service_classActivityPlan.update({
          ...item,
          ...changes,
        });
      });

    if (updatePromises.length > 0) {
      await Promise.all(updatePromises);
      setEditedData({});
      setValidationErrors({});
      ClassActivityPlanQuery.refetch();
    }
  };

  const handleUndo = () => {
    setEditedData({});
    setValidationErrors({});
  };

  const ClassActivityPlanQuery = useCustomReactQuery({
    queryKey: ["ClassActivityPlanQuery", activityPlanStore.state.ActivityPlan?.id],
    axiosFn: () =>
      service_classActivityPlan.getByActivityPlan({
        activityPlanId: activityPlanStore.state.ActivityPlan?.id ?? 0,
        cols: "Class,Majors",
      }),
  });

  // Map data cho export
  const mappedDataForExport = useMemo(() => {
    return (ClassActivityPlanQuery.data || []).map((item) => ({
      classCode: item.class?.code,
      className: item.class?.name,
      majorsCode: item.class?.majors?.code,
      academicYear: activityPlanStore.state.ActivityPlan?.name,
      startRegistration: item.startRegistration
        ? dateUtils.toDDMMYYYY(new Date(item.startRegistration))
        : "Chưa gán",
      endRegistration: item.endRegistration
        ? dateUtils.toDDMMYYYY(new Date(item.endRegistration))
        : "Chưa gán",
    }));
  }, [ClassActivityPlanQuery.data, activityPlanStore.state.ActivityPlan?.name]);

  const exportConfig = {
    fields: [
      { fieldName: "classCode", header: "Mã lớp" },
      { fieldName: "className", header: "Tên lớp" },
      { fieldName: "majorsCode", header: "Mã ngành" },
      { fieldName: "academicYear", header: "Năm học học kỳ" },
      { fieldName: "startRegistration", header: "Ngày bắt đầu đăng ký" },
      { fieldName: "endRegistration", header: "Ngày kết thúc đăng ký" },
    ],
  };

  const columns = useMemo<MRT_ColumnDef<ClassActivityPlan>[]>(
    () => [
      {
        header: "Mã lớp",
        accessorFn: (row) => row.class?.code,
        id: "classCode",
      },
      {
        header: "Tên lớp",
        accessorFn: (row) => row.class?.name,
        id: "className",
      },
      {
        header: "Mã ngành",
        accessorFn: (row) => row.class?.majors?.code,
        id: "majorsCode",
      },
      // NOTE: Chưa có
      // {
      //   header: "Mã khối",
      //   accessorFn: (row) => row.class?. ,
      //   id: "",
      // },
      {
        header: "Năm học học kỳ",
        accessorFn: () => activityPlanStore.state.ActivityPlan?.name,
        id: "academicYear",
      },
      {
        header: "Ngày bắt đầu đăng ký",
        accessorKey: "startRegistration",
        id: "startRegistration",
        columnDefType: "display",
        enableColumnPinning: true,
        Cell: ({ row }) => {
          const item = row.original;
          const editedValue = editedData[item.id!]?.startRegistration;
          const currentValue = editedValue !== undefined ? editedValue : item.startRegistration;
          const error = validationErrors[item.id!]?.startRegistration || "";

          return (
            <CustomDateInput
              value={currentValue ? new Date(currentValue) : null}
              onChange={(value) => {
                updateEditedData(item.id!, "startRegistration", value);
              }}
              size="xs"
              clearable
              placeholder="Chưa gán"
              error={error}
              styles={error ? { input: { borderColor: "red" } } : undefined}
            />
          );
        },
      },
      {
        header: "Ngày kết thúc đăng ký",
        accessorKey: "endRegistration",
        id: "endRegistration",
        columnDefType: "display",
        enableColumnPinning: true,
        Cell: ({ row }) => {
          const item = row.original;
          const editedValue = editedData[item.id!]?.endRegistration;
          const currentValue = editedValue !== undefined ? editedValue : item.endRegistration;
          const error = validationErrors[item.id!]?.endRegistration || "";

          return (
            <CustomDateInput
              value={currentValue ? new Date(currentValue) : null}
              onChange={(value) => {
                updateEditedData(item.id!, "endRegistration", value);
              }}
              size="xs"
              clearable
              placeholder="Chưa gán"
              error={error}
              styles={error ? { input: { borderColor: "red" } } : undefined}
            />
          );
        },
      },
    ],
    [activityPlanStore.state.ActivityPlan?.name, editedData, validationErrors]
  );

  return (
    <CustomFieldset title="Danh sách lớp học kỳ">
      <CustomDataTable
        columns={columns}
        enableRowSelection={true}
        enableColumnPinning={true}
        enablePagination={true}
        initialState={{
          columnPinning: {
            right: ["startRegistration", "endRegistration"],
          },
          columnVisibility: { modifiedFullName: false, modifiedWhen: false },
        }}
        renderTopToolbarCustomActions={({ table }) => {
          const hasChanges = Object.keys(editedData).length > 0;
          return (
            <>
              <CustomButton actionType="save" onClick={handleSaveAll} disabled={!hasChanges}>
                Lưu {hasChanges ? `(${Object.keys(editedData).length})` : ""}
              </CustomButton>
              <CustomButton actionType="cancel" onClick={handleUndo} hidden={!hasChanges}>
                Hoàn tác
              </CustomButton>
              <ConfigRegistrationImport
                data={table.getSelectedRowModel().rows.map((row) => row.original)}
              />
              <AQButtonExportData
                objectName="Danh_sach_lop_hoc_ky"
                data={mappedDataForExport}
                exportConfig={exportConfig}
              />
              <ConfigRegistrationDeleteList
                data={table.getSelectedRowModel().rows.map((row) => row.original)}
              />
              <ConfigRegistrationUpdate
                data={table.getSelectedRowModel().rows.map((row) => row.original)}
                disabled={table.getSelectedRowModel().rows.length === 0}
              />
            </>
          );
        }}
        data={ClassActivityPlanQuery.data ?? []}
      />
    </CustomFieldset>
  );
}
