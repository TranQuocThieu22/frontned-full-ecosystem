import { AwardLevelService } from "@/shared/APIs/awardLevelService";
import { SRMAwardLevel } from "@/shared/interfaces/SRMAwardLevel";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function SRMAwardLevelDeleteList({ data }: { data: SRMAwardLevel[] }) {
     return (
          <CustomButtonDeleteList
               count={data.length}
               onSubmit={() => { return AwardLevelService.deleteList(data.map((item) => ({ id: item.id }))) }} />
     );
}