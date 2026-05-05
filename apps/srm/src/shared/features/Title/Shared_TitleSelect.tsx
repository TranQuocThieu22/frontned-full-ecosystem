import { titleService } from "@/shared/APIs/titleService";
import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import { CustomSelect, CustomSelectProps } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";


interface Props extends CustomSelectProps {
    titleType: EnumTitleType
}

export default function Shared_TitleSelect({ titleType, ...rest }: Props) {
    const query = useCustomReactQuery({
        queryKey: ['title'],
        axiosFn: () => titleService.GetAllByType(titleType)
    })
    return (
        <CustomSelect
            data={query.data?.map(item => ({
                value: item.id?.toString()!,
                label: item.code + "-" + item.name
            })) || []}
            isLoading={query.isLoading}
            isError={query.isError}
            {...rest}
        />
    )
}
