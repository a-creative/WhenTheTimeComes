import { defineStore } from 'pinia'
import { api } from '@/modules/@acreative/vue-api';

export const postStore = defineStore('post', {
    state () {
      return {

      }
    },
    actions: {
      import : (data: PostCsvImportData, onSuccess: Function) => {
        api.post('/posts/import', {
          onSuccess,
          data
        });
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