<script lang="ts" setup>

  import { ref } from 'vue';
  import { useI18n } from "vue-i18n";
  import Sprite from "@/views/area/Sprite.vue";
  import { Plot} from '@/types/area';
  const { t } = useI18n({ inheritLocale: true });

  interface Props {
    plot: Plot;
  }
  const props = withDefaults(defineProps<Props>(), {});

</script>
<template>
  <Sprite
    isObstacle
    tileSet="L"
    :tileSetSize="plot.contentSize"
  />
</template>
<i18n lang="json">
</i18n>