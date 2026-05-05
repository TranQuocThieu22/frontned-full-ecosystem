'use client'
import { service_address } from "@/api/services/service_address";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function AddressInsideSchoolDeleteList({ values }: { values: any }) {
    return <CustomButtonDeleteList

        contextData={values.map((data: any) => `Hoạt động ${data.code}`).join(", ")}
        onSubmit={() => service_address.deleteList(values)}
    />
}
