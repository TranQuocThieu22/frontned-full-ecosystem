import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function StandardSetSelect() {
    const filterStore = useS_Shared_Filter();
    const { StandardSet, standardSets } = filterStore.state;

    const handleStandardSetChange = (value: string | null) => {
        const id = value ? parseInt(value) : null;
        filterStore.setStandardSet(id);

        if (id) {
            const selectedStandardSet = standardSets.find(s => s.id === id);
            if (selectedStandardSet) {
                const trainingPrograms = selectedStandardSet.trainingPrograms ?? [];

                // Check if there are no training programs
                if (trainingPrograms.length === 0) {
                    notifications.show({
                        title: "Thông báo",
                        message: "Bộ tiêu chuẩn này chưa có chương trình đào tạo. Vui lòng chọn Bộ tiêu chuẩn khác.",
                        color: "yellow",
                    });
                    return;
                }

                // Auto-select first training program
                const firstTP = trainingPrograms[0];
                filterStore.setTrainingProgram(firstTP?.id || 0);

                // Check if training program has no phases
                const phases = firstTP?.phases ?? [];
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
                if (selectedPhase) {
                    filterStore.setPhase(selectedPhase?.id || 0);
                }
            }
        }
    };

    return (
        <Select
            comboboxProps={{ withinPortal: false }}
            placeholder="Chọn Bộ tiêu chuẩn"
            data={standardSets.map(s => ({
                label: s.code ?? "",
                value: s.id?.toString() ?? ""
            }))}
            value={StandardSet?.id?.toString() || null}
            onChange={handleStandardSetChange}
            clearable={false}
            searchable
        />
    );
}
