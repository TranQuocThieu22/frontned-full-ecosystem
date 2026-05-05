import { areaService } from "@/shared/APIs/areaService";
import { SRMArea } from "@/shared/interfaces/SRMArea";
import { CustomSelectAPI, CustomSelectAPIProps } from "@aq-fe/core-ui/shared/components/withAPI/CustomSelectAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType";



interface Props extends SafeOmitType<CustomSelectAPIProps<SRMArea>, "query"> { }
export default function Shared_AreaSelect({ ...rest }: Props) {
    const query = useCustomReactQuery({
        queryKey: ['areas'],
        axiosFn: () => areaService.getAll()
    })
    return (
        <CustomSelectAPI
            label="Lĩnh vực"
            query={query}
            {...rest}
        />
    )
}
