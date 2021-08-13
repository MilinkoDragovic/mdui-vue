interface ZIndexInterface {
    key: string;
    value: number;
}

function ZIndexUtil() {
    let zIndexes: Array<ZIndexInterface> = [];

    const getZIndex = (element: HTMLElement): number => {
        return element ? parseInt(element.style.zIndex, 10) || 0 : 0
    }

    const getCurrentZIndex = () => {
        return zIndexes.length > 0 ? zIndexes[zIndexes.length - 1].value : 0;
    }

    const revertZIndex = (zIndex: number) => {
        zIndexes = zIndexes.filter(obj => obj.value !== zIndex);
    }

    const generateZIndex = (key: string, baseZIndex: number) => {
        let lastZIndex = zIndexes.length > 0 ? zIndexes[zIndexes.length - 1] : { key, value: baseZIndex};
        let newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;

        zIndexes.push({key, value: newZIndex});
        return newZIndex;
    }

    return {
        get: getZIndex,
        set: (key: string, element: HTMLElement, baseZIndex: number) => {
            if (element) {
                element.style.zIndex = String(generateZIndex(key, baseZIndex));
            }
        },
        clear: (element: HTMLElement) => {
            if (element) {
                revertZIndex(getZIndex(element));
                element.style.zIndex = '';
            }
        },
        getCurrent: () => getCurrentZIndex()
    }
}

export default ZIndexUtil();