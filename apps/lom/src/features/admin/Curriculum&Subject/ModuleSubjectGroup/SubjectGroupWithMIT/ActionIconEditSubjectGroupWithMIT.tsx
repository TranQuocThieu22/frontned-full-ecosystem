// "use client"
// import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
// import MySelect from '@/components/ui/Combobox/Select/MySelect';
// import { Group } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { useQuery } from '@tanstack/react-query';
// import { MyActionIconUpdate } from 'aq-fe-framework/components';
// import { IMIT } from '../../umg0mq7o3x/F_umg0mq7o3x_Read';
// import { ISubjectGroupInfoViewModel, ISubjectGroupViewModel } from './Interfaces';

// export default function ActionIconEditSubjectGroupWithMIT({ values }: { values: ISubjectGroupInfoViewModel }) {
//     const subjectGroups = useQuery<ISubjectGroupInfoViewModel[]>({
//         queryKey: ["COESubjectGroupWithAndWithoutMITScale"],
//         queryFn: async () => {
//             let cols = 'COEMITScale'
//             const response = await baseAxios.get(`/COESubjectGroup/GetAll`);
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
//             id: values.id,
//             code: values.code,
//             name: values.name,
//             concurrencyStamp: values.concurrencyStamp,
//             isEnabled: values.isEnabled,
//             note: values.note,
//             coemitScaleId: values.coemitScaleId
//         },
//         validate: {}
//     });

//     return (
//         <Group>
//             <MyActionIconUpdate
//                 title='Thêm mức năng lực cho nhóm môn học'
//                 form={form}
//                 onSubmit={(values) => {
//                     let selectedSubjectGroup = subjectGroups.data?.find((item) => item.id === form.values.id)
//                     form.setValues({
//                         ...form.values,
//                         code: selectedSubjectGroup?.code,
//                         name: selectedSubjectGroup?.name,
//                         concurrencyStamp: 'string',
//                         isEnabled: selectedSubjectGroup?.isEnabled,
//                         note: selectedSubjectGroup?.note,
//                     });

//                     return baseAxios.post("/COESubjectGroup/Update", {
//                         ...form.getValues()
//                     })
//                 }}
//             >
//                 <MySelect
//                     disabled
//                     label="Nhóm môn học"
//                     data={subjectGroups.data?.map((item) => ({
//                         value: item.id?.toString() || '',
//                         label: `${item.code} - ${item.name}`
//                     })) || []}
//                     defaultValue={form.values.id?.toString()}
//                     onChange={(value) => {
//                         form.setFieldValue("id", parseInt(value!));
//                     }}
//                 />

//                 <MySelect
//                     label="Mức năng lực"
//                     data={allMITScales.data?.map((item) => ({
//                         value: item.id?.toString() || '',
//                         label: `Mức năng lực ${item.code} - ${item.description}`
//                     })) || []}
//                     defaultValue={form.values.coemitScaleId?.toString()}
//                     onChange={(value) => {
//                         form.setFieldValue("coemitScaleId", parseInt(value!));
//                     }}
//                 />
//             </MyActionIconUpdate>
//         </Group>
//     );
// }