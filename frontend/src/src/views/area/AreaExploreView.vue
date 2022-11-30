<script lang="ts" setup>
  import PageT from "@/@acreative/vue/bootstrap/PageContainer.vue"
  import { useRouter, useRoute } from 'vue-router'
  import { ref } from 'vue';
  import { useI18n } from "vue-i18n";
  import { ELoading } from "@/@acreative/vue/modules/vue-api";
  import Wood from "@/views/area/collectibles/WoodCollectible.vue";
  import Rock from "@/views/area/obstacles/RockObstacle.vue";
  import Lake from "@/views/area/obstacles/LakeObstacle.vue";
  import Source from "@/views/area/specials/Source.vue";
  import Player from "@/views/area/specials/Player.vue";
  import { Direction, Plot } from '@/types/area';
  
  
  const { t } = useI18n({ inheritLocale: true });

  const route = useRoute();
  const router = useRouter();
  
  const loading = ref<ELoading>(ELoading.idle)

  // Set the grounds for our area
  const plots = ref<Plot[][]>([]);

  // Init. the grounds with empty plots
  for ( let x = 1; x <= 20; x++ ) {
    let rowOfPlots:Array<Plot> = [];
    
    for ( let y = 1; y <= 20; y++ ) {
      let plot:Plot = new Plot(x,y);
      rowOfPlots.push(plot);
    }

    plots.value.push(rowOfPlots)
  }

  const initContent = () => {

    // map

    // Add some test content
    plots.value[0][0].contentType = 'player'
    plots.value[10][10].contentType = 'source';

    plots.value[16][16].contentType = 'rock';
    plots.value[16][16].contentSize = 2;

    plots.value[12][4].contentType = 'lake';
    plots.value[12][4].contentSize = [
      ' XXX ',
      'XXXXX',
      'XXXXX',
      ' XXXX',
      '  XX '
    ];

    plots.value[2][2].contentType = 'wood';
    plots.value[4][16].contentType = 'wood';
    
  }

  initContent();

  const movePlayer = (direction: Direction) => {
    console.log('The player is moved:' + direction)
  }

</script>
<template>
  <PageT :title="t('Title')">
    <div class="map">
      <div class="plot-row" v-for="row in plots">
        <div class="plot-col" v-for="plot in row">
          <div class="plot">
            <Lake v-if="plot.contentType === 'lake'" :plot="plot" />
            <Wood v-if="plot.contentType === 'wood'" :plot="plot" />
            <Rock v-if="plot.contentType === 'rock'" :plot="plot" />
            <Player v-if="plot.contentType === 'player'" :plot="plot"  v-on:move="movePlayer" />
            <Source v-if="plot.contentType === 'source'" :plot="plot" />
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