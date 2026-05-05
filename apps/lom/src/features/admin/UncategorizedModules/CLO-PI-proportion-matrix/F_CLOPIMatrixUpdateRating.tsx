import useM_COEGrade_CLOPIRating from "@/hooks/mutation-hooks/COEGrade/useM_COEGrade_CLOPIRating";
import useQ_COEGrade_GetDetail from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetDetail";
import { COECLOPI } from "@/interfaces/shared-interfaces/COECLOPi";
import useFilterGradeStore from "@/shared/features/FilterGradeSelect/useFilterGradeStore";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { notifications } from "@mantine/notifications";
import useS_CLOPIMatrixStore from "./useS_CLOPIMatrixStore";

export default function F_CLOPIMatrixUpdateRating() {
    const mutation = useM_COEGrade_CLOPIRating()
    const store = useS_CLOPIMatrixStore()
    const filterGradeStore = useFilterGradeStore()

    const subjectByGrade = useQ_COEGrade_GetDetail({
        params: `?gradeId=${filterGradeStore.state.grade?.id}`
    })

    return (
        <CustomButton
            actionType="save"
            onClick={() => {
                if (!subjectByGrade.data) return;

                const validation = validateTotalRatingPerPI(subjectByGrade.data, store.state.edited ?? {});

                if (!validation.isValid) {
                    notifications.show({
                        color: "red",
                        title: "Lỗi tỷ trọng",
                        message: `Một số PI có tổng tỷ trọng vượt quá 100%`,
                    });
                    return;
                }

                mutation.mutate(Object.values(store.state.edited!), {
                    onSuccess: () => {
                        notifications.show({
                            message: "Lưu thành công!",
                        });
                    },
                });
            }}
        />
    );
}

function validateTotalRatingPerPI(subjectList: any[], edited: Record<string, COECLOPI>): { isValid: boolean; overPI: string[] } {
    const totalByPI: Record<number, number> = {};

    subjectList.forEach(subject => {
        subject.coecGs?.flatMap((cg: any) => cg.coeclOs)?.forEach((clo: any) => {
            clo.coeclopi?.forEach((relation: any) => {
                const rating = edited[relation.id]?.rating ?? relation.rating ?? 0;
                totalByPI[relation.coepiId] = (totalByPI[relation.coepiId] || 0) + rating;
            });
        });
    });

    const overPI = Object.entries(totalByPI)
        .filter(([_, total]) => total > 100)
        .map(([piId]) => piId);

    return { isValid: overPI.length === 0, overPI };
}