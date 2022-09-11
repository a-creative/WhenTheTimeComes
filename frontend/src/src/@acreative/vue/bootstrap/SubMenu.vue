<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import { useRouter } from 'vue-router';

  let router = useRouter();

  interface Props {
    routeTargets: SubMenuRouteTarget[]
  }

  const props = defineProps<Props>()

</script>
<template>
  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item" v-for="target in props.routeTargets">
      <router-link class="nav-link" :to="router.resolve( { name: target.routeName }).path" >{{ target.label }}</router-link>
    </li>
  </ul>
</template>