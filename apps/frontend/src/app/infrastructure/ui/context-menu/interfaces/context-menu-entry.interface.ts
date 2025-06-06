export interface ContextMenuEntry {
    label: string;
    icon?: string;
    action: () => Promise<void>;
    disabled?: boolean;
    enrtries?: ContextMenuEntry[]; // Optional sub-menu
}
