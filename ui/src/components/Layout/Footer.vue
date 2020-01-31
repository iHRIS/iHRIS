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
export default {
  data() {
    return {
      links: [
        {
          text: "iHRIS User Manual",
          to: { name: "user-manual" }
        },
        {
          text: "mHero User Manual",
          to: { name: "mhero-user-manual" }
        },
        {
          href: "https://forms.gle/jQJ7N3nDBSxSNne58",
          text: "Feedback"
        },
        {
          href: "https://www.ihris.org",
          text: "iHRIS Website"
        },
        {
          text: "Terms & Conditions",
          to: { name: "terms-and-conditions" }
        }
      ]
    };
  }
};
</script>
