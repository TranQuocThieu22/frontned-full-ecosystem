import { departmentService } from "@/shared/APIs/departmentService";
import { CustomSelect, CustomSelectProps } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Props extends CustomSelectProps { }

export default function Shared_SelectWorkingUnit({ ...rest }: Props) {
    const query = useCustomReactQuery({
        queryKey: ['departments'],
        axiosFn: () => {
            return departmentService.getWorkingUnit()
        }
    })
    return (
        <CustomSelect
            label="Đơn vị"
            data={query.data?.map(item => ({
                label: item.code + " - " + item.name,
                value: item.id?.toString()!
            }))}
            {...rest}
        />
    )
}
