
// app/logonSSO/page.tsx (App Router)
"use client";

import { ISignInRes } from "@/APIs/accountService";
import { extractLinkedMenuItems, I_BasicAppShell_LinkItem } from "@/components";
import { useConfig } from "@/hooks";
import { MyApiResponse } from "@/shared/lib/createBaseApi";
import { useSearchParams } from "next/navigation.js";
import { useEffect, useState } from "react";
import useAuthenticateManager from "./useAuthenticateManager";

interface Feat_Authenticate_SSOHandlerProps {
    onSuccessNavigateFollowRole: (data: ISignInRes, firstMenuPermission?: I_BasicAppShell_LinkItem) => void
    menuData: I_BasicAppShell_LinkItem[],
    aqModule: string
}

export function Feat_Authenticate_SSOHandler({
    menuData,
    onSuccessNavigateFollowRole,
    aqModule = ""
}: Feat_Authenticate_SSOHandlerProps) {

    const manager = useAuthenticateManager()
    const config = useConfig<{
        baseURL: string,
    }>({
        key: "baseURL",
        configPath: (aqModule ? "/" + aqModule : "") + "/config.json"
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
        try {
            // const body = new URLSearchParams();
            // body.set("Authorization", `Bearer ${token}`);

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

            const data: MyApiResponse<ISignInRes> = await res.json();

            if (data?.isSuccess && data?.data?.token) {
                // Lưu token mới vào localstorage
                manager.onLoginSuccessSaveStore({ data: data.data })
                // Điều hướng tùy theo role
                const firstPageIdCanView: number | undefined =
                    data.data.permissions?.find(element => element.isRead)?.pageId
                const flatmenu = extractLinkedMenuItems(menuData || [])
                const first = flatmenu.find(item => item.pageId == firstPageIdCanView)
                onSuccessNavigateFollowRole(data.data || [], first)

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
