import { MyActionIconDelete } from "aq-fe-framework/components";
import { IThanhLapToThamDinhKinhPhiViewModel } from "./interfaces/ThanhLapToThamDinhKinhPhiViewModel";

export default function ThanhLapToThamDinhKinhPhiDelete({ data }: { data: IThanhLapToThamDinhKinhPhiViewModel }) {
    return (
        <MyActionIconDelete
            contextData={data.code}
            onSubmit={() => { }}
        />
    );
}