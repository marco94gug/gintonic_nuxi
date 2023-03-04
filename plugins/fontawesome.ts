import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas as freeFasFas } from "@fortawesome/free-solid-svg-icons";

import { fab as freeFabFab } from "@fortawesome/free-brands-svg-icons";

library.add(freeFasFas, freeFabFab);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
