export default class Helper {

    /** Get Height of element **/
    static getElementHeight(element: HTMLElement): number {
        let elementHeight: number = element.offsetHeight,
            style: CSSStyleDeclaration = getComputedStyle(element);

        elementHeight -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
            + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

        return elementHeight;
    }

    /** Get Width of element **/
    static getElementWidth(element: HTMLElement): number {
        let elementWidth: number = element.offsetWidth,
            style: CSSStyleDeclaration = getComputedStyle(element);

        elementWidth -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
            + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

        return elementWidth;
    }

    /** Remove class from element **/
    static removeClassFromElement(element: HTMLElement, elementClassName: string): void {
        if (element.classList) {
            element.classList.remove(elementClassName)
        } else {
            element.className = element.className.replace(
                new RegExp('(^|\\b)' + elementClassName.split(' ').join('|') + '(\\b|$)', 'gi'), ' '
            );
        }
    }

    /** Add class to element **/
    static addClassToElement(element: HTMLElement, elementClassName: string): void {
        if (element.classList) {
            element.classList.add(elementClassName)
        } else {
            element.className += ' ' + elementClassName;
        }
    }

    /** Get element outer width **/
    static getElementOuterWidth(element: HTMLElement, margin?: Partial<CSSStyleDeclaration>): number {
        if (element) {
            let elementWidth: number = element.offsetWidth;

            if (margin) {
                let style: CSSStyleDeclaration = getComputedStyle(element);
                elementWidth += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
            }

            return elementWidth;
        } else {
            return 0;
        }
    }

    /** Get element outer height **/
    static getElementOuterHeight(element: HTMLElement, margin?: CSSStyleDeclaration): number {
        if (element) {
            let elementHeight = element.offsetHeight;

            if (margin) {
                let style: CSSStyleDeclaration = getComputedStyle(element);
                elementHeight += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
            }

            return elementHeight;
        } else {
            return 0;
        }
    }

    /** Get element offset **/
    static getElementOffset(element: HTMLElement): { top: number, left: number } {
        let rect: ClientRect =  element.getBoundingClientRect();

        return {
            top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
            left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
        }
    }
}