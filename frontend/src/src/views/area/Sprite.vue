<script lang="ts" setup>
	import { ref, onMounted, onUnmounted} from 'vue';
	import { useI18n } from 'vue-i18n';
	const { t } = useI18n({ inheritLocale: true });

	interface Props {
		isCollectable: boolean;
		isObstacle: boolean;
		isPlayerControlled: boolean;
        hasActions: Array<any>;
        tileSet: string;
		tileSetSize: number;
	}

	const x = ref(0);
	const y = ref(0);

	const props = withDefaults(defineProps<Props>(), {
		isCollectable: false,
        isObstacle: false,
        isPlayerControlled: false,
        hasActions: <any>[],
        tileSet: '0',
        tileSetSize: 1,
	});

	type Direction =
		'ArrowUp' |
		'ArrowDown' | 
		'ArrowLeft' |
		'ArrowRight'
	;

	const move = (e: KeyboardEvent) => {
		if ( props.isPlayerControlled) {
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

		}

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
	<div 
		:style="'position:relative; left: ' + x + 'px; top: ' + y + 'px'"
	>
		{{ props.tileSet }}
	</div>
</template>
<i18n lang="json"></i18n>
