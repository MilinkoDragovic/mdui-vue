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
        isInputFilled(): boolean {
            return this.modelValue !== null && this.modelValue.toString().length > 0
        }
    }
});
</script>
