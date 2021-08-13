import { IDimensions } from "./Util";

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

    /** Get single element **/
    static findSingle(element: HTMLElement, selector: string): any {
        return element.querySelector(selector);
    }

    /** Get viewport of the document **/
    static getViewport(): { width: number, height: number } {
        let documentWindow = window,
            doc = document,
            docElement = doc.documentElement,
            docBody = doc.getElementsByTagName('body')[0],
            width = documentWindow.innerWidth || docElement.clientWidth || docBody.clientWidth,
            height = documentWindow.innerHeight || docElement.clientHeight || docBody.clientHeight;

        return { width, height };
    }

    /**
     * Get hidden elements dimensions
     * @param element 
     * @param target 
     */
    static getHiddenElementDimensions(element: HTMLElement) {
        let dimensions: IDimensions = {
            width: 0,
            height: 0
        };
        element.style.visibility = "hidden";
        element.style.display = "block";
        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;
        element.style.display = "none";
        element.style.visibility = "visible";

        return dimensions;
     }

    /**
     * Get element relative position
     * @param element 
     * @param target 
     */
    static getRelativePosition(element: HTMLElement, target: any) {
        let elementDimensions: IDimensions = element.offsetParent ? 
            { 
                width: element.offsetWidth, 
                height: element.offsetHeight
            } :
            this.getHiddenElementDimensions(element);

        const targetHeight = target.offsetHeight, targetOffset = target.getBoundingClientRect(),
            viewport = this.getViewport();
        let top, left;

        if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height) {
            top = -1 * (elementDimensions.height);
            element.style.transformOrigin = "bottom";

            if (targetOffset.top + top < 0) {
                top= -1 * targetOffset.top;
            }
        } else {
            top = targetHeight;
            element.style.transformOrigin = 'top';
        }

        if (elementDimensions.width > viewport.width) {
            left = targetOffset.left * -1;
        } else if ((targetOffset.left + elementDimensions.width) > viewport.width) {
            left = (targetOffset.left + elementDimensions.width + viewport.width) * -1;
        } else {
            left = 0;
        }

        element.style.top = `${top}px`;
        element.style.left = `${left}px`;
    }

    /**
     * Get absolute position for element
     * @param element 
     * @param target 
     */
    static getAbsolutePosition(element: HTMLElement, target: any) {
        let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element),
        elementOuterHeight = elementDimensions.height,
        elementOuterWidth = elementDimensions.width,
        targetOuterHeight = target.offsetHeight,
        targetOuterWidth = target.offsetWidth,
        targetOffset = target.getBoundingClientRect(),
        windowScrollTop = this.getWindowScrollTop(),
        windowScrollLeft = this.getWindowScrollLeft(),
        viewport = this.getViewport(),
        top, left;

        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
            element.style.transformOrigin = 'bottom';

            if (top < 0) {
                top = windowScrollTop;
            }
        } else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
            element.style.transformOrigin = 'top';
        }

        if (targetOffset.left + elementOuterWidth > viewport.width) {
            left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
        } else {
            left = targetOffset.left + windowScrollLeft;
        }

        element.style.top = `${top}px`;
        element.style.left = `${left}px`;
    }

    /**  Get scroll top of window **/
    static getWindowScrollTop(): number {
        let doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }

    /**  Get scroll left of window **/
    static getWindowScrollLeft(): number {
        let doc = document.documentElement;
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    }
}