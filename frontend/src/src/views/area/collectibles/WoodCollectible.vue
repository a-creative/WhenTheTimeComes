<script lang="ts" setup>

  import { ref } from 'vue';
  import { useI18n } from "vue-i18n";
  import Sprite from "@/views/area/Sprite.vue";
  const { t } = useI18n({ inheritLocale: true });
  

</script>
<template>
  <Sprite 
    isCollectible
    tileSet="W"
  />
</template>
<i18n lang="json">
</i18n>