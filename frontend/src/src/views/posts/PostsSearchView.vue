<script lang="ts" setup>
  import PageT from "@/components/PageContainer.vue"
  import { ref } from 'vue';
  import { useI18n } from "vue-i18n";
  const { t } = useI18n({ inheritLocale: true });

</script>
<template>
  <PageT :title="t('Title')">
    INDHOLD
  </PageT>
</template>
<i18n lang="json">
{
  "da": {
    "Title" : "Søg i indlæg"
  },
  "en": {
    "Titel" : "Search in posts"
  }
}
</i18n>