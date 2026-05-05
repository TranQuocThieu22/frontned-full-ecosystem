/**
 * Tìm thẻ <a> cha gần nhất chứa vị trí con trỏ
 */
export const GetClosestAnchor = (range: Range, container: HTMLElement): HTMLAnchorElement | null => {
    const node = range.startContainer;
    const element = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
    const anchor = element?.closest('a');
    return anchor && container.contains(anchor) ? anchor : null;
};

/**
 * Di chuyển con trỏ chuột đến ngay sau một Node cụ thể
 */
export const MoveCaretAfter = (node: Node, selection: Selection): Range => {
    const newRange = document.createRange();
    newRange.setStartAfter(node);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
    return newRange;
};

/**
 * Chuyển đổi chuỗi HTML thành DOM Node
 */
export const ParseHtmlToNode = (html: string): Node | null => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
};
