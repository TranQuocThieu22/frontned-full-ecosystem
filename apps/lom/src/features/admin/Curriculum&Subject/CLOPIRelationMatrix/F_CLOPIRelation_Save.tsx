import useQ_COEGrade_GetDetail from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetDetail";
import useFilterGradeStore from "@/shared/features/FilterGradeSelect/useFilterGradeStore";
import { Button } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import useS_CLOPIRelationMatrix from "./useS_CLOPIRelationMatrix";

interface SaveCLOPIRelationProps {
    onSave?: (data: any[]) => void;

}

export default function F_CLOPIRelation_Save({ onSave }: SaveCLOPIRelationProps) {
    const store = useS_CLOPIRelationMatrix();
    const filterGradeStore = useFilterGradeStore();

    const subjectByGrade = useQ_COEGrade_GetDetail({
        params: `?gradeId=${filterGradeStore.state.grade?.id}`,
    });

    const handleSave = () => {
        const { edited, deleted } = store.state;

        const groupedRelations: Record<number, { id: number; coepiId: number; isEnabled: boolean }[]> = {};

        // Handle edited relations (new or modified)
        Object.values(edited || {}).forEach((relation) => {
            const cloId = relation.coecloId;
            if (typeof cloId === "undefined") return;
            // Ensure cloId is a valid number before using as index
            if (typeof cloId !== "number") return;
            if (!groupedRelations[cloId]) groupedRelations[cloId] = [];

            groupedRelations[cloId].push({
                id: ((relation.id ?? 0) < 0 ? 0 : (relation.id ?? 0)),
                coepiId: relation.coepiId ?? 0,
                isEnabled: true,
            });
        });

        // Handle deleted relations
        Object.entries(deleted || {}).forEach(([relationIdStr, isDeleted]) => {
            if (!isDeleted) return;

            const relationId = parseInt(relationIdStr);
            const original = findOriginalRelation(relationId);
            if (!original) return;
            const cloId = original.coecloId;
            if (typeof cloId === "undefined") return;
            if (typeof cloId !== "number") return;
            if (!groupedRelations[cloId]) groupedRelations[cloId] = [];

            groupedRelations[cloId].push({
                id: relationId,
                coepiId: original.coepiId ?? 0,
                isEnabled: false,
            });
        });

        const payload: any[] = [];

        Object.entries(groupedRelations).forEach(([cloIdStr, relations]) => {
            const cloId = parseInt(cloIdStr);
            const clo = findOriginalCLO(cloId);
            if (!clo) return;

            const updateDto = {
                id: clo.id,
                code: clo.code,
                name: clo.description,
                order: clo.order ?? 0,
                coecgId: clo.coecgId,
                description: clo.description ?? "",
                densityCLO: clo.densityCLO,
                passedDensity: clo.passedDensity ?? null,
                coeclopi: relations,
            };

            payload.push(updateDto);
        });

        if (onSave) onSave(payload);

        // Optional: clear local store after save
        // store.setProperty("edited", {});
        // store.setProperty("deleted", {});
    };

    const hasChanges = () => {
        return (
            Object.keys(store.state.edited || {}).length > 0 ||
            Object.keys(store.state.deleted || {}).length > 0
        );
    };

    function findOriginalCLO(cloId: number) {
        return subjectByGrade.data
            ?.flatMap((subject) => subject.coecGs)
            .flatMap((cg) => (cg && cg.coeclOs) ? cg.coeclOs : [])
            .find((clo) => clo.id === cloId);
    }

    function findOriginalRelation(relationId: number) {
        return subjectByGrade.data
            ?.flatMap((subject) => subject.coecGs)
            .flatMap((cg) =>
                cg
                    ? (cg.coeclOs || []).flatMap((clo: any) =>
                        (clo.coeclopi || []).map((rel: any) => ({
                            ...rel,
                            coecloId: clo.id,
                            coepiId: rel.coepiId,
                        }))
                    )
                    : []
            )
            .find((rel) => rel.id === relationId);
    }

    return (
        <Button
            leftSection={<IconDeviceFloppy size={16} />}
            onClick={handleSave}
            disabled={!hasChanges()}
            variant="filled"
            color="blue"
        >
            Lưu thay đổi
        </Button>
    );
}
