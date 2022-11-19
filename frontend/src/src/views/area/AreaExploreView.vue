<script lang="ts" setup>
  import PageT from "@/@acreative/vue/bootstrap/PageContainer.vue"
  import { useRouter, useRoute } from 'vue-router'
  import { ref } from 'vue';
  import { useI18n } from "vue-i18n";
  import { ELoading } from "@/@acreative/vue/modules/vue-api";
  const { t } = useI18n({ inheritLocale: true });

  const route = useRoute();
  const router = useRouter();
  
  const loading = ref<ELoading>(ELoading.idle)

</script>
<template>
  <PageT :title="t('Title')">
    INDHOLD
  </PageT>
</template>
<i18n lang="json">
{
  "da": {
    "Title" : "Navn på område"
  }
}
</i18n>