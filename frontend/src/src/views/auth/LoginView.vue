<script setup lang="ts">
    import { RouteLocation, useRouter } from 'vue-router'
    import { useI18n } from "vue-i18n";
    import { ref } from "vue";
    import PageContainer from "@/@acreative/vue/bootstrap/PageContainer.vue";
    
    import FormO from '@/@acreative/vue/bootstrap/Form.vue';
    import { FieldDef, FieldType, ActionDef, ActionType, ActionStyle, ActionLocation } from "@/@acreative/vue/modules/vue-form"
    import { ELoading } from '@/@acreative/vue/modules/vue-api';
    import { getAuthStore } from '@/stores/authStore';

    const authStore = getAuthStore();
    const router = useRouter();

    interface FormInput {
        username: string,
        password: string,
    };
    
    const { t } = useI18n({ inheritLocale: true });

    const loading = ref<ELoading>(ELoading.idle)

    const formInput = ref<FormInput>({
        username : 'm.andersen.post@gmail.com',
        password: 'test1234',
    });

    
    const login = () => {
        authStore.login( formInput.value, ( forwardToRoute:RouteLocation ) => {
            router.push( forwardToRoute )
        })
    }

    const formFields: FieldDef[] = [
        {
            id: "username",
            type: FieldType.usernameAndEmail,
            label: t('username.label'),
            placeHolder: t('username.placeholder')
        }, {
            id: "password",
            type: FieldType.password,
            label: t('password.label'),
            placeHolder: t('password.placeholder')
        }
    ];

    const formActions: ActionDef[] = [
        {
            id : "login",
            type: ActionType.submit,
            label: t('login_submit.text'),
            style : ActionStyle.primary,
            get loading() {
                return loading.value;
            }
        },
        {
            id : "register",
            label: t('register.label'),
            linkTo: { name:'register' }, 
            location: ActionLocation.beforeForm
        }
    ]

</script>
<template>
    <PageContainer :title="t('Title')" :loading="(loading === ELoading.loading)">
        <FormO
            :fields="formFields"
            :actions="formActions"
            :data="formInput"
            :onSubmit="login"
            :loading="loading ?? ELoading.idle"
         />
    </PageContainer>
</template>
<i18n lang="json">
{
  "da": {
    "Title": "Log ind",
    "username" : {
        "label" : "Brugernavn",
        "placeholder" : "Indtast e-mail-adressen du vil bruge som brugernavn"
    },
    "password" : {
        "label" : "Adgangskode",
        "placeholder" : "Indtast adgangskoden du gerne vil bruge sammen med brugernavnet"
    },
    "login_submit" : {
        //"processing" : "Logger ind...",
        "text" : "Log ind"
    },
    "register" : {
        "label" : "Har du ikke allerede en bruger?"
    }
  }
}
</i18n>