<script lang="ts" setup>

  import { ref, onMounted, onUnmounted } from 'vue';
  import { useI18n } from "vue-i18n";
  import Sprite from "@/views/area/Sprite.vue";
  import { Direction } from '@/types/area';
  const { t } = useI18n({ inheritLocale: true });


	const x = ref(0);
	const y = ref(0);

  const emit = defineEmits(['move']);

	const move = (e: KeyboardEvent) => {
    let direction:Direction = e.key as Direction;

    const plotDim = 20;

    switch (direction) {
      case 'ArrowDown':
        y.value += plotDim;
        break;
      case 'ArrowUp':
        y.value -= plotDim;
        break;
      case 'ArrowLeft':
        x.value -= plotDim;
        break;
      case 'ArrowRight':
        x.value += plotDim;
      default:
        break;
    }

    emit('move', direction);

		e.preventDefault();
    e.stopPropagation();
		return false;
	}

  onMounted( () => {
		window.addEventListener('keydown', move)
	});

	onUnmounted( () => {
		window.removeEventListener('keydown', move)
	});

</script>
<template>
  <div :style="'position:relative; left: ' + x + 'px; top: ' + y + 'px'">
    <Sprite 
      tileSet="P"
    />
  </div>
</template>
<i18n lang="json">
</i18n>