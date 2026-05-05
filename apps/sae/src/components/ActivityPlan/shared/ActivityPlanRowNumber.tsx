import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { MRT_Row } from "mantine-react-table";
import { ActivityPlan } from "@/interfaces/activityPlan";

interface ActivityPlanRowNumberProps {
    row: MRT_Row<ActivityPlan>;
}

export const ActivityPlanRowNumber = ({ row }: ActivityPlanRowNumberProps) => {
    const isParent = row.depth === 0;

    return (
        <div
            style={{
                textAlign: "center",
                fontWeight: isParent ? "bold" : "normal",
                color: isParent ? colorsObject.mantineBackgroundPrimary : "#666",
            }}
        >
            {isParent
                ? row.index + 1
                : `${(row.getParentRow()?.index || 0) + 1}.${row.index + 1}`}
        </div>
    );
};
