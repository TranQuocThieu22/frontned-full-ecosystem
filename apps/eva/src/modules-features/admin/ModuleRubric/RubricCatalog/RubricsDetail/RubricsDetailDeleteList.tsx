import { MyButtonDeleteList } from "aq-fe-framework/components";
interface Props {
    values: any;
    onDeleleList: (id: number[]) => void
}
export default function RubricsDetailDeleteList({ values, onDeleleList }: Props) {
    return (
        <MyButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => onDeleleList(values)}
        />
    )
}
