import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function StaffCategoriesDeleteButton({ id, code }: { id: number, code: string }) {
    return (
        <CustomActionIconDelete
            contextData={code}
            onSubmit={() => {

            }} />
    )
}
