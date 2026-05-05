"use client"
import baseAxios from '@/api/baseAxios'
import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyDataTableSelect from '@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect'
import { U0MyValidateEmpty } from '@/utils/validateForm'
import { FileInput, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useListState } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { MRT_ColumnDef } from 'mantine-react-table'
import { useEffect, useMemo, useState } from 'react'

export interface User {

  id?: number;
  hoVaTen?: string | undefined;
  hocHam?: string | undefined;
  hocVi?: string | undefined;



}
const data: User[] = [
  {
    "id": 1,
    "hoVaTen": "123123123",
    "hocHam": "123123123",
    "hocVi": "123123123",
  },

]

export default function F34Create() {
  const [fileData, setFileData] = useState<any[]>([]);
  const userListState = useListState<User>([]);
  const user = useQuery<User[]>({
    queryKey: [`userNCKHs?isExternal=false`],
    queryFn: async () => data,
  })
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        header: "Họ và tên",
        accessorKey: "hoVaTen"
      },
      {
        header: "Học hàm",
        accessorKey: "hocHam"

      },
      {
        header: "Học vị",
        accessorKey: "hocVi",
      },
    ],
    []
  );

  const form = useForm<User>({
    initialValues: {
      "hoVaTen": "",
      "hocHam": "",
      "hocVi": "",

    },
    validate: {
      hoVaTen: U0MyValidateEmpty(),
      hocHam: U0MyValidateEmpty(),
      hocVi: U0MyValidateEmpty(),
    }
  })

  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  })

  useEffect(() => {
    form_multiple.setValues({ importedData: fileData })
  }, [fileData])

  return (
    <Group>
      <AQButtonCreateByImportFile
        setImportedData={setFileData}
        objectName="năng lực hồ sơ ban chủ nhiệm"
        form={form_multiple}
        onSubmit={() => {
          //todo
          console.log("form_multiple", form_multiple.values)
          console.log("thêm danh sách thành công")
          // eslint-disable-next-line react/no-children-prop
        }} children={undefined}>
      </AQButtonCreateByImportFile>
      <MyButtonCreate modalSize={"90%"}
        objectName='năng lực hồ sơ ban chủ nhiệm'
        form={form}
        onSubmit={() => baseAxios.post("userNCKHs", form.values)}>
        <MyTextInput label="Mã đề tài" {...form.getInputProps("code")} />
        <MyTextInput label="Tên đề tài" {...form.getInputProps("email")} />
        <FileInput label="File Minh Chứng" {...form.getInputProps("name")} />
        <MyDataTableSelect selectButtonlabel="Chọn danh sách tham gia" listState={userListState as any} columns={columns} />
      </MyButtonCreate>
    </Group>
  )
}


