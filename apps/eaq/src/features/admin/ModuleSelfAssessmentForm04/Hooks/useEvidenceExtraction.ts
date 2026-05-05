import { useState, useEffect } from "react";

export function useEvidenceExtraction(
    description: string,
    editMode?: boolean
) {
    const [evidenceIds, setEvidenceIds] = useState<number[]>([]);

    useEffect(() => {
        if (!editMode || !description) {
            setEvidenceIds([]);
            return;
        }

        const extractedIds = Array.from(
            description.matchAll(/evidenceId=(\d+)/g)
        ).map((match) => Number(match[1]));

        setEvidenceIds(extractedIds);
    }, [description, editMode]);

    return evidenceIds;
}
