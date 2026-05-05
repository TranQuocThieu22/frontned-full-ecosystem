import { codeFormulaService } from "@aq-fe/core-ui/shared/APIs/codeFormulaService";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

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
