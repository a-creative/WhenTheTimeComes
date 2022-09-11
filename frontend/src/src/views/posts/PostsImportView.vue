<script lang="ts" setup>
import PageT from "@/@acreative/vue/bootstrap/PageContainer.vue"
import FormO from '@/@acreative/vue/bootstrap/Form.vue';
import { ref, onMounted } from 'vue';
import { useI18n } from "vue-i18n";
import { postStore } from "@/stores/postStore";
import { useRouter } from 'vue-router'
import { FieldDef, FieldType, ActionDef, ActionType, ActionStyle, ActionLocation } from "@/@acreative/vue/modules/vue-form"
const { t } = useI18n({ inheritLocale: true });
const router = useRouter();
const pStore = postStore();

const formInput = ref<PostCsvImportData>({
  'csvText': '',
});

const formFields: FieldDef[] = [
  {
    id: "csvText",
    type: FieldType.textarea,
    label: t('form.field.csvText.label'),
    required: true,
    rows: 8,
  }
];

const formActions: ActionDef[] = [
  {
    id: "csvTextSubmit",
    type: ActionType.submit,
    label: t('form.action.import_submit.label'),
    style: ActionStyle.primary,
  }
]

const importPosts = () => {

  pStore.import(formInput.value, () => {
      alert('The posts were imported');
  });
}

</script>
<template>
  <PageT :title="t('Title')">
    <FormO :fields="formFields" :actions="formActions" :data="formInput" :onSubmit="importPosts" />
  </PageT>
</template>
<i18n lang="json">{
  "da": {
    "Title": "Importer indlæg",
    "form": {
      "field": {
        "csvText": {
          "label": "Indsæt CSV-indhold til de indlæg der skal importeres."
        }
      },
      "action": {
        "import_submit": {
          "label": "Import"
        }
      }
    }
  },
  "en": {
    "Title": "Edit post for member update"
  }
}</i18n>