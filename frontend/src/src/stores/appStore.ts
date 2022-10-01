import { defineStore } from 'pinia'
import { ELoading } from '@/@acreative/vue/modules/vue-api';

export const getAppStore = defineStore('app', {
    state: () => ( {
      loading: <ELoading>{},
      errors: <any>[]
    }),
    actions: {
        setLoading ( loadingState: ELoading ) {
            this.loading = loadingState;
        },
        showError( error:any ) {
            this.errors.push(error);
        },
        removeError( removeI:number ) {
          this.errors = this.errors.filter( ( error:any,i:number ) => {
            return i != removeI;
          });
        }
    },
    getters : {
        getLoading(state:any) : ELoading {
            return state.loading;
        },
        getErrors(state:any) : any[] {
          return this.errors;
        }
    },
    persist: {
      enabled: true,
      strategies: [
        {
          paths: []
        },
      ],
    },
});