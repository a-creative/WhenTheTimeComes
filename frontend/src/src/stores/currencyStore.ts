import { defineStore } from 'pinia'
import { ELoading, api } from '@/@acreative/vue/modules/vue-api';
import { Currency } from '@/types/currency';

export const getCurrencyStore = defineStore('currency', {
    state: () => ( {
      loading: <ELoading>{},
      errors: <any>[]
    }),
    actions: {
        create( currency: Currency, onSuccess: Function ) {
          api.post('/currencies', {
            data : currency,
            onSuccess
          })
        },
        update( currency: Currency, onSuccess: Function ) {
          api.put('/currencies', {
            data : currency,
            onSuccess
          })
        }
    },
    getters : {

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