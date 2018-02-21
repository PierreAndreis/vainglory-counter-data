<template>
    <section id="v-for-object" class="columns">
        <aside class="menu column is-one-third">
            <ul class="menu-list">
                <span v-for="(value, key) in outputData">
                    <p class="menu-label" 
                       v-if="
                       key.split(' ')[0] == key 
                       || key.split(' ')[1] == 'Crystal' 
                       || (!outputData[key.split(' ')[0]+' Crystal'] && key.split(' ')[1] == 'Utility') 
                       || (!outputData[key.split(' ')[0]+' Crystal'] && !outputData[key.split(' ')[0]+' Utility'] && key.split(' ')[1] == 'Utility') ">
                        {{ key.split(" ")[0] }}
                    </p>
                    <li class="list-item" v-on:click="currentHero = key">
                    <span v-if="key.split(' ') == key">
                        <a class="is-active" v-if="key == currentHero">{{ key }}</a>
                        <a v-if="key != currentHero">{{ key }}</a>
                    </span>
                    <span v-if="key.split(' ') != key">
                        <a class="is-active" v-if="key == currentHero">{{ key.split(" ")[0] }}
                            <span class="tag is-danger" v-if="key.split(' ')[1] == 'Weapon'">WP</span>
                            <span class="tag is-info" v-if="key.split(' ')[1] == 'Crystal'">CP</span>
                            <span class="tag is-warning" v-if="key.split(' ')[1] == 'Utility'">UTIL</span>
                        </a>
                        <a v-if="key != currentHero">{{ key.split(" ")[0] }}
                            <span class="tag is-danger" v-if="key.split(' ')[1] == 'Weapon'">WP</span>
                            <span class="tag is-info" v-if="key.split(' ')[1] == 'Crystal'">CP</span>
                            <span class="tag is-warning" v-if="key.split(' ')[1] == 'Utility'">UTIL</span>
                        </a>
                    </span>
                </li>
            </span>
        </ul>
    </aside>
    <section id="table-content" class="column is-one-half">
        <h2 class="column title">{{ currentHero }} data</h2>
        <span class="tag is-primary">
            {{ totalMatches }} matches searched
        </span>

        <span class="tag is-info">
            {{ ignsDone }} igns searched
        </span>
        <span class="tag is-info">
            {{ ignsLeft }} igns queued
        </span>
        <table class="table column">
            <tr>
                <th>Hero Name</th>
                <th>Winrate</th>
                <th>Matches</th>
            </tr>
            <tr v-for="(value, key) in outputData[currentHero]">
                <td class="ign-cell">
                    {{ key }}
                    <span class="tag is-success" v-if="value.winrate >= 54" style="text-transform: uppercase;">LOSES TO {{ currentHero }}</span>
                    <span class="tag is-danger" v-if="value.winrate <= 46" style="text-transform: uppercase;">COUNTERS {{ currentHero }}</span>
                    <span class="tag is-warning" v-if="key == strongestCounter" style="text-transform: uppercase;">STRONGEST COUNTER</span>
                </td>
                <td>{{ value.winrate }}%</td>
                <td>{{ value.matches }}</td>
            </tr>
            <tr><td id="data-info">All data is from 3.0 5v5 matches</td></tr>
        </table>
    </section>
</section>
</template>

<script>
import output from "./assets/scripts/heroCounters";

export default {
  name: "lol",
  data: function() {
    return {
      outputData: output,
      currentHero: "Adagio Crystal",
      totalMatches: 0,
      ignsDone: 0,
      ignsLeft: 0,
      ignList: [],
      strongestCounter: "",
      lastHero: ""
    }
  },
  methods: {
    updateData: function (key, data) {
        this[key] = data;
    }
  }
};
</script>