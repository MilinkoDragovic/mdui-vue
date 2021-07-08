<template>
    <button :class="btnClass" :disabled="disabled" type="button">
        <slot>
            <span> v-if="loading"</span>
        </slot>
    </button>
</template>

<script>
import {computed, defineComponent} from "vue";
import ButtonClassInterface  from "./Button";

export default defineComponent({
    name: "MdButton",
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        disabled:{
            type: Boolean,
            default: false
        },
        btnIconPosition: {
            type: String,
            default: 'left'
        },
        label: {
            type: String
        },
        icon: {
            type: String
        },
    },
    setup(props) {
        const btnClass = computed(() => {
            return Object<ButtonClassInterface>{
                'md-button p-component': true,
                'md-component': true,
                'md-button-icon-only': props.icon && !props.label,
                'md-button-vertical': (props.btnIconPosition === 'top' || props.btnIconPosition === 'bottom') && props.label,
                'md-disabled': this.$attrs.disabled || props.loading,
                'md-button-loading': props.loading,
                'md-button-loading-label-only': props.loading && !props.icon && props.label
            }
        })

        return {
            btnClass
        }
    }
});
</script>

<style lang="scss" scoped>

</style>