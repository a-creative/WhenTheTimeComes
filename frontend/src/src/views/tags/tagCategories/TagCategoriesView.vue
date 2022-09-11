<script lang="ts" setup>
  import TableO from "@/@acreative/vue/bootstrap/Table.vue";
  import PageT from "@/@acreative/vue/bootstrap/PageContainer.vue"
  import { ref } from 'vue';
  import { ColumnDef} from '@tanstack/vue-table'
  import { useI18n } from "vue-i18n";
  const { t } = useI18n({ inheritLocale: true });

  const columns: ColumnDef<TagCategory>[] = [
    {
      accessorKey: "name",
      header: t('Name'),
      size: 100
    }
  ];

</script>
<template>
  <PageT :title="t('Title')">
    <TableO :columns="columns" dataSource="/tagCategories" :t="{ items: t('table.items') }" />
  </PageT>
</template>
<i18n lang="json">
{
  "da": {
    "Title": "Emnekategorier",
    "Name" : "Navn",
    "table" : {
      "items" : "emnekategorier"
    }
  },
  "en": {
    "Title": "Tag categories"
  }
}
</i18n>

