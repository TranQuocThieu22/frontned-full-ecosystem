import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function AdvisoryCouncilEstablishmentDeleteListButton({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            // disabled={values.length === 0}
            contextData={values.map((item: any) => (item.councilCode || item.proposalCode || item.staffCode)).join(", ")}
            onSubmit={() => { }}
        />
    )
}
