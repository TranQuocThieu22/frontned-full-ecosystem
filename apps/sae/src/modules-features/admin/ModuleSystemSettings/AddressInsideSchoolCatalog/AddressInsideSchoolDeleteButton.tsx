import { service_address } from "@/api/services/service_address";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
export default function AddressInsideSchoolDeleteButton({ id, code }: { id: number, code: string }) {
    return (
        <CustomActionIconDelete contextData={code} onSubmit={() => service_address.delete(id)} />
    );
}
