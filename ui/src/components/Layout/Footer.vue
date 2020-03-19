<template>
  <v-footer color="white" app>
    <v-row justify="center">
      <v-btn
        v-for="link in links"
        :key="link.text"
        text
        class="text-none"
        :to="link.to"
        :href="link.href"
        :target="link.href ? '_blank' : ''"
      >
        {{ link.text }}
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script>
import ConfigSettings from "@/mixins/ConfigSettings.js";

export default {
  data() {
    let links = [];

    links.push({
      text: "iHRIS User Manual",
      to: { name: "user-manual" }
    });

    if (this.isMHeroEnabled()) {
      links.push({
        text: "mHero User Manual",
        to: { name: "mhero-user-manual" }
      });
    }

    links.push({
      href: "https://forms.gle/jQJ7N3nDBSxSNne58",
      text: "Feedback"
    });

    links.push({
      href: "https://www.ihris.org",
      text: "iHRIS Website"
    });

    links.push({
      text: "Terms & Conditions",
      to: { name: "terms-and-conditions" }
    });

    return {
      links: links
    };
  },
  mixins: [ConfigSettings]
};
</script>
