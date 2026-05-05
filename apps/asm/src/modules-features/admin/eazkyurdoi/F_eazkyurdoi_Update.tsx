"use client";
import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import F_eazkyurdoi_Form from "./F_eazkyurdoi_Form";
import { DinhMuc } from "./F_eazkyurdoi_Read";
import { MyActionIconModal } from "@/components/ActionIcons/ActionIconModal/MyActionIconModal";
import { useDisclosure } from "@mantine/hooks";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";

interface I {
  id?: number;
  code?: string;
  name?: string;
  aqModuleId?: number;
}

export default function F_7ud2a06y19_Update({ values }: { values: DinhMuc }) {
  const form = useForm<DinhMuc>({
    initialValues: values,
  });

  const disclosure = useDisclosure();
  // const form1 = useForm<any>({
  //   initialValues: values,
  // });
  return (
    <MyActionIconUpdate
      form={form}
      size={"lg"}
      variant="subtle"
      modalSize={"60%"}
      title="Chi tiết loại định mức"
      onSubmit={async () => {}}
    >
      <F_eazkyurdoi_Form values={values}></F_eazkyurdoi_Form>
    </MyActionIconUpdate>
  );
}
