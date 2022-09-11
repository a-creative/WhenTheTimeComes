<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import SubMenu from "@/components/SubMenu.vue"
  const { t } = useI18n({ inheritLocale: true });

  const subMenuRouteTargets:SubMenuRouteTarget[] = [
    {
      "label" : t('route.memberEditUpdatePost'),
      "routeName" : "memberEditUpdatePost"
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
      "memberEditUpdatePost" : "Rediger opdatering"
    }
  },
  "en": {
  }
}
</i18n>