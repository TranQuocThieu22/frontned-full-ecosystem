import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function StaffCategoriesDeleteListButton({ values }: { values: any }) {
    return (
        <CustomButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => { }}
        />
    )
}
