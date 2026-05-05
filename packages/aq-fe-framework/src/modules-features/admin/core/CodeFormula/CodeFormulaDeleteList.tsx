import { codeFormulaService } from "@/APIs/codeFormulaService";
import { MyButtonDeleteList } from "@/components/Button/ButtonCRUD/MyButtonDeleteList/MyButtonDeleteList";

export default function CodeFormulaDeleteList({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            count={values.length}
            onSubmit={() => codeFormulaService.deleteList(values)}
        />
    )
}
