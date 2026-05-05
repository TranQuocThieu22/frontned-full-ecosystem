import { MyActionIconDelete } from "aq-fe-framework/components";
import { IUnitViewModel } from "./interfaces/UnitViewModel";

export default function UnitDelete({ data }: { data: IUnitViewModel }) {
  return <MyActionIconDelete contextData={data.code} onSubmit={() => {}} />;
}
