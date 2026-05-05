'use client'
import { AwardLevelService } from "@/shared/APIs/awardLevelService";
import { SRMAwardLevel } from "@/shared/interfaces/SRMAwardLevel";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function SRMAwardLevelCreateOrUpdate({ initValues }: { initValues?: SRMAwardLevel }) {
     const form = useForm<SRMAwardLevel>({
          mode: "uncontrolled",
          validate: {
               code: (value) => !value ? "Mã cấp giải thưởng là bắt buộc" : null,
               name: (value) => !value ? "Tên cấp giải thưởng là bắt buộc" : null,
          }
     });

     async function handleSubmit(formValues: SRMAwardLevel) {
          if (initValues) {
               return await AwardLevelService.update({
                    ...formValues,
               });
          }
          return await AwardLevelService.create({
               ...formValues,
          });
     }


     useEffect(() => {
          if (!initValues) return;
          form.setInitialValues({
               ...initValues,
          })
          form.setValues({
               ...initValues,
          })
     }, [initValues])
     return (
          <CustomButtonCreateUpdate
               scrollAreaAutosizeProps={{
                    h: "auto"
               }}
               modalProps={{
                    size: "70%",
                    title: initValues
                         ? "Cập nhật cấp giải thưởng sinh viên nghiên cứu khoa học" : "Chi tiết cấp giải thưởng sinh viên nghiên cứu khoa học",
               }}
               onSubmit={handleSubmit}
               form={form}
               isUpdate={!!initValues}
          >
               <CustomFlexColumn direction={"column"}>
                    <CustomTextInput
                         label="Mã cấp giải thưởng"
                         withAsterisk
                         readOnly={!!initValues}
                         {...form.getInputProps("code")}
                    />
                    <CustomTextInput
                         label="Tên cấp giải thưởng"
                         withAsterisk
                         readOnly={!!initValues}
                         {...form.getInputProps("name")}
                    />
                    <CustomTextArea
                         label="Ghi chú"
                         {...form.getInputProps("note")}
                    />
                    <Checkbox
                         label="Không sử dụng"
                         size="md"
                         radius="sm"
                         styles={{
                              input: { cursor: "pointer" },
                         }}
                         {...form.getInputProps("isDeactivate", { type: "checkbox" })}
                    />
               </CustomFlexColumn>
          </CustomButtonCreateUpdate>
     );
}