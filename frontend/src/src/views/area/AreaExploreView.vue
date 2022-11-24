<script lang="ts" setup>
  import PageT from "@/@acreative/vue/bootstrap/PageContainer.vue"
  import { useRouter, useRoute } from 'vue-router'
  import { ref } from 'vue';
  import { useI18n } from "vue-i18n";
  import { ELoading } from "@/@acreative/vue/modules/vue-api";
  import Wood from "@/views/area/collectibles/WoodCollectible.vue";
  import Rock from "@/views/area/obstacles/RockObstacle.vue";
  import Source from "@/views/area/specials/Source.vue";
  import Player from "@/views/area/specials/Player.vue";
  
  const { t } = useI18n({ inheritLocale: true });

  const route = useRoute();
  const router = useRouter();
  
  const loading = ref<ELoading>(ELoading.idle)

  const plots:any[] = [];
  for ( let row_i = 1; row_i <= 20; row_i++ ) {
    let row:any = [];
    
    for ( let col_i = 1; col_i <= 20; col_i++ ) {
      let x:number = (col_i-1) * 20;
      let y:number = (row_i-1) * 20;
      let col:any = {};

      row.push(col);
    }

    plots.push(row)

  }

  plots[0][0] = {
    type: 'player'
  }

  plots[10][10] = {
    type: 'source'
  }

  plots[14][4] = {
    type: 'rock',
    size: '2x2'
  }

  plots[3][3] = {
    type: 'wood'
  }

  plots[4][16] = {
    type: 'wood'
  }


</script>
<template>
  <PageT :title="t('Title')">
    <div class="map">
      <div class="plot-row" v-for="row in plots">
        <div class="plot-col" v-for="plot in row">
          <div class="plot">
            <Wood v-if="plot.type === 'wood'" />
            <Rock v-if="plot.type === 'rock'" />
            <Player v-if="plot.type === 'player'" />
            <Source v-if="plot.type === 'source'" />
          </div>
        </div>
      </div>
    </div>
  </PageT>
</template>
<i18n lang="json">
{
  "da": {
    "Title" : "Låge 1"
  }
}
</i18n>
<style scoped>
  .map {
    width: 400px; /* 20 x 20px */
    height: 400px;
    background-color:green;
    box-sizing: border-box;
  }

  .plot {
    width:20px;
    height:20px;
    border:1px solid #000;
  }

  .plot-row {
    width:400px;
    height:20px;
    box-sizing: border-box;
  }

  .plot-col {
    width:20px;
    height:20px;
    box-sizing: border-box;
    float:left;
  }
</style>