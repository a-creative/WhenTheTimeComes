<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useI18n } from "vue-i18n";
import { api, EApiMethod, IApiPostOptions, IApiPutOptions } from "@/@acreative/vue/modules/vue-api"

import {
    getCoreRowModel,
    getSortedRowModel,
    useVueTable,
    ColumnDef,
    ColumnSort
} from '@tanstack/vue-table'
import { userStore } from "@/stores/userStore";
const store = userStore();

const { t } = useI18n({ inheritLocale: true }); 
const router = useRouter();

interface ITranslation {
    items?: string,
}

interface Props {
    columns: ColumnDef<TableData>[],
    data?: Array<TableData>,
    paging: any,
    dataSource?: string,
    t? : ITranslation,
}

const props = defineProps<Props>()

const sorting = ref<Array<ColumnSort>>([])

const sourceData = ref<Array<any>>([]);

enum ELoading {
    idle,
    loading,
    loaded,
    failed,
}

const loading = ref<ELoading>(ELoading.idle)

onMounted( () => {
    if ( props.dataSource ) {
        loading.value = ELoading.loading;
        api.get( props.dataSource, {
            onSuccess : (result:any) => {
                loading.value = ELoading.loaded;
                sourceData.value = result.data;
            }
        })
    }
})

const table = useVueTable({
    get data() {
        if ( props.dataSource ) {
            return sourceData.value;
        } else if ( props.data ) {
            return props.data;
        } else {
            return [];
        }
    },
    columns: props.columns,
    state: {
        sorting: sorting.value
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    defaultColumn: {
        size: 24,
        minSize: 0,
        maxSize: 100,
    }
})

const changeSorting = (header: any) => {
    if ( sorting.value.length === 0 ) {
        let defaultSorting:ColumnSort = {
            id: header.column.id,
            desc: true,
        }
        sorting.value = [ defaultSorting ];
    } else {
        let currentSorting: ColumnSort = sorting.value[ 0 ];
        let newSorting: ColumnSort = {
            id: header.column.id,
            desc: (currentSorting.desc ? false : true )
        }
        sorting.value = [ newSorting ]
    }
    header.column.getToggleSortingHandler();
}

const gotoPage = ( page: number ) => {
    if (( page >=1 ) && ( page <= props.paging.lastPage ) ) {
        props.paging.gotoPageHandler( page );
    }
    
}
</script>
<template>
    <table v-if="(loading === ELoading.loaded)" class="table table-striped table-hover table-fixed">
        <thead>
            <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan" scope="col" :class="['w-' + header.getSize()]">
                    <span v-if="!header.column.getCanSort()">{{ header.column.columnDef.header }}</span>
                    <span v-if="header.column.getCanSort()" @click="changeSorting(header)">
                        <span>{{header.column.columnDef.header}}</span>
                        <span v-if="header.column.getIsSorted()" class="d-inline-block">
                            <font-awesome-icon v-if="(header.column.getIsSorted() as string) === 'desc'" icon="arrow-up-short-wide" />
                            <font-awesome-icon v-if="(header.column.getIsSorted() as string) === 'asc'" icon="arrow-down-short-wide" />
                        </span>
                    </span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in table.getRowModel().rows" :key="row.id" >
                <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                    {{ cell.getValue() }}
                </td>
            </tr>
        </tbody>
    </table>
    <p v-if="(loading === ELoading.loading)">{{ (props.t && props.t.items ) ? t('loading.specific',  { "items" : props.t.items }) : t('loading.simple') }}</p>
    <p v-if="(loading === ELoading.failed)">{{ (props.t && props.t.items ) ? t('failed.specific', { "items" : props.t.items, "error" : "1234" }) : t('failed.simple') }}</p>
</template>
<i18n lang="json">
{
  "da": {
    "loading" : {
        "specific" : "Indlæser {items}...",
        "simple" : "Indlæser..."
    } ,
    "failed" : { 
        "specific" : "Fejl ved indlæsning af {items}: '{error}'!",
        "simple" : "Fejl ved indlæsning: '{error}'!"
    },
    "table" : {
        "items" : ""
    }
  }
}
</i18n>
