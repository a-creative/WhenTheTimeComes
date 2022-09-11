<script lang="ts" setup>
import PageT from "@/@acreative/vue/bootstrap/PageContainer.vue"
import FormO from '@/@acreative/vue/bootstrap/Form.vue';
import { FieldDef, FieldType } from '@/@acreative/vue/modules/vue-form'

import { useI18n } from "vue-i18n";
import { onMounted, ref } from 'vue';
const { locale, t } = useI18n({ inheritLocale: true });

const formFields: FieldDef[] = [
    {
        id: "name",
        label: t('formField.name.label'),
        type: FieldType.text,
        required: true,
    },
    {
        id: "category_id",
        label: t('formField.category.label'),
        type: FieldType.select,
        required: true,
        placeHolder: t('formField.category.placeHolder'),
        options: [
            {
                'value': 1,
                'text': 'Nr 1'
            },
            {
                'value': 2,
                'text': 'Nr 2'
            }
        ]
    }, {
        id: "description",
        label: t('formField.description.label'),
        type: FieldType.textarea,
        placeHolder: t('formField.description.placeHolder')
    }
];

const formInput = ref<Tag>({
    id: null,
    name: '',
    category_id: null,
});

</script>
<template>
    <PageT :title="t('title')">
        <FormO :fields="formFields" :data="formInput" />
    </PageT>
</template>
<i18n lang="json">{
    "da": {
        "title": "Formular",
        "formField": {
            "name": {
                "label": "Navn"
            },
            "category": {
                "label": "Kategori",
                "placeHolder": "Vælg kategori"
            },
            "description": {
                "label": "Beskrivelse",
                "placeHolder": "Skriv en tekst"
            }
        }
    },
    "en": {
        "title": "Form"
    }
}</i18n>
<style>
</style>