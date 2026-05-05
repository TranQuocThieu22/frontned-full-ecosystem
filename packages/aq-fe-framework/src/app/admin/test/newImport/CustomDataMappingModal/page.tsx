"use client"
import CustomMappingDataModal from "@/core/overlays/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useDisclosure } from "@mantine/hooks";

export default function Page() {
    const disc = useDisclosure(true)
    return (
        <CustomMappingDataModal
            onClose={disc[1].close}
            opened={disc[0]}
            data={[
                {
                    "code": "207pm65348",
                    "dayOfBirth": "24/02/2025",
                    "totalMoney": "12,1212.012",
                    "isEx": "1"
                },
                {
                    "code": "207pm65348",
                    "dayOfBirth": "24/02/2025",
                    "totalMoney": "12,1212.012",
                    "isEx": "0"
                },
                {
                    "code": "",
                    "dayOfBirth": "",
                    "totalMoney": "12,1212.012",
                    "isEx": "0"
                },
            ]}
            fields={[
                {
                    key: "code",
                    name: "Mã sinh viên",
                    isRequired: true,
                },
                {
                    key: "dayOfBirth",
                    name: "Ngày sinh",
                    parseType: "date",
                    isRequired: true,
                },
                {
                    key: "totalMoney",
                    name: "Học phí",
                    parseType: "number"
                },
                {
                    key: "isEx",
                    name: "Là sinh viên nước ngoài",
                }
            ]}
        />
    )
}
