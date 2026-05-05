// "use client"
// import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
// import MyButtonCreate from '@/components/ui/Buttons/ButtonCRUD/MyButtonCreate';
// import MySelect from '@/components/ui/Combobox/Select/MySelect';
// import { Group } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { useQuery } from '@tanstack/react-query';
// import { IMIT } from '../../umg0mq7o3x/F_umg0mq7o3x_Read';
// import { ISubjectGroupInfoViewModel, ISubjectGroupViewModel } from './Interfaces';

// export default function ButtonAddMITScaleToSubjectGroup() {

//     const subjectGroups = useQuery<ISubjectGroupInfoViewModel[]>({
//         queryKey: ["COESubjectGroupWithoutMITScale"],
//         queryFn: async () => {
//             let cols = 'COEMITScale'
//             const response = await baseAxios.get(`/COESubjectGroup/GetSubjectGroup?hasMIT=false&cols=${cols}`);
//             return response.data.data;
//         },
//         refetchOnWindowFocus: false,
//     });

//     const allMITScales = useQuery<IMIT[]>({
//         queryKey: ["allMITScales"],
//         queryFn: async () => {
//             const result = await baseAxios.get("/COEMITScale/GetAll");
//             return result.data?.data || []
//         },
//         refetchOnWindowFocus: false,
//     })

//     const form = useForm<ISubjectGroupViewModel>({
//         initialValues: {
//             id: null,
//             code: null,
//             name: null,
//             concurrencyStamp: null,
//             isEnabled: null,
//             note: null,
//             coemitScaleId: null
//         },
//         validate: {}
//     });

//     return (
//         <Group>
//             <MyButtonCreate
//                 title='Thêm mức năng lực cho nhóm môn học'
//                 form={form}
//                 onSubmit={async (values) => {
//                     let selectedSubjectGroup = subjectGroups.data?.find((item) => item.id?.toString() === form.values.id)
//                     form.setValues({
//                         ...form.values,
//                         code: selectedSubjectGroup?.code,
//                         name: selectedSubjectGroup?.name,
//                         concurrencyStamp: selectedSubjectGroup?.concurrencyStamp,
//                         isEnabled: selectedSubjectGroup?.isEnabled,
//                         note: selectedSubjectGroup?.note,
//                     });

//                     return await baseAxios.post("/COESubjectGroup/Update", {
//                         ...form.getValues()
//                     })
//                 }}
//             >
//                 <MySelect
//                     label="Nhóm môn học"
//                     data={subjectGroups.data?.map((item) => ({
//                         value: item.id?.toString() || '',
//                         label: `${item.code} - ${item.name}`
//                     })) || []}
//                     {...form.getInputProps("id")}
//                 />

//                 <MySelect
//                     label="Mức năng lực"
//                     data={allMITScales.data?.map((item) => ({
//                         value: item.id?.toString() || '',
//                         label: `Mức năng lực ${item.code} - ${item.description}`
//                     })) || []}
//                     {...form.getInputProps("coemitScaleId")}
//                 />
//             </MyButtonCreate>
//         </Group>
//     );
// }