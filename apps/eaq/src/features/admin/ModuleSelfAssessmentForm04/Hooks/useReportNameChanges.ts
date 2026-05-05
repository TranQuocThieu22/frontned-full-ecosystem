import { useState, useCallback } from "react";

export function useReportNameChanges() {
    const [reportNameChanges, setReportNameChanges] = useState<
        Map<string, string>
    >(new Map());

    const updateReportName = useCallback((rowKey: string, newName: string) => {
        setReportNameChanges((prev) => {
            const newMap = new Map(prev);
            newMap.set(rowKey, newName);
            return newMap;
        });
    }, []);

    const clearReportNameChanges = useCallback(() => {
        setReportNameChanges(new Map());
    }, []);

    const removeDuplicates = useCallback((duplicatedUids: Set<string>) => {
        setReportNameChanges((prev) => {
            const newMap = new Map(prev);
            duplicatedUids.forEach((uid) => {
                if (newMap.has(uid)) newMap.delete(uid);
            });
            return newMap;
        });
    }, []);

    return {
        reportNameChanges,
        updateReportName,
        clearReportNameChanges,
        removeDuplicates,
    };
}
