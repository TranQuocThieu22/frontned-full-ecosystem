"use client";

import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { IReport } from "@/shared/interfaces/report/IReport";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
	values: IReport[],
	resetRowSelection: Function
}

export default function CompletedTaskDeleteListButton({ values, resetRowSelection }: Props) {
	return (
		<CustomButtonDeleteList
			count={values.length}
			onSubmit={() => {
				service_EAQAnalysis.deleteListEAQTaskDetailReport(values)
			}}
			onSuccess={() => {
				resetRowSelection();
			}}
		/>
	)
}
