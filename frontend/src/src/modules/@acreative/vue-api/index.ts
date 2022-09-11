
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { userStore } from "@/stores/userStore";
import { useRouter } from 'vue-router'

export enum EApiMethod {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete'
}

export interface IApiRequestOptions {
    onSuccess : Function,
    onFailure? : Function,
    onDone?: Function,
    needAuth?: boolean
}

export interface IApiGetOptions extends IApiRequestOptions{
    data?: Object,
}

export interface IApiPostOptions extends IApiRequestOptions{
    data: Object,
}

export interface IApiPutOptions extends IApiRequestOptions{
    data: Object,
    
}
export interface IApiDeleteOptions extends IApiRequestOptions{
    
}

enum ELoading {
    idle,
    loading,
    loaded,
    failed,
}

const needAuth = ( needAuth = true, cb: Function ) => {

    if ( needAuth ) {
        axios.get('/sanctum/csrf-cookie').then(response => cb() );
    } else {
        cb();
    }

}

export const api = {
    get : ( url:string, options: IApiGetOptions ) => {
        api.req(url, EApiMethod.get, options)
    },
    post : ( url:string, options: IApiPostOptions ) => {
        api.req(url, EApiMethod.post, options)
    },
    put : ( url:string, options: IApiPutOptions ) => {
        api.req(url, EApiMethod.put, options)
    },
    delete : ( url:string, options: IApiDeleteOptions ) => {
        api.req(url, EApiMethod.delete, options )
    },
    req : ( url:string, method: EApiMethod, options: IApiRequestOptions ) => {

        const store = userStore();
        const router = useRouter();

        let request:AxiosRequestConfig = {
            url : '/api' + url,
            method
        }

        if ( 'data' in options) {
            request.data = (options as IApiPostOptions|IApiGetOptions|IApiPutOptions).data;
        }

        store.setLoading(ELoading.loading);
        needAuth( options.needAuth, () => {
            axios.request( request )
            .then( response => {

                if (response.data.message === 'Unauthenticated.') {
                    store.setUnsuccessfullyAccessedRoute(router.currentRoute.value.fullPath);
                    router.push('/login');
                } else {
                    store.setLoading(ELoading.loaded);
                    options.onSuccess( response.data ); 
                }
            })
            .catch(({ response: { data } }) => {

                if ( ( 'errors' in data ) && ( data.errors ) ) {
                    for( let error in data.errors ) {
                        store.showError( error );
                    }
                }

                store.setLoading(ELoading.failed);
                if (( 'onFailure' in options ) && options.onFailure ) {
                    options.onFailure( data );
                }
            })
            .finally(() => {
                setTimeout( () => store.setLoading(ELoading.idle), 3000 );
                if (( 'onDone' in options ) && options.onDone ) {
                    options.onDone();
                }
            });
        })

    }
}