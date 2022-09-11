<script lang="ts" setup>
    import { ref } from 'vue'
    import { useI18n } from "vue-i18n";
    import { RouteLocationRaw } from 'vue-router';
    import {
        useVueForm,
        FieldDef,
        FieldType,
        ActionDef,
        ActionStyle,
        ActionLocation,
        ActionType,
        EFieldType
    } from "@/@acreative/vue/modules/vue-form"
import router from "@/router/routes";

    const { t } = useI18n({ inheritLocale: true });

    enum ELoading {
        idle,
        loading,
        loaded,
        failed,
    }

    interface Props {
        fields: FieldDef[],
        actions: ActionDef[],
        data: any,
        onSubmit?: any,
        loading?: ELoading,
    }
    const props = defineProps<Props>()

    const form = useVueForm({
        get data() {
            return props.data
        },
        fields: props.fields,
        actions: props.actions,
    })

    const linkTo = ( route: RouteLocationRaw ) => {
        router.push( route )
    }

    const beforeActions = ref(form.getActionModel(ActionLocation.beforeForm).actions);
    const afterActions = ref(form.getActionModel(ActionLocation.afterForm).actions);

</script>
<template>
    <form @submit.prevent="onSubmit">
        <div class="actions mb-3" v-if="beforeActions">
            <button v-for="action in beforeActions" :key="action.id" @click="action.linkTo ? linkTo(action.linkTo) : false" :class="[ 'btn btn-' + ( action.style ?? ActionStyle.default ) ]"  :name="action.id" :type="action.type ? action.type : ActionType.default">
                {{ action.label}}
            </button>
        </div>
        <p class="mb-3" v-if="form.hasRequired()"><span class="required-guide">*</span>{{ t('required_guide') }}</p>
        <div class="mb-3" v-for="field in form.getFieldModel().fields" :key="field.id" >
            <label :for="'field-' + field.id " class="form-label">{{ field.label }}<span v-if="field.getRequired ? field.getRequired() : field.required" class="required">*</span></label>

            <input 
                v-if="[ FieldType.text , FieldType.email , FieldType.username, FieldType.usernameAndEmail, FieldType.password, FieldType.newPassword , FieldType.confirmPassword , FieldType.url , FieldType.number ].includes( field.type as EFieldType ?? FieldType.text)" 
                :type="field.getFieldType ? field.getFieldType() : 'text'"
                :autocomplete="field.getAutoComplete ? field.getAutoComplete() : ''" 
                class="form-control" 
                :id="'field-' + field.id" 
                :placeholder="field.placeHolder"
                :required="field.getRequired ? field.getRequired() : field.required" 
                v-model="data[field.id]"
            />
            
            <select v-model="data[field.id]" :required="field.getRequired ? field.getRequired() : field.required" v-if="field.type == FieldType.select" :id="'field-' + field.id" class="form-select">
                <option value="">{{ field.placeHolder ?? t('select.placerHolder')}}</option>
                <option v-for="option in field.options" :value="option.value" :selected="option.selected ?? false ">{{ option.text }}</option>
            </select>
            
            <textarea v-model="data[field.id]"
                :required="field.getRequired ? field.getRequired() : field.required" v-if="field.type == FieldType.textarea" :id="'field-' + field.id" class="form-control" :placeholder="field.placeHolder" :rows="field.rows ?? 2"></textarea>
            
            <div :required="field.getRequired ? field.getRequired() : field.required"  v-if="[ FieldType.checkbox, FieldType.radio].includes(field.type as EFieldType ?? FieldType.text)" :id="'field-' + field.id"> {{ field.type }}</div>
        </div>
        <div class="actions mt-3" v-if="afterActions">
            <button v-for="action in afterActions" :key="action.id" @click="action.linkTo ? linkTo(action.linkTo) : false" :class="[ 'btn btn-' + ( action.style ?? ActionStyle.default ) ]"  :name="action.id" :type="action.type ? action.type : ActionType.default">
                {{ action.label }}
            </button>
        </div>
    </form>
</template>
<i18n lang="json">
{
  "da": {
    "required_guide" : " = Feltet skal udfyldes.",
    "select.placeHolder" : "Vælg"
  },
  "en": {
    "select.placeHolder" : "Select"
  }
}
</i18n>
<style scoped>
    .required {
        color: red;
        display:inline-block;
        padding-left:0.25em;
    }

    .required-guide {
        color: red;
    }

    .actions > button + button {
        margin-left:0.5em;
    }

    .actions > button.btn-link {
        padding-left:0px;
        padding-right: 0px;
    }
</style>