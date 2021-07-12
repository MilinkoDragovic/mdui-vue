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
        btnClass(): any {
            const data =  {
                'md-button': true,
                'md-component': true,
                'md-button-icon-only': this.icon && !this.label,
                'md-button-vertical': (this.iconPos === 'top' || this.iconPos === 'bottom') && this.label,
                'md-disabled': this.$attrs.disabled || this.loading,
                'md-button-loading': this.loading,
                'md-button-loading-label-only': this.loading && !this.icon && this.label
            }

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
                'md-badge md-component', this.badgeClass, {
                'md-badge-no-gutter': this.badge && String(this.badge).length === 1
            }]
        },
    },
    directives: {
        'ripple': Ripple
    }
});
</script>

<style lang="scss">

.md-component {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    font-weight: normal;
}

.md-button {
    color: #ffffff;
    background: #2196F3;
    border: 1px solid #2196F3;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    border-radius: 3px;
}


.md-ripple {
   overflow: hidden; 
   position: relative;
}

.md-ink {
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 100%;
    transform: scale(0);
}
  
.md-ink-active {
    animation: ripple 0.4s linear;
}

.md-ripple-disabled .md-ink {
    display: none !important;
}
  
@keyframes ripple {  
    100% {
        opacity: 0;
        transform: scale(2.5);
    }
}
.md-button {
    margin: 0;
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    vertical-align: bottom;
    text-align: center;
    overflow: hidden;
    position: relative;
}

.md-button-label {
    flex: 1 1 auto;
}

.md-button-icon-right {
    order: 1;
}

.md-button:disabled {
    cursor: default;
}

.md-button-icon-only {
    justify-content: center;
}

.md-button-icon-only .md-button-label {
    visibility: hidden;
    width: 0;
    flex: 0 0 auto;
}

.md-button-vertical {
    flex-direction: column;
}

.md-button-icon-bottom {
    order: 2;
}

.md-buttonset .md-button {
    margin: 0;
}

.md-buttonset .md-button:not(:last-child) {
    border-right: 0 none;
}

.md-buttonset .md-button:not(:first-of-type):not(:last-of-type) {
    border-radius: 0;
}

.md-buttonset .md-button:first-of-type {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.md-buttonset .md-button:last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.md-buttonset .md-button:focus {
    position: relative;
    z-index: 1;
}

.md-button-label {
    transition: all .2s;
}
</style>