import {Criterion} from "../../../../shared/interfaces/criterion";

export function generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function calcRootTotal(criteria: Criterion[] | undefined | null): number {
    if (!criteria || criteria.length === 0) return 0;
    return criteria.reduce((sum, c) => sum + c.maxScore, 0);
}

export function calcChildrenTotal(children: Criterion[]): number {
    return children.reduce((sum, c) => sum + c.maxScore, 0);
}

export function validateParentChildren(
    criteria: Criterion[]
): { hasError: boolean; byId: Record<string, boolean> } {
    const byId: Record<string, boolean> = {};
    let hasError = false;

    for (const c of criteria) {
        const childTotal = calcChildrenTotal(c.children);
        const hasChildren = c.children.length > 0;
        const mismatch = hasChildren && childTotal !== c.maxScore;
        byId[c.id] = mismatch;
        if (mismatch) hasError = true;
    }

    return {hasError, byId};
}

export function deepClone(criteria: Criterion[]): Criterion[] {
    return criteria.map((c) => ({
        ...c,
        id: generateGUID(),
        children: deepClone(c.children),
    }));
}