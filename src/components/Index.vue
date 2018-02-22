<template>
  <div>
    <section class="entry-screen">

      <a id="save-file" class="button is-primary"></a>
      <a id="preload-file" @click="loadInstance" class="button is-info">{{ stringData }}</a>

      <a class="button" href="https://github.com/zeroclutch/vainglory-counter-data">
            <span class="icon">
                <i class="fab fa-github"></i>
            </span>
        <span>View on GitHub</span>
      </a>
    </section>
  </div>
</template>

<script>

  import store         from '../store/index'
  import preloadedData from '../assets/example_data/preloadedData'

  export default {
    name   : 'index',
    data() {
      return {
        store            : store.state,
        simplePreloadData: '',
        stringData       : 'Loading informations',
        filters          : {
          gameMode    : '5v5_pvp_casual',
          createdStart: new Date(new Date().setDate(new Date().getDate() - 27)).toISOString(),
          patch       : '3.0',
          apiKey      : 'Bearer aaa.bbb.ccc',
          minSkillTier: 0, //currently horrible
          rateLimit   : 10
        },
        totalMatches     : 0,
        preloadedData
      }
    },
    methods: {
      simplifyData(data) {
        //Decode stored data
        data.replace('\n', '')
        data.replace('====', '==')
        let outputData = data.split('===')
        outputData[0]  = JSON.parse(outputData[0])
        outputData[1]  = outputData[1].split('==')
        return outputData
      },
      async updateWebpage() {

        // this.$router.push('/informations')
      },
      async loadInstance() {
        try {

          // create a temporary data
          let data = {
            output          : this.simplePreloadData[0],
            IGNs            : this.simplePreloadData[1],
            totalMatches    : this.simplePreloadData[2],
            ignIndex        : this.simplePreloadData[3],
            ignIndexCounter : this.simplePreloadData[3],
            currentHero     : 'Adagio Crystal',
            ignsDone        : 0,
            ignsLeft        : 0,
            ignList         : [],
            strongestCounter: '',
            lastHero        : ''
          }

          // set new data
          await this.$store.commit('DATA_SET', data)

          // getHero()

          // document.querySelector('.entry-screen').style.display     = 'none'
          // document.querySelector('#hero-data-holder').style.display = 'block'

          if (this.filters.apiKey !== 'Bearer aaa.bbb.ccc') {
            // this.loopHeroes()
          } else {
            this.updateWebpage()
          }
          // this.delayData()

          this.$router.push('/Adagio Crystal')

        } catch (e) {
          console.log(e)
        }
      }
    },
    created() {
      this.simplePreloadData = this.simplifyData(this.preloadedData)
      this.stringData        = 'Restore data from ' + this.simplePreloadData[2] + ' matches'
    }
  }
</script>

<style scoped>

</style>
