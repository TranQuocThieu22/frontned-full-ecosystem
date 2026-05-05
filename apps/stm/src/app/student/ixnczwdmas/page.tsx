'use client'
import F_ixnczwdmas_CertificateDetail from "@/modules-features/student/ixnczwdmas/F_ixnczwdmas_CertificateDetail";
import F_ixnczwdmas_EarnedCertificates from "@/modules-features/student/ixnczwdmas/F_ixnczwdmas_EarnedCertificates";
import { Grid } from "@mantine/core";
import { MyPageContent } from "aq-fe-framework/components";
//scheduleConfig
export default function Page() {
    return (
        <MyPageContent>
            <Grid>
                <Grid.Col span={4}>
                    <F_ixnczwdmas_EarnedCertificates />
                </Grid.Col>
                <Grid.Col span={8}>
                    <F_ixnczwdmas_CertificateDetail />
                </Grid.Col>
            </Grid>
        </MyPageContent>
    )
}

