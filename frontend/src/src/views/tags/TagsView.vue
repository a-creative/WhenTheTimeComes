<script lang="ts" setup>
  import TableO from "@/components/Table.vue";
  import PageT from "@/components/PageContainer.vue"
  import { ref } from 'vue';
  import { ColumnDef} from '@tanstack/vue-table'
  import { useI18n } from "vue-i18n";
  const { t } = useI18n({ inheritLocale: true });

  const columns: ColumnDef<Tag>[] = [
    {
      accessorKey: "name",
      header: t('Name'),
      size: 100
    }
  ];

</script>
<template>
  <PageT :title="t('Title')">
    <TableO :columns="columns" dataSource="/tags" :t="{ items: t('table.items') }" />
  </PageT>
</template>
<i18n lang="json">
{
  "da": {
    "Title": "Emner",
    "Name" : "Navn",
    "table" : {
      "items" : "emner"
    }
  },
  "en": {
    "Title": "Tags"
  }
}
</i18n>
