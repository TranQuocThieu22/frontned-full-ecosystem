'use client'
import F_ixnczwdmas_CertificateDetail from "@/features/student/ixnczwdmas/F_ixnczwdmas_CertificateDetail";
import F_ixnczwdmas_EarnedCertificates from "@/features/student/ixnczwdmas/F_ixnczwdmas_EarnedCertificates";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { Grid } from "@mantine/core";
//scheduleConfig
export default function Page() {
    return (
        <CustomPageContent>
            <Grid>
                <Grid.Col span={4}>
                    <F_ixnczwdmas_EarnedCertificates />
                </Grid.Col>
                <Grid.Col span={8}>
                    <F_ixnczwdmas_CertificateDetail />
                </Grid.Col>
            </Grid>
        </CustomPageContent>
    )
}

