
<template>
    <div ref="container" :class="containerClass" @click="onClick($event)">
    
        <div class="p-hidden-accessible">
            <input ref="focusInput" type="text" :id="inputId" readonly :disabled="disabled" @focus="onFocus" @blur="onBlur" @keydown="onKeyDown" :tabindex="tabindex"
                aria-haspopup="true" :aria-expanded="overlayVisible" :aria-labelledby="ariaLabelledBy"/>
        </div>
    
        <input v-if="editable" type="text" class="p-dropdown-label p-inputtext" :disabled="disabled" @focus="onFocus" @blur="onBlur" :placeholder="placeholder" :value="editableInputValue" @input="onEditableInput"
            aria-haspopup="listbox" :aria-expanded="overlayVisible">
    
        <span v-if="!editable" :class="labelClass">
            <slot name="value" :value="modelValue" :placeholder="placeholder">{{ label || 'empty' }}</slot>
        </span>

        <i v-if="showClear && modelValue != null" class="p-dropdown-clear-icon pi pi-times" @click="onClearClick($event)"></i>

        <div class="p-dropdown-trigger" role="button" aria-haspopup="listbox" :aria-expanded="overlayVisible">
            <slot name="indicator">
                <span :class="dropdownIconClass"></span>
            </slot>
        </div>

        <Teleport :to="appendTarget" :disabled="appendDisabled">
            <transition name="p-connected-overlay" @enter="onOverlayEnter" @leave="onOverlayLeave" @after-leave="onOverlayAfterLeave">
                <div :ref="overlayRef" :class="panelStyleClass" v-if="overlayVisible" @click="onOverlayClick">
                    <slot name="header" :value="modelValue" :options="visibleOptions"></slot>
                    <div class="p-dropdown-header" v-if="filter">
                        <div  class="p-dropdown-filter-container">
                            <input type="text" ref="filterInput" v-model="filterValue" autoComplete="off" class="p-dropdown-filter p-inputtext p-component" :placeholder="filterPlaceholder" @keydown="onFilterKeyDown"  @input="onFilterChange"/>
                            <span class="p-dropdown-filter-icon pi pi-search"></span>
                        </div>
                    </div>
                    <div :ref="itemsWrapperRef" class="p-dropdown-items-wrapper" :style="{'max-height': virtualScrollerDisabled ? scrollHeight : ''}">
                        <VirtualScroller :ref="virtualScrollerRef" v-bind="virtualScrollerOptions" :items="visibleOptions" :style="{'height': scrollHeight}" :disabled="virtualScrollerDisabled">
                            <template v-slot:content="{ styleClass, contentRef, items, getItemOptions }">
                                <ul :ref="contentRef" :class="['p-dropdown-items', styleClass]" role="listbox">
                                    <template v-if="!optionGroupLabel">
                                        <li v-for="(option, i) of items" :class="['p-dropdown-item', {'p-highlight': isSelected(option), 'p-disabled': isOptionDisabled(option)}]" v-ripple
                                            :key="getOptionRenderKey(option)" @click="onOptionSelect($event, option)" role="option" :aria-label="getOptionLabel(option)" :aria-selected="isSelected(option)">
                                            <slot name="option" :option="option" :index="getOptionIndex(i, getItemOptions)">{{getOptionLabel(option)}}</slot>
                                        </li>
                                    </template>
                                    <template v-else>
                                        <template v-for="(optionGroup, i) of items" :key="getOptionGroupRenderKey(optionGroup)">
                                            <li  class="p-dropdown-item-group">
                                                <slot name="optiongroup" :option="optionGroup" :index="getOptionIndex(i, getItemOptions)">{{getOptionGroupLabel(optionGroup)}}</slot>
                                            </li>
                                            <li v-for="(option, i) of getOptionGroupChildren(optionGroup)" :class="['p-dropdown-item', {'p-highlight': isSelected(option), 'p-disabled': isOptionDisabled(option)}]" v-ripple
                                                :key="getOptionRenderKey(option)" @click="onOptionSelect($event, option)" role="option" :aria-label="getOptionLabel(option)" :aria-selected="isSelected(option)">
                                                <slot name="option" :option="option" :index="getOptionIndex(i, getItemOptions)">{{getOptionLabel(option)}}</slot>
                                            </li>
                                        </template>
                                    </template>
                                    <li v-if="filterValue && (!items || (items && items.length === 0))" class="p-dropdown-empty-message">
                                        <slot name="emptyfilter">{{emptyFilterMessageText}}</slot>
                                    </li>
                                    <li v-else-if="(!options || (options && options.length === 0))" class="p-dropdown-empty-message">
                                        <slot name="empty">{{emptyMessageText}}</slot>
                                    </li>
                                </ul>
                            </template>
                            <template v-slot:loader="{ options }" v-if="$slots.loader">
                                <slot name="loader" :options="options"></slot>
                            </template>
                        </VirtualScroller>
                    </div>
                    <slot name="footer" :value="modelValue" :options="visibleOptions"></slot>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ZIndexUtils from "../utils/ZIndexUtils";
import Helper from '../utils/helper';
import OverlayEventBus from '../utils/OverlayEventBus';
import Ripple from "../directives/ripple/ripple";
import { IDropdown, IContainerClass } from './Dropdown';
import ObjectUtils from '../utils/ObjectUtils';

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
        optionLabel: null,
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
        },
        equalityKey(): any {
            return this.optionValue ? null : this.dataKey;
        },
    },
    methods: {
         getOptionLabel(option: any) {
            return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
        },
        getOptionValue(option: any) {
            return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
        },
        getOptionRenderKey(option: any) {
            return this.dataKey ? ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option);
        },
        isOptionDisabled(option: any) {
            return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
        },
        getOptionGroupRenderKey(optionGroup: any) {
            return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
        },
        getOptionGroupLabel(optionGroup: any) {
            return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
        },
        getOptionGroupChildren(optionGroup: any) {
            return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
        },
        getSelectedOption() {
            let index = this.getSelectedOptionIndex();
            return index !== -1 ? (this.optionGroupLabel ? this.getOptionGroupChildren(this.options[index.group])[index.option]: this.options[index]) : null;
        },
        getSelectedOptionIndex() {
            if (this.modelValue != null && this.options) {
                if (this.optionGroupLabel) {
                    for (let i = 0; i < this.options.length; i++) {
                        let selectedOptionIndex = this.findOptionIndexInList(this.modelValue, this.getOptionGroupChildren(this.options[i]));
                        if (selectedOptionIndex !== -1) {
                            return {group: i, option: selectedOptionIndex};
                        }
                    }
                }
                else {
                    return this.findOptionIndexInList(this.modelValue, this.options);
                }
            }

            return -1;
        },
        findOptionIndexInList(value: any, list: any) {
            for (let i = 0; i < list.length; i++) {
                if ((ObjectUtils.equals(value, this.getOptionValue(list[i]), this.equalityKey))) {
                    return i;
                }
            }

            return -1;
        },
        isSelected(option: any) {
            return ObjectUtils.equals(this.modelValue, this.getOptionValue(option), this.equalityKey);
        },
        show() {
            this.$emit('before-show');
            this.overlayVisible = true;
        },
        hide() {
            this.$emit('before-hide');
            this.overlayVisible = false;
        },
        onFocus(event: any) {
            this.focused = true;
            this.$emit('focus', event);
        },
        onBlur(event: any) {
            this.focused = false;
            this.$emit('blur', event);
        },
        onKeyDown(event: any) {
            switch(event.which) {
                //down
                case 40:
                    this.onDownKey(event);
                break;

                //up
                case 38:
                    this.onUpKey(event);
                break;

                //space
                case 32:
                    if (!this.overlayVisible) {
                        this.show();
                        event.preventDefault();
                    }
                break;

                //enter and escape
                case 13:
                case 27:
                    if (this.overlayVisible) {
                        this.hide();
                        event.preventDefault();
                    }
                break;

                //tab
                case 9:
                    this.hide();
                break;

                default:
                    this.search(event);
                break;
            }
        },
        onFilterKeyDown(event: any) {
            switch (event.which) {
                //down
                case 40:
                    this.onDownKey(event);
                    break;

                //up
                case 38:
                    this.onUpKey(event);
                    break;

                //enter and escape
                case 13:
                case 27:
                    this.overlayVisible = false;
                    event.preventDefault();
                break;

                default:
                break;
            }
        },
        onDownKey(event: any) {
            if (this.visibleOptions) {
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                }
                else {
                    let nextOption = this.visibleOptions && this.visibleOptions.length > 0 ? this.findNextOption(this.getSelectedOptionIndex()) : null;
                    if (nextOption) {
                        this.updateModel(event, this.getOptionValue(nextOption));
                    }
                }
            }

            event.preventDefault();
        },
        onUpKey(event) {
            if (this.visibleOptions) {
                let prevOption = this.findPrevOption(this.getSelectedOptionIndex());
                if (prevOption) {
                    this.updateModel(event, this.getOptionValue(prevOption));
                }
            }

            event.preventDefault();
        },
        findNextOptionInList(list?: any, index?: any) {
                let i = index + 1;
                if (i === list.length) {
                    return null;
                }
                let option = list[i];
                if (this.isOptionDisabled(option))
                    return this.findNextOptionInList(i);
                else
                    return option;
        },
        findNextOption(index: any) {
            if (this.optionGroupLabel) {
                let groupIndex = index === -1 ? 0 : index.group;
                let optionIndex = index === -1 ? -1 : index.option;
                let option = this.findNextOptionInList(this.getOptionGroupChildren(this.visibleOptions[groupIndex]), optionIndex);

                if (option)
                    return option;
                else if ((groupIndex + 1) !== this.visibleOptions.length)
                    return this.findNextOption({group: (groupIndex + 1), option: -1});
                else
                    return null;
            }
            else {
                return this.findNextOptionInList(this.visibleOptions, index);
            }
        },
        findNextOptionInList(list, index) {
                let i = index + 1;
                if (i === list.length) {
                    return null;
                }

                let option = list[i];
                if (this.isOptionDisabled(option))
                    return this.findNextOptionInList(i);
                else
                    return option;
        },
        findPrevOption(index) {
            if (index === -1) {
                return null;
            }

            if (this.optionGroupLabel) {
                let groupIndex = index.group;
                let optionIndex = index.option;
                let option = this.findPrevOptionInList(this.getOptionGroupChildren(this.visibleOptions[groupIndex]), optionIndex);

                if (option)
                    return option;
                else if (groupIndex > 0)
                    return this.findPrevOption({group: (groupIndex - 1), option: this.getOptionGroupChildren(this.visibleOptions[groupIndex - 1]).length});
                else
                    return null;
            }
            else {
                return this.findPrevOptionInList(this.visibleOptions, index);
            }
        },
        findPrevOptionInList(list, index) {
            let i = index - 1;
            if (i < 0) {
                return null;
            }

            let option = list[i];
            if (this.isOptionDisabled(option))
                return this.findPrevOption(i);
            else
                return option;
        },
        onClearClick(event) {
            this.updateModel(event, null);
        },
        onClick(event) {
            if (this.disabled || this.loading) {
                return;
            }

            if (DomHandler.hasClass(event.target, 'p-dropdown-clear-icon') || event.target.tagName === 'INPUT') {
                return;
            }
            else if (!this.overlay || !this.overlay.contains(event.target)) {
                if (this.overlayVisible)
                    this.hide();
                else
                    this.show();

                this.$refs.focusInput.focus();
            }
        },
        onOptionSelect(event, option) {
            let value = this.getOptionValue(option);
            this.updateModel(event, value);
            this.$refs.focusInput.focus();

            setTimeout(() => {
                this.hide();
            }, 200);
        },
        onEditableInput(event) {
            this.$emit('update:modelValue', event.target.value);
        },
        onOverlayEnter(el) {
            ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
            this.scrollValueInView();
            this.alignOverlay();
            this.bindOutsideClickListener();
            this.bindScrollListener();
            this.bindResizeListener();

            if (this.filter) {
                this.$refs.filterInput.focus();
            }

            this.$emit('show');
        },
        onOverlayLeave() {
            this.unbindOutsideClickListener();
            this.unbindScrollListener();
            this.unbindResizeListener();
            this.$emit('hide');
            this.itemsWrapper = null;
            this.overlay = null;
        },
        onOverlayAfterLeave(el) {
            ZIndexUtils.clear(el);
        },
        alignOverlay() {
            if (this.appendDisabled) {
                DomHandler.relativePosition(this.overlay, this.$el);
            }
            else {
                this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$el) + 'px';
                DomHandler.absolutePosition(this.overlay, this.$el);
            }
        },
        updateModel(event, value) {
            this.$emit('update:modelValue', value);
            this.$emit('change', {originalEvent: event, value: value});
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.overlayVisible && this.overlay && !this.$el.contains(event.target) && !this.overlay.contains(event.target)) {
                        this.hide();
                    }
                };
                document.addEventListener('click', this.outsideClickListener);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        },
        bindScrollListener() {
            if (!this.scrollHandler) {
                this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, () => {
                    if (this.overlayVisible) {
                        this.hide();
                    }
                });
            }

            this.scrollHandler.bindScrollListener();
        },
        unbindScrollListener() {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        },
        bindResizeListener() {
            if (!this.resizeListener) {
                this.resizeListener = () => {
                    if (this.overlayVisible && !DomHandler.isAndroid()) {
                        this.hide();
                    }
                };
                window.addEventListener('resize', this.resizeListener);
            }
        },
        unbindResizeListener() {
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizeListener);
                this.resizeListener = null;
            }
        },
        search(event) {
            if (!this.visibleOptions) {
                return;
            }

            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            const char = String.fromCharCode(event.keyCode);
            this.previousSearchChar = this.currentSearchChar;
            this.currentSearchChar = char;

            if (this.previousSearchChar === this.currentSearchChar)
                this.searchValue = this.currentSearchChar;
            else
                this.searchValue = this.searchValue ? this.searchValue + char : char;

            if (this.searchValue) {
                let searchIndex = this.getSelectedOptionIndex();
                let newOption = this.optionGroupLabel ? this.searchOptionInGroup(searchIndex) : this.searchOption(++searchIndex);
                if (newOption) {
                    this.updateModel(event, this.getOptionValue(newOption));
                }
            }

            this.searchTimeout = setTimeout(() => {
                this.searchValue = null;
            }, 250);
        },
        searchOption(index) {
            let option;

            if (this.searchValue) {
                option = this.searchOptionInRange(index, this.visibleOptions.length);

                if (!option) {
                    option = this.searchOptionInRange(0, index);
                }
            }

            return option;
        },
        searchOptionInRange(start, end) {
            for (let i = start; i < end; i++) {
                let opt = this.visibleOptions[i];
                if (this.matchesSearchValue(opt)) {
                    return opt;
                }
            }

            return null;
        },
        searchOptionInGroup(index) {
            let searchIndex = index === -1 ? {group: 0, option: -1} : index;

            for (let i = searchIndex.group; i < this.visibleOptions.length; i++) {
                let groupOptions = this.getOptionGroupChildren(this.visibleOptions[i]);
                for (let j = (searchIndex.group === i ? searchIndex.option + 1 : 0); j < groupOptions.length; j++) {
                    if (this.matchesSearchValue(groupOptions[j])) {
                        return groupOptions[j];
                    }
                }
            }

            for (let i = 0; i <= searchIndex.group; i++) {
                let groupOptions = this.getOptionGroupChildren(this.visibleOptions[i]);
                for (let j = 0; j < (searchIndex.group === i ? searchIndex.option: groupOptions.length); j++) {
                    if (this.matchesSearchValue(groupOptions[j])) {
                        return groupOptions[j];
                    }
                }
            }

            return null;
        },
        matchesSearchValue(option) {
            let label = this.getOptionLabel(option).toLocaleLowerCase(this.filterLocale);
            return label.startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
        },
        onFilterChange(event) {
            this.$emit('filter', {originalEvent: event, value: event.target.value});
            if (this.overlayVisible) {
                this.alignOverlay();
            }
        },
        overlayRef(el) {
            this.overlay = el;
        },
        itemsWrapperRef(el) {
            this.itemsWrapper = el;
        },
        scrollValueInView() {
            if (this.overlay) {
                let selectedItem = DomHandler.findSingle(this.overlay, 'li.p-highlight');
                if (selectedItem) {
                    this.itemsWrapper.scrollTop = selectedItem.offsetTop;
                }
            }
        },
        onOverlayClick(event: any) {
            OverlayEventBus.emit('overlay-click', {
                originalEvent: event,
                target: this.$el
            });
        },
    },
    mounted() {
    },
    directives: {
        'ripple': Ripple
    }
})
</script>