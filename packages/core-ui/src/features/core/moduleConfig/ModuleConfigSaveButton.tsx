import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { utils_notification_show } from '@aq-fe/core-ui/shared/utils/notificationUtils';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { I_moduleConfig_AQModule } from './ModuleConfigForm';
import { useModuleConfigStore } from './useModuleConfigStore';


export default function ModuleConfigSaveButton({
  form
}: {
  form: ReturnType<typeof useForm<I_moduleConfig_AQModule>>
}) {
  const store = useModuleConfigStore()
  const mutation = useMutation({
    mutationFn: async (body: I_moduleConfig_AQModule) => {
      const res = await axiosInstance.post("/AQ/UpdateAQSetting", body)
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
    <CustomButton
      disabled={!form.isDirty()}
      actionType='save'
      onClick={handleSave}
    />
  )
}
