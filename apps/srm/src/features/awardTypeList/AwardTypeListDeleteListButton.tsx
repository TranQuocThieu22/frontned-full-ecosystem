"use client";

import { AwardTypeService } from "@/shared/APIs/awardTypeService";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
    values: any[];
    clearSelection: () => void;
    loading?: boolean;
    disabled?: boolean;
}

export default function AwardTypeListDeleteListButton({ values, clearSelection, loading }: Props) {
    return (
        <CustomButtonDeleteList
            loading={loading}
            count={values.length}
            onSubmit={() => {
                return AwardTypeService.deleteList(values);
            }}
            onSuccess={() => {
                clearSelection();
            }}
        />
    );
}
