import { documentAttributeService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentAttributeService";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { Select, SelectProps } from "@mantine/core";

interface ISelect extends SelectProps {
  documentTypeId?: number
  label?: string;
  dataMapper?: (item: any) => { value: string; label: string }; // Hàm tùy chỉnh cách map dữ liệu
}

export function F_documentCategories_Select({ documentTypeId, label = "", dataMapper, ...rest }: ISelect) {

  // const query = useQuery({
  //   queryKey: [`/DocumentAttribute/GetByType?documentType=${documentTypeId}`],
  //   queryFn: async () => {
  //     const result = (await baseAxios.get(`/DocumentAttribute/GetByType?documentType=${documentTypeId}`)).data.data;
  //     return result
  //   },
  // });

  const query = useLegacyReactQuery({
    queryKey: [`/DocumentAttribute/GetByType?documentType=${documentTypeId}`],
    axiosFn: () => documentAttributeService.getByType(documentTypeId)
  })

  if (query.isLoading) return "Loading...";

  const data = query.data?.map((item: any) => {
    if (dataMapper) return dataMapper(item)
    return {
      value: item.id?.toString()!,
      label: `${item.code}-${item.name}`,
    }
  });

  return (
    <Select
      label={label}
      placeholder={`Chọn ${label?.toLowerCase()}`}
      data={data}
      {...rest}
      value={rest.value?.toString()}
    />
  );
}
