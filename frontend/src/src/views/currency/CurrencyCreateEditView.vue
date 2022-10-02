<script lang="ts" setup>
  import PageT from "@/@acreative/vue/bootstrap/PageContainer.vue"
  import { useRouter, useRoute, RouteLocation, RouteLocationRaw } from 'vue-router'
  import { ref } from 'vue';
  import { FieldDef, FieldType, ActionType, ActionDef, ActionStyle, ActionLocation } from "@/@acreative/vue/modules/vue-form";
  import { useI18n } from "vue-i18n";
  import FormO from "@/@acreative/vue/bootstrap/Form.vue";
  import { ELoading } from "@/@acreative/vue/modules/vue-api";
  import { Currency } from "@/types/currency";
  import { getCurrencyStore } from "@/stores/currencyStore";
  const { t } = useI18n({ inheritLocale: true });

  const route = useRoute();
  const router = useRouter();
  const currencyStore = getCurrencyStore();
  
  const loading = ref<ELoading>(ELoading.idle)

  let title = t('Title create');
  if ( route.params.id ) {
    title = t('Title edit');
  }

  const formFields: FieldDef[] = [
    {
        id: "unit",
        type: FieldType.text,
        label: t('unit.label'),
        placeHolder: t('unit.placeholder')
    },
    {
        id: "exchRateDkk",
        type: FieldType.text,
        label: t('exchRateDkk.label'),
        placeHolder: t('exchRateDkk.placeholder')
    }
  ];

  const formActions: ActionDef[] = [
    {
        id : "create",
        type: ActionType.submit,
        label: t('createSubmit.text'),
        style : ActionStyle.primary,
        get loading() {
            return loading.value;
        }
    }
  ]

  const formInput = ref<Currency>({
    unit : '',
    exchRateDkk: null,
  });

  const create = () => {
    currencyStore.create( formInput.value, ( forwardToRoute:RouteLocation ) => {
      router.push( { name : "currencyIndex" } );
    })
  }

  const save = () => {

    const forwardToRoute: RouteLocationRaw = { name: "currencyIndex" };
    
    if ( route.params.id ) {
        currencyStore.update( formInput.value, () => {
          router.push( forwardToRoute );
        })
    } else {
      currencyStore.create( formInput.value, () => {
        router.push( forwardToRoute );
      })
    }
  }

</script>
<template>
  <PageT :title="title">
    <FormO 
      :actions="formActions" 
      :fields="formFields" 
      :data="formInput" 
      :onSubmit="save"
      :loading="loading ?? ELoading.idle" 
    />
  </PageT>
</template>
<i18n lang="json">
{
  "da": {
    "Title create" : "Opret valuta",
    "Title edit" : "Rediger valuta",
    "unit" : {
      "label" : "Enhed",
      "placeholder" : "Indtast en enhed for valutaen..."
    }, 
    "exchRateDkk" : {
      "label" : "Kurs",
      "placeholder" : "Indtast hvor meget 100 DKK er værd i denne valuta..."
    }, 
    "createSubmit.text" : "Opret"
  }
}
</i18n>