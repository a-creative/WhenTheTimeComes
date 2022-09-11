<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import SubMenu from "@/@acreative/vue/bootstrap/SubMenu.vue"
  const { t } = useI18n({ inheritLocale: true });

  const subMenuRouteTargets:SubMenuRouteTarget[] = [
    {
      "label" : t('route.postsImport'),
      "routeName" : "postsImport"
    }
  ];

</script>
<template>
  <SubMenu 
    :routeTargets="subMenuRouteTargets"
  />
  <router-view></router-view>
</template>
<i18n lang="json">
{
  "da": {
    "route" : {
      "postsImport" : "Importer"
    }
  },
  "en": {
  }
}
</i18n>