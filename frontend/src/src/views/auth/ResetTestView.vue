<script lang="ts" setup>
  import { ref, onMounted, onUpdated} from 'vue';
  import { getAuthStore } from "@/stores/authStore";

  const authStore = getAuthStore();

  const testReset = ref('no')

  onMounted(() => {

    authStore.resetTest(( ok:boolean ) => {
      testReset.value = ( ok ? 'no' : 'yes')
    });

  })

</script>
<template>
    <p>Is the test reset? <span id="testReset">{{ testReset }}</span></p>
</template>