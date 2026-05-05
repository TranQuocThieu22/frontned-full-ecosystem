// useForgotPassword.ts (giữ đơn giản)
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import { accountService } from "@aq-fe/core-ui/shared/APIs/accountService"
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation"

interface ChangePasswordPayload {
  currentPassWord: string
  newPassWord: string
}

export default function useForgotPassword() {
  const { state } = useAuthenticateStore()

  const changePassWordMutation = useCustomReactMutation({
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
