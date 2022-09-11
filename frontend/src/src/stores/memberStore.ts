import { defineStore } from 'pinia'
import { api, EApiMethod, IApiPostOptions, IApiPutOptions } from "@/@acreative/vue/modules/vue-api"

export const memberStore = defineStore('member', {
    state () {
      return {

      }
    },
    actions: {
        getPostContent : ( onSuccess: Function ) => 
            api.get('/memberUpdatePostItems/getPostContent', {
                onSuccess : ( response:any ) => {
                  onSuccess(  { 
                    text: response.data
                  })
                }
            }),
        confirmUpdateSent: ( onSuccess : Function ) =>
            api.delete('/memberUpdatePostItems/confirmUpdateSent', {
              onSuccess
            }),
        saveMemberToPost: ( member: MemberUpdatePostItem, onSuccess: Function ) => {
          let options:IApiPostOptions|IApiPutOptions = {
            onSuccess,
            data: member
          }
        
          let method, url;
          if ( member.id ) {
            method = EApiMethod.put;
            url =  '/memberUpdatePostItems/' + member.id;
          } else {
            method = EApiMethod.post;
            url = '/memberUpdatePostItems'
          }
        
          api.req(url, method, options )
        },
        getMemberFromPost: ( memberId: number, onSuccess: Function ) => {
          api.get('/memberUpdatePostItems/' + memberId + '/edit', {
            onSuccess : ( member: MemberUpdatePostItem ) => onSuccess( member)
          });
        },
        getPostItems : ( onSuccess: Function) => {
          api.get('/memberUpdatePostItems', {
            onSuccess : ( items: IMemberUpdatePostItem[] ) => onSuccess( items )
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