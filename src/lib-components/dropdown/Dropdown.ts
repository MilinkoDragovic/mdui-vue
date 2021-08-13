export interface IDropdown {
    focused: boolean;
    filterValue: null;
    overlayVisible: boolean;
    overlay: HTMLElement | null;
    itemsWrapper: HTMLElement | null;
    outsideClickListener: { (event: Event): void };
    scrollHandler: { (event: Event): void };
}

export interface IContainerClass {
    'md-dropdown': boolean;
    'md-component': boolean;
    'md-input-wrapper': boolean;
    'md-disabled': boolean;
    'md-dropdown-clearable': boolean;
    'md-focus': boolean;
    'md-input-wrapper-filled': boolean;
    'md-input-wrapper-focus': boolean;
}