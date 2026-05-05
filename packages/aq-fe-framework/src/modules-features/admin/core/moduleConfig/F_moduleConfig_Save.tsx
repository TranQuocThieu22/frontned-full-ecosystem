import { MyButton } from '@/core';
import baseAxios from '@/shared/config/baseAxios';
import { utils_notification_show } from '@/utils';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { I_moduleConfig_AQModule } from './F_moduleConfig_Form';
import { useS_moduleConfig } from './useS_moduleConfig';


export default function F_moduleConfig_Save({
  form
}: {
  form: ReturnType<typeof useForm<I_moduleConfig_AQModule>>
}) {
  const store = useS_moduleConfig()
  const mutation = useMutation({
    mutationFn: async (body: I_moduleConfig_AQModule) => {
      const res = await baseAxios.post("/AQ/UpdateAQSetting", body)
      return res
    }
  })

  async function handleSave() {
    const { faviconFile, logoFile, ...formValues } = form.getValues()
    mutation.mutate({
      ...formValues,
      logoFileDetail: form.isDirty("logoFileDetail") == false ? {
        fileName: formValues.logoFileDetail?.fileName,
        fileExtension: formValues.logoFileDetail?.fileExtension,
        fileBase64String: "",
      } : formValues.logoFileDetail,

      faviconFileDetail: form.isDirty("faviconFileDetail") == false ? {
        fileName: formValues.faviconFileDetail?.fileName,
        fileExtension: formValues.faviconFileDetail?.fileExtension,
        fileBase64String: "",
      } : formValues.faviconFileDetail,
      id: store.state.AQModuleId,
    }, {
      onSuccess: () => {
        utils_notification_show({
          crudType: "update"
        })
      }
    })
  }

  return (
    <MyButton
      disabled={!form.isDirty()}
      actionType='save'
      onClick={handleSave}
    />
  )
}
