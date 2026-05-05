import SingleStatCard from "@/features/admin/Report-Dashboard/ModuleAdminDashboard/SingleStatCard";
import { Box, Grid } from "@mantine/core";
import { IconArticle, IconSchool, IconUsers, IconVocabulary } from "@tabler/icons-react";

interface ReportNumberCardSectionProps {
    facultyQuantity: number;
    programQuantity: number;
    gradeQuantity: number;
    studentQuantity: number;
}

export default function ReportNumberCardSection({
    facultyQuantity,
    programQuantity,
    gradeQuantity,
    studentQuantity,
}: ReportNumberCardSectionProps) {
    return (
        <Box >
            <Grid>
                <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                    <SingleStatCard
                        title="Khoa"
                        value={facultyQuantity}
                        icons={<IconArticle size={24} stroke={1.5} />}
                        color="blue"
                        gradient={{ from: "blue", to: "cyan" }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                    <SingleStatCard
                        title="Chương trình"
                        value={programQuantity}
                        icons={<IconVocabulary size={24} stroke={1.5} />}
                        color="teal"
                        gradient={{ from: "teal", to: "green" }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                    <SingleStatCard
                        title="Khóa"
                        value={gradeQuantity}
                        icons={<IconSchool size={24} stroke={1.5} />}
                        color="violet"
                        gradient={{ from: "violet", to: "purple" }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                    <SingleStatCard
                        title="Sinh viên"
                        value={studentQuantity}
                        icons={<IconUsers size={24} stroke={1.5} />}
                        color="orange"
                        gradient={{ from: "orange", to: "red" }}
                    />
                </Grid.Col>
            </Grid>
        </Box>
    );
}