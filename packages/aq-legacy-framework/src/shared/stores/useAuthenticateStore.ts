import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";

export interface AuthenticateStore {
    tenantId?: string;
    token?: string;
}

export const useAuthenticateStore = createGenericStore<AuthenticateStore>({
    initialState: { tenantId: "", token: "" },
    storageKey: "authenticate-store",
});
