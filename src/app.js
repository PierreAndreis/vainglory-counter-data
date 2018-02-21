import Vue from "vue";

import vgApi from "./assets/scripts/api_interface.js";
import preloadedData from "./example_data/preloadedData.js";
import heroPageData from "./App.vue";

window.vgApi = vgApi;

{/* <script src="assets/scripts/console.js"></script>
<script src="assets/scripts/permalink.js"></script>
<script src="assets/scripts/detectPaths.js"></script>
<script src="assets/scripts/heroCounters.js"></script>
<script src="assets/scripts/updateInfo.js"></script>
<script src="assets/scripts/managePageScenes.js"></script> */}


new Vue({
    el: document.getElementById("app"),
    render: h => h(heroPageData)
})

export default heroPageData;