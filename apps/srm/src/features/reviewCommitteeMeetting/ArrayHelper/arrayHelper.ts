
/** - Clone all items and transform them.
 * - Useful when you need deep copy before transform.
 * - Example: cloneItemsTranform(x => ({...x, updated: true}), undefined, item => item.isEnabled === true) */
export function cloneItemsTranform<T extends Record<string, any>>(array: T[], transform: (item: T) => T, arrConcat?: T[], filter?: (item: T) => boolean): T[] {
    const valueToReturn: T[] = []
    for (const item of array) {
        if (filter ? filter(item) : true) { valueToReturn.push(transform(structuredClone(item))) }
    }
    if (arrConcat) {
        for (const item of arrConcat) {
            if (filter ? filter(item) : true) { valueToReturn.push(transform(structuredClone(item))) }
        }
    }
    return valueToReturn;
}

