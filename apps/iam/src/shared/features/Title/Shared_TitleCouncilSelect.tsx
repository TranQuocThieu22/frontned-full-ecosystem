import { titleService } from "@/shared/APIs/titleService";
import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import { CustomSelect, CustomSelectProps } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";

interface Props extends CustomSelectProps { }

export default function Shared_TitleCouncilSelect({ ...rest }: Props) {
    const query = useCustomReactQuery({
        queryKey: ["MemberRoleList"],
        axiosFn: () => titleService.GetAllByType(EnumTitleType.Council),
    });

    const selectData = useMemo(
        () => query.data
            ?.filter((item) => !!item.id)
            .map((item) => ({
                value: item.id?.toString() ?? "",
                label: item.name ?? "",
            })) || [],
        [query.data]
    );

    return (
        <CustomSelect
            placeholder="Chọn vai trò"
            data={selectData}
            isLoading={query.isLoading}
            isError={query.isError}
            {...rest}
        />
    );
}
