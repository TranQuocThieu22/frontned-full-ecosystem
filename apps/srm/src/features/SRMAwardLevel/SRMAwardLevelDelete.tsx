import { AwardLevelService } from "@/shared/APIs/awardLevelService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function SRMAwardLevelDelete({ code, id }: { code: string, id: number }) {
     return (
          <CustomActionIconDelete
               contextData={code}
               onSubmit={() => AwardLevelService.delete(id)}
          />
     );
}