<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { MduiSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
    // components: {
  //  MduiSample,
  // }
    data: () => ({
        username: "",
        password: ""
    }),
});
</script>

<template>
  <div id="app">
    <md-input-text v-model="username" />
    <md-button label="Primary" />
    <md-button label="Primary" class="md-button-text" />
  </div>
</template>
