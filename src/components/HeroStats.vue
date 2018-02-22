<template>
  <div>
    <section id="hero-data-holder" class="responsive data-holder">
      <section id="v-for-object" class="columns">
        <aside class="menu column is-one-third">
          <ul class="menu-list">
                    <span v-for="value, key in store.heroesData.data.output">
                      <p class="menu-label" v-if="key.split(' ')[0] == key || key.split(' ')[1] == 'Crystal' ||
                      (!store.heroesData.data.output[key.split(' ')[0]+' Crystal'] && key.split(' ')[1] === 'Utility') ||
                      (!store.heroesData.data.output[key.split(' ')[0]+' Crystal'] && !store.heroesData.data.output[key.split(' ')[0]+' Utility'] && key.split(' ')[1] === 'Utility') ">
                      {{ key.split(' ')[0] }}
                      </p>
                      <!-- <li class="list-item" @click="store.heroesData.data.currentHero = key"> -->
                      <li class="list-item">
                      <router-link :to="generateRouter(key)">
                      <span v-if="key.split(' ') == key">
                      <a class="is-active" v-if="key == $route.params.heroName">{{ key }}</a>
                      <a v-if="key !== $route.params.heroName">{{ key }}</a>
                      </span>
                        <!--If hero is path specific-->
                      <span v-if="key.split(' ') != key">
                      <a class="is-active" v-if="key === $route.params.heroName">{{ key.split(' ')[0] }}
                      <span class="tag is-danger" v-if="key.split(' ')[1] == 'Weapon'">WP</span>
                      <span class="tag is-info" v-if="key.split(' ')[1] == 'Crystal'">CP</span>
                      <span class="tag is-warning" v-if="key.split(' ')[1] == 'Utility'">UTIL</span>
                      </a>
                      <a v-if="key !== $route.params.heroName">{{ key.split(' ')[0] }}
                      <span class="tag is-danger" v-if="key.split(' ')[1] == 'Weapon'">WP</span>
                      <span class="tag is-info" v-if="key.split(' ')[1] == 'Crystal'">CP</span>
                      <span class="tag is-warning" v-if="key.split(' ')[1] == 'Utility'">UTIL</span>
                      </a>
                      </span>
                      </router-link>
                      </li>
                    </span>
          </ul>
        </aside>
        <section id="table-content" class="column is-one-half">
          <h2 class="column title">{{ $route.params.heroName }} data</h2>
          <span class="tag is-primary">
        {{ store.heroesData.data.totalMatches }} matches searched
        </span>

          <span class="tag is-info">
        {{ store.heroesData.data.ignsDone }} igns searched
        </span>
          <span class="tag is-info">
        {{ store.heroesData.data.ignsLeft }} igns queued
        </span>
          <table class="table column">
            <tr>
              <th>Hero Name</th>
              <th>Winrate</th>
              <th>Matches</th>
            </tr>
            <tr v-for="value, key in store.heroesData.data.output[$route.params.heroName]">
              <td class="ign-cell">
                {{key}}
                <span class="tag is-success" v-if="value.winrate >= 54" style="text-transform: uppercase;">LOSES TO {{ $route.params.heroName }}</span>
                <span class="tag is-danger" v-if="value.winrate <= 46" style="text-transform: uppercase;">COUNTERS {{ $route.params.heroName }}</span>
                <span class="tag is-warning" v-if="key == getStrongestCounter($route.params.heroName)"
                      style="text-transform: uppercase;">STRONGEST COUNTER</span>
                <span class="tag is-Info" v-if="key == getWeakestCounter($route.params.heroName)"
                      style="text-transform: uppercase;">WEAKEST COUNTER</span>
              </td>
              <td>{{ value.winrate }}%</td>
              <td>{{ value.matches }}</td>
            </tr>
            <tr>
              <td id="data-info">All data is from 3.0 5v5 matches</td>
            </tr>
          </table>
        </section>

      </section>
    </section>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "HeroStats",
  data() {
    return {
      currentHero: this.$route.params.heroName,
      store: store.state
    };
  },
  methods: {
    generateRouter(heroName) {
      return { path: `/${heroName}` }
    },
    log(message) {
      console.log(message);
    },
    getStrongestCounter(hero) {
      var dataForHero = this.store.heroesData.data.output[hero],
        bestHero = "";
      for (var enemyHero in dataForHero) {
        if (
          !bestHero ||
          dataForHero[enemyHero].winrate < dataForHero[bestHero].winrate
        ) {
          bestHero = enemyHero;
        }
      }
      return bestHero;
    },
    getWeakestCounter(hero) {
      var dataForHero = this.store.heroesData.data.output[hero],
        bestHero = "";
      for (var enemyHero in dataForHero) {
        if (
          !bestHero ||
          dataForHero[enemyHero].winrate > dataForHero[bestHero].winrate
        ) {
          bestHero = enemyHero;
        }
      }
      return bestHero;
    },
    getMostFrequentMatchup() {
      var highestPoint = ["", 0];
      for (var a in output) {
        for (var b in output[a]) {
          if (output[a][b].matches > highestPoint[1]) {
            highestPoint[0] = a + " against " + b;
            highestPoint[1] = output[a][b].matches;
          }
        }
      }
      return highestPoint;
    },
    getLeastFrequentMatchup() {
      var highestPoint = ["", 100000000];
      for (var a in output) {
        for (var b in output[a]) {
          if (output[a][b].matches < highestPoint[1]) {
            highestPoint[0] = a + " against " + b;
            highestPoint[1] = output[a][b].matches;
          }
        }
      }
      return highestPoint;
    },
    getBestMatchup() {
      var highestPoint = ["", 0];
      for (var a in output) {
        for (var b in output[a]) {
          if (output[a][b].winrate > highestPoint[1]) {
            highestPoint[0] = a + " against " + b;
            highestPoint[1] = output[a][b].winrate;
          }
        }
      }
      return highestPoint;
    },
    getWorstMatchup() {
      var highestPoint = ["", 1000];
      for (var a in output) {
        for (var b in output[a]) {
          if (output[a][b].winrate < highestPoint[1]) {
            highestPoint[0] = a + " against " + b;
            highestPoint[1] = output[a][b].winrate;
          }
        }
      }
      return highestPoint;
    }
  },
  created() {}
};
</script>

<style scoped>

</style>
