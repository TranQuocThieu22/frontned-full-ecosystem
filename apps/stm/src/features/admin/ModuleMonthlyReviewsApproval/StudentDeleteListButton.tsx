import { CustomButtonDeleteList as MyButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function StudentDeleteListButton({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            actionIconProps={{
                disabled: values.length === 0
            }}
            contextData={values.map((item: any) => item.studentCode).join(", ")}
            onSubmit={() => { }}
        />
    )
}