'use client'
import F_CLOPIMatrixTable from '@/features/admin/UncategorizedModules/CLO-PI-proportion-matrix/F_CLOPIMatrixTable'
import RestrictedAccessMessage from '@/features/auth/AuthorizationRender/restricted-access-message'
import { canViewCLOPIProportionMatrix } from '@/features/auth/PageAuthorization/CLO-PI-proportion-matrix'
import FilterGradeSelect from '@/shared/features/FilterGradeSelect/FilterGradeSelect'
import { useAuthenticateStore } from '@aq-fe/core-ui/features/authenticate/useAuthenticateStore'
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent'
import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore'
import { Space } from '@mantine/core'

//hxrvhadcfm
export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent >
            {canViewCLOPIProportionMatrix(userStore, userPermissionStore) ?
                <>
                    <FilterGradeSelect />
                    <Space />
                    <F_CLOPIMatrixTable />
                </>
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}
