import AQStatCard1 from "@/components/AQStatCard1/MyAQStatCard1";
import { SimpleGrid } from "@mantine/core";
import { IconArticle, IconNews, IconWorldShare } from "@tabler/icons-react";

export default function FeatReportNumber() {
    return (
        <SimpleGrid cols={{ base: 1, xs: 2, lg: 3 }}>
            <AQStatCard1
                title={"Đề tài đã nghiệm thu"} value={'152'}
                description={"So với tháng trước"}
                icons={<IconArticle opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={34} />
            <AQStatCard1
                title={"Bài báo đã xuất bản"} value={'2568'}
                description={"So với tháng trước"}
                icons={<IconNews opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={18} />
            <AQStatCard1
                title={"Hội thảo đã tổ chức"} value={'350'}
                description={"So với tháng trước"}
                icons={<IconWorldShare opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={60} />

        </SimpleGrid>
    )
}