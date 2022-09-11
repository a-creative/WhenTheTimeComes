<script lang="ts" setup>
import { onMounted, onUpdated } from "vue";
import { useI18n } from "vue-i18n";
import { userStore } from "@/stores/userStore";

const { t } = useI18n({ inheritLocale: true });
const store = userStore();

interface Props {
  title: string,
  subTitle?: string,
  loading?: boolean,
}

const props = defineProps<Props>()

const onMountedOrUpdated =  () => {
  window.document.title = t( props.title ) + ' | Post mom';
};

onMounted( () => {
  onMountedOrUpdated();
})

onUpdated( () => {
  onMountedOrUpdated();
})

enum ELoading {
    idle,
    loading,
    loaded,
    failed,
}

</script>

<template>
  <div class="page-container">
    <h1>{{ props.title }} <font-awesome-icon v-if="( store.loading === ELoading.loading )" icon="sync" /></h1>
    <p v-if="props.subTitle">{{ props.subTitle }}</p>
    <slot></slot>
  </div>
</template>

<i18n lang="json">
{
  "da": {},
  "en": {}
}
</i18n>

<style lang="less">
</style>
