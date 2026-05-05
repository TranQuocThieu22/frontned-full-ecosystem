import AQStatCard1 from "@/components/AQStatCard1/MyAQStatCard1";
import { SimpleGrid } from "@mantine/core";
import { IconBook, IconClipboardCheck, IconCoin, IconPodium } from "@tabler/icons-react";

export default function FViewSummaryStat() {
    return (
        <>
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }}>
                <AQStatCard1
                    title={"Đề tài đã nghiệm thu"} value={'1.281 '}
                    description={"So với năm trước"}
                    icons={<IconClipboardCheck opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={34} />
                <AQStatCard1
                    title={"Bài báo đã xuất bản"} value={'2.568'}
                    description={"So với năm trước"}
                    icons={<IconBook opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={18} />
                <AQStatCard1
                    title={"Hội thảo đã tổ chức"} value={'350'}
                    description={"So với năm trước"}
                    icons={<IconPodium opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={60} />
                <AQStatCard1
                    title={"Chi phí đã cấp"} value={'286.350.000'}
                    unit="Triệu VNĐ"
                    description={"So với năm trước"}
                    icons={<IconCoin opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={30} />
            </SimpleGrid>
        </>
    )
}