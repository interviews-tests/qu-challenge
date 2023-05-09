<script setup lang="ts">
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import Planets from "./views/Planets.vue";
import Fieldset from "primevue/fieldset";
import Toast from "primevue/toast";
</script>

<template>
  <div class="surface-section px-4 py-2">
    <div class="text-700 text-center">
      <div class="text-900 font-bold text-5xl mb-3">SWAPI + Primevue</div>
    </div>
    <Fieldset legend="Planets">
      <Planets />
    </Fieldset>
  </div>
  <Toast />
</template>
