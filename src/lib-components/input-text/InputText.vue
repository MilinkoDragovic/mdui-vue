<template>
    <input
        type="text"
        :class="['md-input-text md-component', { 'md-filled': isInputFilled }]"
        :value="modelValue"
        @input="onInputChange"
    />
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";

export default defineComponent({
    name: "MdInputText",
    props: {
        modelValue: {
            type: String as PropType<String>,
            default: ""
        }
    },
    methods: {
        onInputChange(event: any): void {
            this.$emit("update:modelValue", (event.target as HTMLInputElement).value);
        }
    },
    computed: {
        isInputFilled(): any {
            return this.modelValue !== null && this.modelValue.toString().length > 0
        }
    }
});
</script>

<style lang="scss" scoped>
.md-input-text {
    margin: 0;
    padding: .5rem .5rem;
    border-radius: 0.25rem;
    font-size: 1rem;
    color: #495057;
    background: #ffffff;
    border: 1px solid #ced4da;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    appearance: none;

    &:focus {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: 0 0 0 0.2rem #a6d5fa;
        border-color: #2196F3;
    }
}

.md-fluid {
    .md-input-text {
        width: 100%;
    }
}

/* InputGroup */
.md-input-group {
    display: flex;
    align-items: stretch;
    width: 100%;
}

.md-input-group-addon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.md-input-group .md-float-label {
    display: flex;
    align-items: stretch;
    width: 100%;
}

.md-input-group .md-input-text,
.md-fluid .md-input-group .md-input-text,
.md-input-group .md-inputwrapper,
.md-fluid .md-input-group .md-input {
    flex: 1 1 auto;
    width: 1%;
}

/* Floating Label */
.md-float-label {
    display: block;
    position: relative;
}

.md-float-label label {
    position: absolute;
    pointer-events: none;
    top: 50%;
    margin-top: -.5rem;
    transition-property: all;
    transition-timing-function: ease;
    line-height: 1;
}

.md-float-label textarea ~ label {
    top: 1rem;
}

.md-float-label input:focus ~ label,
.md-float-label input.md-filled ~ label,
.md-float-label textarea:focus ~ label,
.md-float-label textarea.md-filled ~ label,
.md-float-label .md-inputwrapper-focus ~ label,
.md-float-label .md-inputwrapper-filled ~ label {
    top: -.75rem;
    font-size: 12px;
}

.md-float-label .input:-webkit-autofill ~ label {
    top: -20px;
    font-size: 12px;
}

.md-input-icon-left,
.md-input-icon-right {
    position: relative;
    display: inline-block;
}

.md-input-icon-left > i,
.md-input-icon-right > i {
    position: absolute;
    top: 50%;
    margin-top: -.5rem;
}

.md-fluid .md-input-icon-left,
.md-fluid .md-input-icon-right {
    display: block;
    width: 100%;
}

.md-float-label > label {
    left: 0.5rem;
    color: #6c757d;
    transition-duration: 0.2s;
}
</style>
