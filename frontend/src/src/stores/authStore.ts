import { defineStore } from 'pinia'
import { api } from '@/@acreative/vue/modules/vue-api';

export const getAuthStore = defineStore('auth', {
    state () {
      return {
        test : <string>'tom',
        user : <User|null>{},
        unsuccessfullyAccessedRoute: <string|null>''
      }
    },
    actions: {
        setUser ( user: User|null ) { 
          this.user = user;
        },
        setUnsuccessfullyAccessedRoute ( unsuccessfullyAccessedRoute: string | null ) { 
            this.unsuccessfullyAccessedRoute = unsuccessfullyAccessedRoute; 
        },
        login( user: AuthUser, onSuccess: Function ) {
          api.post('/login', {
            data: user,
            onSuccess : (data:any) => {
                this.user = data.user as User;  
                
                var cached_route = this.getUnsuccessfullyAccessedRoute;
                if (cached_route) {
                  this.setUnsuccessfullyAccessedRoute( null );
                  onSuccess( cached_route )
                } else {
                  onSuccess({ 'name' : 'home' });
                }
            },
          });
        },
        logout( onSuccess : Function,  resetTest = false ) {
          api.post('/logout', {
            onSuccess : ( data:any) => {
              if (data.status) {
                this.setUser( null );
                onSuccess();
              }
            }, 
            data : { resetTest },
          })
        },
        register( user: RegisterUser, onSuccess: Function ) {
          api.post('/register', {
            onSuccess,
            data: user
          });
        },
        resetTest( onSuccess: Function ) {
          this.logout(
            onSuccess,
            true
          )
        }
    },
    getters : {
        getUser : ( state:any ) : User|null => {
            return ( JSON.stringify( state.user ) === '{}' ? null : state.user );
        },
        getUnsuccessfullyAccessedRoute : ( state:any ) : string|null => {
            return state.unsuccessfullyAccessedRoute;
        }
    },
    persist: {
      enabled: true,
      strategies: [
        {
          paths: ['user','unsuccessfullyAccessedRoute']
        },
      ],
    },
});