
export interface DisclosureHandler {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
}