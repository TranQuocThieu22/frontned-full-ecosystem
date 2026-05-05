import React from "react";
import { AreaChart, LineChart } from "@mantine/charts"; // cần cài @mantine/charts
import { SchoolLeadershipVacancy, toLeadershipOverlapRule } from "../Interfaces/IOrganizationAndAdministrationViewModel";
import { Criterion } from "../Interfaces/IQAEduViewModel";

function getMonthlyVacancies(data: SchoolLeadershipVacancy[] | undefined) {
    // Khởi tạo mảng 12 tháng = 0
    const months = Array(12).fill(0);

    if (!data) return months;


    data.forEach((item) => {
        const start = new Date(item.startDate);
        const end = item.expectedFillDate ?? new Date("2024-12-31");

        for (let m = 0; m < 12; m++) {
        const monthStart = new Date(2024, m, 1);
        const monthEnd = new Date(2024, m + 1, 0); // cuối tháng

        // Nếu khoảng khuyết giao với tháng này → cộng số vị trí khuyết
        if (end >= monthStart && start <= monthEnd) {
            months[m] += item.vacantPositions.length;
            
        }
    }
  });

  // Trả về dạng object cho chart
    return months.map((v, i) => ({
        month: `Th${i + 1}`,
        vacancies: v,
    }));
}

export function VacanciesChart({ criterion }: { criterion: Criterion }) {
    const o = toLeadershipOverlapRule(criterion.details);

    return (
        <LineChart
            h={300}
            data={getMonthlyVacancies(o?.vacancies)}
            dataKey="month"
            series={[{ name: "vacancies", color: "red.6" }]}
            curveType="linear"
            withLegend
        />
    );
}
