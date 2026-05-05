import { SRMTypeService } from "@/shared/APIs/SRMTypeService";
import { SRMType } from "@/shared/interfaces/SRMType";
import { CustomSelectAPI, CustomSelectAPIProps } from "@aq-fe/core-ui/shared/components/withAPI/CustomSelectAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType";


interface Props extends SafeOmitType<CustomSelectAPIProps<SRMType>, "query"> { }

export default function Shared_TypeSelect({ ...rest }: Props) {
    const query = useCustomReactQuery({
        queryKey: ['SRMTypes'],
        axiosFn: () => SRMTypeService.getAllIsActive()
    })
    return (
        <CustomSelectAPI
            label="Loại đề tài"
            query={query}
            {...rest}
        />
    )
}
