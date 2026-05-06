import { codeFormulaService } from "@aq-fe/aq-legacy-framework/shared/APIs/codeFormulaService";
import { CustomButtonDeleteList } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonDeleteList";

export default function CodeFormulaDeleteList({ values }: { values: any }) {
    return (
        <CustomButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            count={values.length}
            onSubmit={() => codeFormulaService.deleteList(values)}
        />
    )
}
