import { ISignInRes } from "@aq-fe/aq-legacy-framework/shared/APIs/accountService"
import { usePermissionStore } from "@aq-fe/aq-legacy-framework/shared/stores/usePermissionStore"
import { useAuthenticateStore } from "./useAuthenticateStore"

enum LoginStatus {
    notFounAccount = 1,
    passWordNotCorrect = 2
}

export default function useAuthenticateManager() {
    const authenticateStore = useAuthenticateStore()
    const permissionStore = usePermissionStore()
    const onLoginSuccessSaveStore = ({
        data
    }: {
        data: ISignInRes
    }) => {
        authenticateStore.setProperty("code", data?.userName)
        authenticateStore.setProperty("fullName", data?.userFullName)
        authenticateStore.setProperty("userId", data?.userId)
        authenticateStore.setProperty("token", data?.token)
        authenticateStore.setProperty("roleIds", data?.roleIds)
        authenticateStore.setProperty("workingUnitId", data?.workingUnitId)
        permissionStore.setProperty("permission", data?.permissions)
    }

    // const signInMutation = useMutation({
    //     mutationFn: (values: { userName?: string; passWord?: string; }) => service_account.signIn(values),
    //     onSuccess: (data: MyApiResponse<ISignInRes>) => {
    //         if (data.isSuccess === 0) {
    //             return
    //             form.setFieldError("username", "Tài khoản không tồn tại")
    //             return
    //         }
    //         if (data.isSuccess == 0) {
    //             form.setFieldError("password", data.message)
    //             return
    //         }
    //     }
    // })
    return {
        onLoginSuccessSaveStore,
        // signInMutation
    }
}
