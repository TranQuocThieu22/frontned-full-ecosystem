import React, { ReactNode } from "react"

/**
 * Recursively applies `readOnly` prop to all form input children.
 * Respects inputs that self-set readOnly (won't override).
 */
export function applyReadOnlyToChildren(children: ReactNode, readOnlyState?: boolean): ReactNode {
    return applyReadOnly(children, readOnlyState)
}

function applyReadOnly(children: ReactNode, readOnlyState?: boolean): ReactNode {
    return (
        children &&
        // React.Children.map already skips null/undefined/false
        React.Children.map(children, (child) => {
            if (!child || typeof child !== "object") return child
            if (!("props" in child)) return child

            const element = child as React.ReactElement<any>
            const props = element.props

            // Fragment: recurse into children only
            if (element.type === React.Fragment) {
                return React.cloneElement(element, {
                    children: applyReadOnly(props.children, readOnlyState),
                })
            }

            const newProps: Record<string, unknown> = { ...props }

            // Don't override an explicitly-set readOnly
            if (!("readOnly" in props)) {
                newProps.readOnly = readOnlyState
            }

            if (props.children) {
                newProps.children = applyReadOnly(props.children, readOnlyState)
            }

            return React.cloneElement(element, newProps)
        })
    )
}
