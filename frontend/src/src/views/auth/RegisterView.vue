<script setup lang="ts">

    import { useRouter, useRoute } from 'vue-router'
    import { useI18n } from "vue-i18n";
    import { ref } from "vue";
    import PageContainer from "@/@acreative/vue/bootstrap/PageContainer.vue";

    import FormO from '@/@acreative/vue/bootstrap/Form.vue';
    import { FieldDef, FieldType, ActionDef, ActionType, ActionStyle, ActionLocation } from "@/@acreative/vue/modules/vue-form"

    import { userStore } from '@/stores/userStore';

    const authStore = userStore();

    const router = useRouter();

    const { t } = useI18n({ inheritLocale: true });

    const formInput = ref<RegisterUser>({
        name: 'Maya Kathrine Andersen',
        username : 'm.andersen.post@gmail.com',
        password: 'test1234',
        password_confirmation: 'test1234'
    });

    const register = () => {
        authStore.register( formInput.value, () => {
            router.push({ 'name' : 'login' });
        });
    }

    const formFields: FieldDef[] = [
        {
            id: "name",
            type: FieldType.text,
            label: t('name.label'),
            placeHolder: t('name.placeholder'),
            required: true
        },
        {
            id: "username",
            type: FieldType.usernameAndEmail,
            label: t('email.label'),
            placeHolder: t('email.placeholder')
        }, {
            id: "password",
            type: FieldType.newPassword,
            label: t('password.label'),
            placeHolder: t('password.placeholder')
        }, {
            id: "password_confirmation",
            type: FieldType.confirmPassword,
            label: t('confirmPassword.label'),
            placeHolder: t('confirmPassword.placeholder')
        }
    ];

    const formActions: ActionDef[] = [
        {
            id : "register",
            type: ActionType.submit,
            label: t('registerSubmit.text'),
            style : ActionStyle.primary,
        },
        {
            id : "login",
            label: t('alreadyRegisteredSubmit.label'),
            linkTo: { name:'login' }, 
            location: ActionLocation.beforeForm
        }
    ]

</script>
<template>
    <PageContainer :title="t('title')" :loading="false">
        <FormO
            :fields="formFields"
            :actions="formActions"
            :data="formInput"
            :onSubmit="register"
         />
    </PageContainer>
</template>
<i18n lang="json">
{
  "da": {
    "title": "Registrer",
    "name" : {
        "label" : "Navn",
        "placeholder" : "Indtast navn"
    },
    "email" : {
        "label" : "E-mail",
        "placeholder" : "Indtast e-mail-adressen du vil bruge som brugernavn"
    },
    "password" : {
        "label" : "Adgangskode",
        "placeholder" : "Indtast adgangskoden du gerne vil bruge sammen med brugernavnet"
    }
    ,
    "confirmPassword" : {
        "label" : "Bekræft adgangskode",
        "placeholder" : "Indtast adgangskoden igen"
    },
    "registerSubmit" : {
        "processing" : "Opretter...",
        "text" : "Opret bruger"
    },
    "alreadyRegisteredSubmit" : {
        "label" : "Har du allerede en bruger?"
    }
  }
}
</i18n>