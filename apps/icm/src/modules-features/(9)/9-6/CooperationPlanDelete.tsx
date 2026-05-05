import { MyActionIconDelete } from "aq-fe-framework/components";
export default function CooperationPlanDelete({agreementCode}: {agreementCode: string}) {
  return (
    <MyActionIconDelete
      contextData={agreementCode}
      onSubmit={() => {
        console.log("Xoá kế hoạch hợp tác với mã:", agreementCode);
      }}
    />
  );

}