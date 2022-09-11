<script lang="ts" setup>
  import { ref, onMounted, onUpdated} from 'vue';
  import { userStore } from "@/stores/userStore";

  const uStore = userStore();

  const testReset = ref('no')

  onMounted(() => {

    uStore.resetTest(( ok:boolean ) => {
      testReset.value = ( ok ? 'no' : 'yes')
    });

  })

</script>
<template>
    <p>Is the test reset? <span id="testReset">{{ testReset }}</span></p>
</template>