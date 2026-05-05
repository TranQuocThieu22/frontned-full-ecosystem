// 'use client'
// import { service_standard } from '@/api/services/service_standard';
// import { IEvaluationScoreViewModel } from '@/modules-features/admin/ModuleEvaluation/EvaluationFramework/CRUDEvaluationScore/interfaces/IEvaluationScoreViewModel';
// import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
// import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput';
// import { CustomTextArea } from '@aq-fe/core-ui/shared/components/input/CustomTextArea';
// import { CustomTextInput } from '@aq-fe/core-ui/shared/components/input/CustomTextInput';
// import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
// import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore';
// import { Grid } from '@mantine/core';
// import { useForm } from '@mantine/form';



// export default function EvaluationScoreButtonCreate
//     () {
//     const { data: existingData = [] } = useCustomReactQuery({
//         queryKey: ["EvaluationScoreButtonCreate_Create_Standard_GetAll"],
//         axiosFn: () => service_standard.getAll(),
//     });
//     const permissionStore = usePermissionStore()


//     const form = useForm<IEvaluationScoreViewModel>({
//         initialValues: {
//             id: 0,
//             code: '',
//             name: '',
//             concurrencyStamp: "",
//             isEnabled: true,
//             minPoint: 0,
//             maxPoint: 0,
//             note: "",
//             orderBy: null,
//             events: [],
//         },
//         validate: {
//             code: (value) => value ? null : 'Không được để trống',
//             name: (value) => value ? null : 'Không được để trống',
//             maxPoint: (value) => {
//                 if (value == null) return "Không được để trống";
//                 if (value < 0) return "Điểm tối đa không được âm";

//                 const currentTotal = existingData.reduce((sum, item) => sum + (item.maxPoint || 0), 0);
//                 if (currentTotal + value > 100) {
//                     return `Tổng điểm vượt quá 100 (hiện tại: ${currentTotal}, thêm: ${value})`;
//                 }
//                 return null;
//             }
//         }
//     });

//     return (
//         <CustomButtonCreateUpdate
//             modalProps={{
//                 size: "60%",
//                 title: "Khung điểm đánh giá"
//             }}
//             form={form}
//             // hidden={permissionStore.state.currentPermissionPage?.isCreate == false}
//             onSubmit={async (values) => {
//                 return await service_standard.create(values)
//             }}>
//             <CustomTextInput withAsterisk label='Mã' {...form.getInputProps("code")} />
//             <CustomTextArea withAsterisk label='Tên' {...form.getInputProps("name")} />
//             <Grid>
//                 <Grid.Col span={4}>
//                     <CustomNumberInput
//                         min={0}
//                         max={100}
//                         withAsterisk
//                         label='Giới hạn điểm tối đa'
//                         {...form.getInputProps("maxPoint")}
//                     />
//                 </Grid.Col>
//                 <Grid.Col span={8}>
//                     <CustomTextInput label='Ghi chú' {...form.getInputProps("note")} />
//                 </Grid.Col>
//             </Grid>
//         </CustomButtonCreateUpdate>
//     )
// }
