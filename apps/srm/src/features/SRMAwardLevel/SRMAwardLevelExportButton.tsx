import { AwardLevelService } from "@/shared/APIs/awardLevelService";
import { SRMAwardLevel } from "@/shared/interfaces/SRMAwardLevel";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function SRMAwardLevelExportButton({ data }: { data: SRMAwardLevel[] }) {
     const exportConfig = {
          fields: [
               { fieldName: "code", header: "Mã cấp giải thưởng" },
               { fieldName: "name", header: "Tên cấp giải thưởng" },
               { fieldName: "isDeactivate", header: "Không sử dụng" },
               { fieldName: "note", header: "Ghi chú" },
          ],
     };
     const SRMAwardLevelQuery = useCustomReactQuery({
          queryKey: ['SRMAwardLevelQuery'],
          axiosFn: () => AwardLevelService.getAll() //{ params: `?cols=SRMAwardLevel` }
     })
     return (
          <AQButtonExportData
               objectName="danh_sach_cap_giai_thuong_sinh_vien_nghien_cuu_khoa_hoc"
               data={data.length > 0 ? data : SRMAwardLevelQuery.data || []}
               exportConfig={exportConfig}
          />
     );
}