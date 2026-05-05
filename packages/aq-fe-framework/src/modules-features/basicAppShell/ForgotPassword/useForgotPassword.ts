// useForgotPassword.ts (giữ đơn giản)
import { accountService } from "@/APIs/accountService"
import { useMyReactMutation } from "@/hooks"
import { useStore_Authenticate } from "@/modules-features"

interface ChangePasswordPayload {
  currentPassWord: string
  newPassWord: string
}

export default function useForgotPassword() {
  const { state } = useStore_Authenticate()

  const changePassWordMutation = useMyReactMutation({
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
