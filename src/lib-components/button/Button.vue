<template>
    <button :class="btnClass" :disabled="disabled" v-ripple type="button">
        <slot>
            <span v-if="loading && !icon" :class="iconClass"></span>
            <span v-if="icon" :class="iconClass"></span>
            <span class="md-button-label">{{label||'&nbsp;'}}</span>
            <span v-if="badge" :class="badgeStyleClass">{{badge}}</span>
        </slot>
    </button>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ButtonClassInterface  from "./Button";
import Ripple from '../directives/ripple/ripple';

export default defineComponent({
    name: "MdButton",
    props: {
        label: {
            type: String
        },
        icon: {
            type: String
        },
        iconPos: {
            type: String,
            default: 'left'
        },
        badge: {
            type: String
        },
        badgeClass: {
            type: String,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingIcon: {
            type: String,
            default: 'pi pi-spinner pi-spin'
        }
    },
    computed: {
        btnClass() {
            const data = {
                'md-button': true,
                'md-component': true,
                'md-button-icon-only': this.icon && !this.label,
                'md-button-vertical': (this.iconPos === 'top' || this.iconPos === 'bottom') && this.label,
                'md-disabled': this.$attrs.disabled || this.loading,
                'md-button-loading': this.loading,
                'md-button-loading-label-only': this.loading && !this.icon && this.label
            } as ButtonClassInterface;

            return data;
        },
        disabled(): any {
            return this.$attrs.disabled || this.loading;
        },
        iconClass(): any {
            return [
                this.loading ? 'md-button-loading-icon ' + this.loadingIcon : this.icon,
                'md-button-icon',
                {
                    'md-button-icon-left': this.iconPos === 'left' && this.label,
                    'md-button-icon-right': this.iconPos === 'right' && this.label,
                    'md-button-icon-top': this.iconPos === 'top' && this.label,
                    'md-button-icon-bottom': this.iconPos === 'bottom' && this.label
                }
            ]
        },
        badgeStyleClass(): any {
            return [
                'md-badge md-component', this.badgeClass, 
                {
                    'md-badge-no-gutter': this.badge && String(this.badge).length === 1
                }
            ]
        },
    },
    directives: {
        'ripple': Ripple
    }
});
</script>