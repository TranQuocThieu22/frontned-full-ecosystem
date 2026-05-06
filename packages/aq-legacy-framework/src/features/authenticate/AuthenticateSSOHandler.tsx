
// app/logonSSO/page.tsx (App Router)
"use client";

import { ISignInRes } from "@aq-fe/aq-legacy-framework/shared/APIs/accountService";
import { I_BasicAppShell_LinkItem } from "@aq-fe/aq-legacy-framework/shared/components/layout/CustomBasicAppShell/types";
import { extractLinkedMenuItems } from "@aq-fe/aq-legacy-framework/shared/components/layout/CustomBasicAppShell/utils";
import { useConfig } from "@aq-fe/core-ui/shared/hooks/useConfig";
import { CustomApiResponse } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi";
import { usePermissionStore } from "@aq-fe/aq-legacy-framework/shared/stores/usePermissionStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthenticateManager from "./useAuthenticateManager";

interface AuthenticateSSOHandlerProps {
    onSuccessNavigateFollowRole?: (data: ISignInRes, firstMenuPermission?: I_BasicAppShell_LinkItem) => void
    menuData: I_BasicAppShell_LinkItem[],
    aqModule: string
    siteUrl: string
}

export function AuthenticateSSOHandler({
    menuData,
    onSuccessNavigateFollowRole,
    aqModule = "",
    siteUrl
}: AuthenticateSSOHandlerProps) {
    const permissionStore = usePermissionStore()
    const router = useRouter()
    const manager = useAuthenticateManager()
    const config = useConfig<{
        baseURL: string,
    }>({
        key: "baseURL",
        configPath: siteUrl + "/config.json"
    })
    const searchParams = useSearchParams();
    const [messError, setMessError] = useState("");
    const studentCode = searchParams.get("code");
    const token = searchParams.get("token");
    useEffect(() => {
        localStorage.clear()
        if (config.isLoading == true) return
        if (studentCode && token) {
            loginSSO(studentCode, token);
        } else {
            setMessError("Thông tin đăng nhập không hợp lệ");
        }
    }, [config.data]);

    async function loginSSO(studentCode: string, token: string) {
        permissionStore.setState({})
        try {
            const res = await fetch(
                `${config.data}/account/SignInWithToken?code=${studentCode}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${token}`,
                        "X-Aqmodule": aqModule || ""
                    },
                    body: new URLSearchParams().toString()
                }
            );

            const data: CustomApiResponse<ISignInRes> = await res.json();

            if (data?.isSuccess && data?.data?.token) {
                // Lưu token mới vào localstorage
                manager.onLoginSuccessSaveStore({ data: data.data })
                // Điều hướng tùy theo role
                const firstPageIdCanView: number | undefined =
                    data.data.permissions?.find(element => element.isRead)?.pageId
                const flatmenu = extractLinkedMenuItems(menuData || [])
                const first = flatmenu.find(item => item.pageId == firstPageIdCanView)
                if (onSuccessNavigateFollowRole) {
                    onSuccessNavigateFollowRole(data.data || [], first)
                } else {
                    if (first?.link == undefined) {
                        router.push("/admin/noPermission");
                        return;
                    }
                    router.push("/admin/" + first?.link);
                }
            } else {
                setMessError("Đăng nhập không thành công");
            }
        } catch (error) {
            console.error(error);
            setMessError("Lỗi khi gọi API đăng nhập");
        }
    }
    return (
        <div>
            <h2>Đang đăng nhập bằng SSO...</h2>
            {messError && <p style={{ color: "red" }}>{messError}</p>}
        </div>
    );
}
