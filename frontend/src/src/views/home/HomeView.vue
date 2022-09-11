<script lang="ts" setup>
  import PageContainer from "@/components/PageContainer.vue";
  import { useI18n } from "vue-i18n";
  const { t } = useI18n({ inheritLocale: true });

</script>
<template>
  <PageContainer :title="t('Title')">
    <p>Show status here</p>
  </PageContainer>
</template>
<i18n lang="json">
{
  "da": {
    "Title": "Status"
  },
  "en": {
    "Title": "Status"
  }
}
</i18n>
