// useForgotPassword.ts (giữ đơn giản)
import { useAuthenticateStore } from "@aq-fe/aq-legacy-framework/features/authenticate/useAuthenticateStore"
import { accountService } from "@aq-fe/aq-legacy-framework/shared/APIs/accountService"
import { useLegacyReactMutation } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactMutation"

interface ChangePasswordPayload {
  currentPassWord: string
  newPassWord: string
}

export default function useForgotPassword() {
  const { state } = useAuthenticateStore()

  const changePassWordMutation = useLegacyReactMutation({
    axiosFn: ({ currentPassWord, newPassWord }: ChangePasswordPayload) =>
      accountService.changePassWord({
        currentPassWord,
        newPassWord,
        userId: state.userId,
      }),
    successNotification: "Đổi mật khẩu thành công"
  })

  return {
    changePassWord: changePassWordMutation.mutate,
    loading: changePassWordMutation.isPending,
  }
}
