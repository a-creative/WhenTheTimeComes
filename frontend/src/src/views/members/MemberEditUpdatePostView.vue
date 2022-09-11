<script lang="ts" setup>
import PageT from "@/components/PageContainer.vue"
import FormO from '@/components/Form.vue';
import { ref, onMounted } from 'vue';
import { useI18n } from "vue-i18n";
import { userStore } from "@/stores/userStore";
import { memberStore } from "@/stores/memberStore";
import { useRouter } from 'vue-router'
import { FieldDef, FieldType, ActionDef, ActionType, ActionStyle, ActionLocation } from "@/modules/@acreative/vue-form"
import { api, EApiMethod, IApiPostOptions, IApiPutOptions } from "@/modules/@acreative/vue-api"
const { t } = useI18n({ inheritLocale: true });
const router = useRouter();
const uStore = userStore();
const mStore = memberStore();

enum ELoading {
  idle,
  loading,
  loaded,
  failed,
}

const loading = ref<ELoading>(ELoading.idle)

const formInput = ref<MemberUpdatePostContent>({
  'text': '',
});

const formFields: FieldDef[] = [
  {
    id: "text",
    type: FieldType.textarea,
    label: t('form.field.text.label'),
    required: true,
    rows: 8,
  }
];

const formActions: ActionDef[] = [
  {
    id: "confirmUpdateSent",
    type: ActionType.submit,
    label: t('form.action.confirm_update_sent_submit.label'),
    style: ActionStyle.primary,
    get loading() {
      return loading.value;
    }
  }
]

onMounted(() => {
  mStore.getPostContent( (content: MemberUpdatePostContent) => {
    formInput.value = content;
  });
});

const confirmUpdateSent = () => {
  loading.value = ELoading.loading;

  mStore.confirmUpdateSent(() => {
    alert('The update was confirmed sent!');
    router.push('/');
  })

}

</script>
<template>
  <PageT :title="t('Title')" :subTitle="t('SubTitle')">
    <FormO :fields="formFields" :actions="formActions" :data="formInput" :onSubmit="confirmUpdateSent"
      :loading="loading ?? ELoading.idle" />
  </PageT>
</template>
<i18n lang="json">{
  "da": {
    "Title": "Rediger indlæg til medlemsopdatering",
    "SubTitle": "Kopier \"Teksten til indlægget\" og del den på Facebook. Vælg 'Bekræft' når teksten er delt.",
    "form": {
      "field": {
        "text": {
          "label": "Teksten til indlægget"
        }
      },
      "action": {
        "confirm_update_sent_submit": {
          "label": "Bekræft"
        }
      }
    }
  },
  "en": {
    "Titel": "Edit post for member update"
  }
}</i18n>