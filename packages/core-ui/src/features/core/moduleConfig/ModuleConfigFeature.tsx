import { useEffect } from 'react'
import ModuleConfigForm from './ModuleConfigForm'
import { useModuleConfigStore } from './useModuleConfigStore'

export function ModuleConfigFeature({ AQModuleId }: { AQModuleId: number }) {
    const store = useModuleConfigStore()
    useEffect(() => {
        store.setProperty("AQModuleId", AQModuleId)
    }, [])
    return (
        <ModuleConfigForm />
    )
}
