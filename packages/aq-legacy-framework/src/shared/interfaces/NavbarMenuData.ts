export interface NavbarMenuData<TPageNameLanguageKey> {
    id?: number;
    customItemName?: string;
    itemNameLanguageKey?: TPageNameLanguageKey;
    itemType: 'title-with-dropdown' | 'section' | 'section-with-dropdown' | 'new-dimension' | 'link';
    newDimensionOnClick?: boolean;
    openDropDownOnDefault?: boolean;
    pageId?: number;
    route?: string;
    items?: NavbarMenuData<TPageNameLanguageKey>[];
    displayOrder?: string;
}