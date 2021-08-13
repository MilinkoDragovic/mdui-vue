
<template>
    <div ref="container" :class="containerClass" @click="onClick($event)">
        <div>
            <input type="text">
        </div>
        <input type="text">
        <span></span>
        <i></i>
        <div>

        </div>
        <teleport :to="appendTarget" :disabled="appendDisabled">
            <transition name="md-connected-overlay" 
                @enter="onOverlayEnter" 
                @leave="onOverlayLeave"
                @after-leave="onOverlayAfterLeave">
                <div :ref="overlayRef" :class="panelStyleClass" v-if="overlayVisible">

                </div>
            </transition>
        </teleport>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ZIndexUtils from "../utils/ZIndexUtils";
import Helper from '../utils/helper';
import { IDropdown, IContainerClass } from './Dropdown';

export default defineComponent({
    name: "MdDropdown",
    emits: ["update:modelValue", "before-show", "before-hide", "show", "hide", "change", "filter", "focus", "blur"],
    props: {
        modelValue: null,
        options: Array,
        optionlabel: null,
        optionValue: null,
        optionDisabled: null,
        optionGroupLabel: null,
        optionGroupChildren: null,
        scrollHeight: {
            type: String,
            default: "200px"
        },
        filter: Boolean,
        filterPlaceholder: String,
        filterLocale: String,
        filterMatchMode: {
            type: String,
            default: "contains"
        },
        filterFields: {
            type: Array,
            default: null
        },
        editable: Boolean,
        placeholder: String,
        disabled: Boolean,
        dataKey: null,
        showClear: Boolean,
        inputId: String,
        tabindex: String,
        ariaLabelledBy: null,
        appendTo: {
            type: String,
            default: "body"
        },
        emptyFilterMessage: {
            type: String,
            default: null
        },
        emptyMessage: {
            type: String,
            default: null
        },
        panelClass: null,
        loading: {
            type: Boolean,
            default: false
        },
        loadingIcon: {
            type: String,
            default: "md-icon md-spinner md-spin"
        }
    },
    data(): IDropdown {
        return {
            focused: false,
            filterValue: null,
            overlayVisible: false,
            overlay: null,
            itemsWrapper: null,
            outsideClickListener: () => {},
            scrollHandler: () => {}
        }
    },
    computed: {
        containerClass(): IContainerClass {
            const classes = {
                    'md-dropdown': true,
                    'md-component': true,
                    'md-input-wrapper': true,
                    'md-disabled': this.disabled,
                    'md-dropdown-clearable': this.showClear && !this.disabled,
                    'md-focus': this.focused,
                    'md-input-wrapper-filled': this.modelValue,
                    'md-input-wrapper-focus': this.focused && this.overlayVisible
                } as IContainerClass
            
            return classes;
        },
        appendDisabled(): boolean {
            return this.appendTo === 'self';
        },
        appendTarget(): string | null {
            return this.appendDisabled ? null : this.appendTo;
        }
    },
    methods: {
        onClick() {

        },
        onOverlayEnter(element: HTMLElement) {
            ZIndexUtils.set('overlay', element, 1000)
            this.scrollValueInView();
            this.alignOverlay();
            this.bindOutsideClickListener();
        },
        scrollValueInView() {
            if (this.overlay) {
                let selectedItem: HTMLElement = Helper.findSingle(this.overlay, 'li.md-highlight') as HTMLElement;
                if (selectedItem && this.itemsWrapper) {
                    this.itemsWrapper.scrollTop = selectedItem.offsetTop;
                }
            }
        },
        overlayRef(element: HTMLElement) {
            this.overlay = element;
        },
        alignOverlay() {
            if (this.appendDisabled) {
                Helper.getRelativePosition(this.overlay as HTMLElement, this.$el);
            } else {
                if (this.overlay) {
                    this.overlay.style.minWidth = Helper.getElementOuterWidth(this.$el) + 'px';
                    Helper.getAbsolutePosition(this.overlay as HTMLElement, this.$el);
                }   
            }
        },
        bindOutsideClickListener() {
            
        },
        hide() {
           this.$emit('before-hide');
           this.overlayVisible = false; 
        },
        bindScrollListener() {
            
        }
    },
    mounted() {
    }
})
</script>