import { ObjectDirective } from 'vue';
import Helper from '../../utils/helper';

function onMouseDown(event: MouseEvent) {
    let target = event.currentTarget as any;
    let ink = getInk(target);
    if (!ink || getComputedStyle(ink, null).display === 'none') {
        return;
    }

    Helper.removeClassFromElement(ink, 'md-ink-active');

    if (!Helper.getElementHeight(ink) && !Helper.getElementWidth(ink)) {
        let dimension: number = Math.max(Helper.getElementOuterWidth(target), Helper.getElementOuterHeight(target));
        ink.style.height = ink.style.width = `${dimension}px`;
    }

    let offset = Helper.getElementOffset(target);
    let x: number = event.pageX - offset.left + document.body.scrollTop - Helper.getElementWidth(ink) / 2;
    let y: number = event.pageY - offset.top + document.body.scrollLeft - Helper.getElementHeight(ink) / 2;

    ink.style.top = `${y}px`;
    ink.style.left = `${x}px`;
    Helper.addClassToElement(ink, 'md-ink-active');
}

function getInk(element: any)   {
    for(let i = 0; i < element.children.length; i++) {
        if (typeof element.children[i].className === 'string' && element.children[i].className.indexOf('md-ink') !== -1) {
            return element.children[i];
        }
    }

    return null;
}

function bindEvents(element: any) {
    element.addEventListener('mousedown', onMouseDown);
}

function unbindEvents(element: any) {
    element.removeEventListener('mousedown', onMouseDown);
}

function create(element: HTMLElement) {
    let ink: HTMLElement = document.createElement('span');
    ink.className = 'md-ink';
    element.appendChild(ink);

    ink.addEventListener('animationend', onAnimationEnd);
}

function remove(element: HTMLElement) {
    let ink = getInk(element);
    if (ink) {
        unbindEvents(element);
        ink.removeEventListener('animationend', onAnimationEnd);
        ink.remove();
    }
}

function onAnimationEnd(event: Event) {
    Helper.removeClassFromElement(event.currentTarget as HTMLElement, 'md-ink-active');
}

const Ripple: ObjectDirective = {
    mounted(element) {
        create(element);
        bindEvents(element);
    },
    unmounted(element: HTMLElement) {
        remove(element);
    }
}

export default Ripple;