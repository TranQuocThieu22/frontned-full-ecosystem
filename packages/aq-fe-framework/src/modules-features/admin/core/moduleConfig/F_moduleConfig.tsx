import { useEffect } from 'react'
import F_moduleConfig_Form from './F_moduleConfig_Form'
import { useS_moduleConfig } from './useS_moduleConfig'

export function F_moduleConfig({ AQModuleId }: { AQModuleId: number }) {
    const store = useS_moduleConfig()
    useEffect(() => {
        store.setProperty("AQModuleId", AQModuleId)
    }, [])
    return (
        <F_moduleConfig_Form />
    )
}
