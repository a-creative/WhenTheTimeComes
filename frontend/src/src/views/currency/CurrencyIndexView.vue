<script lang="ts" setup>
  import PageT from "@/@acreative/vue/bootstrap/PageContainer.vue"
  import { useRoute } from 'vue-router'
  import { ref } from 'vue';
  import { useI18n } from "vue-i18n";
  import TableO from "@/@acreative/vue/bootstrap/Table.vue";
import { ColumnDef } from "@tanstack/table-core";
import { Currency } from "@/types/currency";
  const { t } = useI18n({ inheritLocale: true });

  const columns: ColumnDef<Currency>[] = [
    {
      accessorKey : "unit",
      header: t('column.unit'),
    }, 
    {
      accessorKey : "exchRateDkk",
      header: t('column.exchRateDkk')
    }
  ];

</script>
<template>
  <PageT :title="t('Title')">
    <TableO :columns="columns" dataSource="/currencies" />
  </PageT>
</template>
<i18n lang="json">
{
  "da": {
    "Title" : "Valutaoversigt",
    "column" : {
      "unit" : "Enhed",
      "exchRateDkk" : "Kurs i DKK"
    }
  }
}
</i18n>