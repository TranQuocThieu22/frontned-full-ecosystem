import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Select } from "@mantine/core";

export default function PhaseSelect() {
    const filterStore = useS_Shared_Filter();
    const { TrainingProgram, Phase } = filterStore.state;

    const phases = TrainingProgram?.phases || [];

    const handlePhaseChange = (value: string | null) => {
        const id = value ? parseInt(value) : null;
        filterStore.setPhase(id);
    };

    const getPlaceholderText = () => {
        if (!TrainingProgram) {
            return "Chọn CTĐT trước";
        }
        if (!phases.length) {
            return "Chưa có dữ liệu";
        }
        return "Chọn giai đoạn";
    };

    return (
        <Select
            comboboxProps={{ withinPortal: false }}
            placeholder={getPlaceholderText()}
            data={phases.map(phase => ({
                label: phase.code ?? "",
                value: phase.id?.toString() ?? ""
            }))}
            value={Phase?.id?.toString() ?? null}
            onChange={handlePhaseChange}
            disabled={!TrainingProgram || !phases.length}
            clearable={false}
            searchable
        />
    );
}
