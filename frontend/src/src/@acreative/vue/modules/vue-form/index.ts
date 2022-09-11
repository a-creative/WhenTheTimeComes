/* The available custom field types */

import { RouteLocationRaw } from "vue-router";


export enum EActionType {
    submit = "submit",
    button = "button",
    default = "button"
}

export class ActionType {
    public static submit:EActionType = EActionType.submit;
    public static button:EActionType = EActionType.button;
    public static default:EActionType = EActionType.default;
}

export enum EActionStyle {
    primary = 'primary',
    default = 'link'
}

export class ActionStyle {
    public static primary:EActionStyle = EActionStyle.primary;
    public static default:EActionStyle = EActionStyle.default;
}

export enum EActionLocation {
    beforeForm = "beforeForm",
    afterForm = "afterForm",
    floating = "floating"
}

export class ActionLocation {
    public static beforeForm:EActionLocation = EActionLocation.beforeForm;
    public static afterForm:EActionLocation = EActionLocation.afterForm;
    public static floating:EActionLocation = EActionLocation.floating;
    public static default:EActionLocation = EActionLocation.afterForm;
}

export interface ActionDef {
    id: string,
    label: string,
    type?: ActionType,
    style?: ActionStyle,
    linkTo? : RouteLocationRaw,
    location?: ActionLocation,
    loading?: ELoading,
}

export enum EFieldType {
    text,
    textarea,
    select,
    username,
    usernameAndEmail,
    password,
    newPassword,
    confirmPassword,
    number,
    email,
    url,
    checkbox,
    radio
}

export class FieldType {
    public static text:EFieldType = EFieldType.text;
    public static textarea:EFieldType = EFieldType.textarea;
    public static select:EFieldType = EFieldType.select;
    public static username:EFieldType = EFieldType.username;
    public static usernameAndEmail:EFieldType = EFieldType.usernameAndEmail;
    public static password:EFieldType = EFieldType.password;
    public static newPassword:EFieldType = EFieldType.newPassword;
    public static confirmPassword:EFieldType = EFieldType.confirmPassword;
    public static number:EFieldType = EFieldType.number;
    public static email:EFieldType = EFieldType.email;
    public static url:EFieldType = EFieldType.url;
    public static checkbox:EFieldType = EFieldType.checkbox;
    public static radio:EFieldType = EFieldType.radio;
}

export interface FieldDef {
    id: string,
    label?: string,
    type? : FieldType
    required?: boolean,
    placeHolder?: string,
    rows?: number,
    options?: SelectOptionDef[],
    defaultText?: string,
    getRequired?: Function,
    getAutoComplete?: Function,
    getFieldType?: Function,
}

export interface SelectOptionDef {
    value : string | number,
    text: string,
    selected? : boolean
}

interface TypeConvDef {
    types : FieldType[],
    to: string,
}

interface OptionDefaults {
    requiredFieldTypes? : FieldType[],
    autoCompleteFieldTypes? : TypeConvDef[],
    fieldTypes? : TypeConvDef[],
    actionTypes?: TypeConvDef[],
}

interface FormOptions {
    fields: FieldDef[],
    actions: ActionDef[],
    data: [],
    defaults? : OptionDefaults
}


const getRequired = ( field: FieldDef, requiredFieldTypes? : FieldType[] ) => {
    let fieldType = field.type ?? FieldType.text;
    if ( requiredFieldTypes.includes(fieldType) ) {
        return true;
    } else {
        return field.required ?? false;
    }
}

const getAutoComplete= ( field: FieldDef, autoCompleteFieldTypes? : FieldType[] ) => {
    let fieldType = field.type ?? FieldType.text

    let autocomplete:string|null = null;

    autoCompleteFieldTypes.every( ( s: any ) => {
        if ( s.types.includes(fieldType)) {
            autocomplete = s.to;
            return false;
        }
        return true;
    });

    return autocomplete;
}

/**
 * 
 * @param field 
 * @param fieldTypes 
 * @returns 
 */
const getFieldType =  ( field: FieldDef, typeConvDefs :  TypeConvDef[] ) => {
    let fieldType = field.type ?? FieldType.text;
    for ( let i = 0; i < typeConvDefs.length; i++ ) {
        let typeConvDef:TypeConvDef = typeConvDefs[ i ];
        if ( typeConvDef.types.includes(fieldType)) {
            return typeConvDef.to;
        }
    };
    return fieldType;
}

export const useVueForm = ( options: FormOptions ) => {

    options.defaults = options.defaults ?? {};

    /* The custom field types where required is set as default */
    options.defaults.requiredFieldTypes = options.defaults.requiredFieldTypes ?? [ FieldType.newPassword, FieldType.password, FieldType.confirmPassword, FieldType.username, FieldType.usernameAndEmail];
    
    /* The custom field [types] where auto complete needs to be set [to] something */
    options.defaults.autoCompleteFieldTypes = [
      {
        "types" : [ FieldType.username, FieldType.usernameAndEmail],
        "to" :"username"
      }, {
        "types" : [ FieldType.newPassword, FieldType.confirmPassword],
        "to" :"new-password"
      }, {
        "types" : [ FieldType.password],
        "to" : "current-password"
      }
    ];

    /* The custom field [types] where the actual type need to be set [to] something */
    options.defaults.fieldTypes = [
        {
            "types" : [FieldType.newPassword,FieldType.password,FieldType.confirmPassword],
            "to" : "password"
        },
        {
            "types" : [FieldType.username],
            "to" : "text"
        },
        {
            "types" : [ FieldType.usernameAndEmail ],
            "to" : "email"
        }
    ];

    /* The custom action [types] where the actual type need to be set [to] something */
    options.defaults.actionTypes = [
        {
            "types" : [ActionType.submit],
            "to" : "submit"
        },
    ];
  
    return {
        getFieldModel : () => {

            options.defaults = options.defaults ?? {} as OptionDefaults;
            options.defaults.requiredFieldTypes ?? [] as FieldType[];
            options.defaults.requiredFieldTypes ?? [] as FieldType[];

            options.fields = options.fields.map(( field ) => {
                field.getRequired = () => {
                    return getRequired( field, options.defaults.requiredFieldTypes );
                };
                field.getAutoComplete = () => {
                    return getAutoComplete( field, options.defaults.autoCompleteFieldTypes );
                };
                field.getFieldType = () => {
                    return getFieldType( field, options.defaults.fieldTypes );
                };
                return field;
            });

            return {
                fields: options.fields
            }
        },
        getActionModel : ( location: ActionLocation ) => {

            let newActions = [...options.actions ];

            newActions = newActions.filter(( action) => {
                return ( ( action.location ? action.location : ActionLocation.default ) === location )
            });

            return {
                actions: newActions
            }
        },
        hasRequired : () => {

            let hasRequired = false;
            let i = 0;
    
            let fields: FieldDef[] = options.fields;
    
            while (!hasRequired && ( i < fields.length ) ) {
    
                hasRequired = getRequired(fields[ i ], options.defaults.requiredFieldTypes);    
    
                i++;
            }
    
            return hasRequired;
    
        }
    }
}

