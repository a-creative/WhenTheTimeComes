<script lang="ts" setup>
import { ref} from 'vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n({ inheritLocale: true });

	interface Props {
		isCollectable: boolean;
		isObstacle: boolean;
        hasActions: Array<any>;
        tileSet: string;
		tileSetSize: number|Array<string>;
	}

	const props = withDefaults(defineProps<Props>(), {
		isCollectable: false,
        isObstacle: false,
        hasActions: <any>[],
        tileSet: '0',
        tileSetSize: 1,
	});

</script>
<template>
	<div style="background-color:red">
		<div v-if="(props.tileSetSize instanceof Array)">
			[{{ props.tileSet }}]
		</div>
		<div v-if="(!(props.tileSetSize instanceof Array))">
			{{ props.tileSet }}
		</div>
	</div>
</template>
<i18n lang="json"></i18n>
