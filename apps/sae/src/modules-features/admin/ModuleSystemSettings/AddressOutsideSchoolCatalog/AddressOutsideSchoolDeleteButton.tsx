import { service_address } from "@/api/services/service_address";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
export default function AddressOutsideSchoolDeleteButton({ id, code }: { id: number, code: string }) {
    return (
        <CustomActionIconDelete contextData={code} onSubmit={async () => await service_address.delete(id)
        } />
    );
}
