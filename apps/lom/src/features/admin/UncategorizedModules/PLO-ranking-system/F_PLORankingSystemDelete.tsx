"use client";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

export default function F_PLORankingSystemDelete({ values }: { values: any }) {
  return (
    <CustomActionIconDelete
      contextData={values.name}
      onSubmit={() => {
        return baseAxios.post("/COERatingPLO/Delete", {
          id: values.id,
          isEnabled: true,
        });
      }}
    ></CustomActionIconDelete>
  );
}
