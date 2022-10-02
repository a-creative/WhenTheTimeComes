<script lang="ts" setup>
  import PageT from "@/@acreative/vue/bootstrap/PageContainer.vue"
  import { useRoute } from 'vue-router'
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
    "Title" : "Valutaoversigt"
  }
}
</i18n>