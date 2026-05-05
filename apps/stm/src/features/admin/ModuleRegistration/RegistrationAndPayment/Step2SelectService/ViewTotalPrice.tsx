import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow"
import { rem, Text } from "@mantine/core"
import { utils_currency_formatWithSuffix } from "aq-fe-framework/utils"
import { usePaymentSelectionStore } from "../Store/PaymentSelectionStore"
import { useSelectedServiceStore } from "../Store/SelectedServiceStore"

export default function ViewTotalPrice({ step }: { step: number }) {
    const SelectedServiceStore = useSelectedServiceStore()
    const PaymentStore = usePaymentSelectionStore()
    return (
        <MyFlexRow
            justify="end"
            style={{
                paddingTop: rem(12),
                marginTop: rem(12),
                borderTop: "1px solid #e0e0e0",
            }}
        >
            <Text fw={"bolder"} size="lg" c="dimmed">
                Tổng cộng:
            </Text>
            <Text fw={700} size="lg" c="blue">
                {step === 3 ?
                    utils_currency_formatWithSuffix(PaymentStore.finalPaymentPrice === null ? 0 : PaymentStore.finalPaymentPrice, "VNĐ")
                    :
                    utils_currency_formatWithSuffix(SelectedServiceStore.getTotalSelectedServicesPrice(), " VNĐ")
                }
            </Text>
        </MyFlexRow>
    )
}
