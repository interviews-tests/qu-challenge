<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Paginator, { PageState } from "primevue/paginator";
import { ref, watch, onMounted } from "vue";
import { Planet } from "../types";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const loading = ref(false);
const data = ref<Planet[]>();
const count = ref(0);
const first = ref(0);
const currentPage = ref(1);

async function getData(): Promise<void> {
  loading.value = true;
  fetch(`https://swapi.dev/api/planets/?page=${currentPage.value}`)
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const finalRes = isJson ? await response.json() : null;
      if (!response.ok) {
        const error = response.status; // This could be more specific
        return Promise.reject(error);
      }
      data.value = finalRes.results;
      count.value = finalRes.count;
      loading.value = false;
    })
    .catch((error) => {
      loading.value = false;
      toast.add({
        severity: "error",
        summary: "An error ocurred!",
        detail: `${error}`,
        life: 3000,
      });
    });
}
onMounted(() => {
  getData();
});
watch(currentPage, () => {
  getData();
});
const onPaginate = (e: PageState) => (currentPage.value = e.page + 1);
</script>

<template>
  <div v-if="data?.length" class="card">
    <DataTable :value="data" tableStyle="min-width: 50rem" :loading="loading">
      <Column sortable field="name" header="Name"></Column>
      <Column sortable field="climate" header="Climate"></Column>
      <Column sortable field="terrain" header="Terrain"></Column>
      <Column sortable field="population" header="Population"></Column>
    </DataTable>
    <Paginator
      :totalRecords="count"
      v-model:first="first"
      :rows="10"
      @page="onPaginate"
      :template="{
        '640px': 'PrevPageLink CurrentPageReport NextPageLink',
        '960px':
          'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
        '1300px':
          'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        default:
          'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
      }"
    />
  </div>
  <div class="text-center" v-else>No data found!!</div>
</template>
