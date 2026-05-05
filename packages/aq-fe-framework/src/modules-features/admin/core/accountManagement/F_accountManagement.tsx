import { useEffect } from "react";
import { AccountManagement_ReadUser } from "./AccountManagement_ReadUser";
import useStore_AccountManagement from "./useStore_AccountManagement";

interface IProps {
    isRequireSkillCenter?: boolean
}

export function F_accountManagement({ isRequireSkillCenter = false }: IProps) {
    const store = useStore_AccountManagement()
    useEffect(() => {
        store.setProperty("isRequireSkillCenter", isRequireSkillCenter)
    }, [])
    return (
        <AccountManagement_ReadUser />
    )
}
