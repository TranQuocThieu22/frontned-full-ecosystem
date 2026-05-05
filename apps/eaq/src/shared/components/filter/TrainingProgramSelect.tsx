"use client";

import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function TrainingProgramSelect() {
    const filterStore = useS_Shared_Filter();
    const { StandardSet, TrainingProgram } = filterStore.state;

    const options = (StandardSet?.trainingPrograms || []).map(tp => ({
        value: tp.id!.toString(),
        label: tp.code || ""
    }));

    const handleChange = (value: string | null) => {
        const id = value ? parseInt(value) : null;
        filterStore.setTrainingProgram(id);

        if (id && StandardSet) {
            const tp = StandardSet.trainingPrograms?.find(x => x.id === id);
            if (tp) {
                const phases = tp.phases ?? [];


                // Check if there are no phases
                if (phases.length === 0) {
                    notifications.show({
                        title: "Thông báo",
                        message: "Chương trình đào tạo này chưa có giai đoạn kiểm định. Vui lòng chọn Chương trình đào tạo/Bộ tiêu chuẩn khác.",
                        color: "yellow",
                    });
                    return;
                }

                // Auto-select current phase or first phase
                const currentPhase = phases.find(p => p.isCurrent);
                const selectedPhase = currentPhase || phases[0];
                filterStore.setPhase(selectedPhase?.id!);
            }
        }
    };

    return (
        <Select
            comboboxProps={{ withinPortal: false }}
            placeholder="Chọn CTĐT"
            data={options}
            value={TrainingProgram?.id?.toString() ?? null}
            onChange={handleChange}
            searchable
            disabled={!StandardSet}
            clearable={false}
        />
    );
}
