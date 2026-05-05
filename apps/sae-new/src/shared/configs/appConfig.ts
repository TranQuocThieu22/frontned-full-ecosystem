export const APP_CONFIG = {
    alias: '/sae-develop',
    aqModule: 'sae',
    tenantCode: "CNTN",
    iamApiBaseUrl: (process.env.NEXT_PUBLIC_IAM_API_URL ?? "").replace(/\/$/, ""),
    category: "SaePublic"
};