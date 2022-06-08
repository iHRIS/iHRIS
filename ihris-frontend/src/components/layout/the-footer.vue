<template>
  <v-footer color="white" app>
    <v-row justify="end">
      <v-btn
        v-for="link in footer.links"
        :key="link.id"
        text
        class="text-none"
        :to="link.to"
        :href="link.href"
        :target="link.href ? '_blank': ''"
      >
        {{ $t(`App.footer.${link.text}`) }}
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script>

export default {
  name: "the-footer",
  props: ["footer"],
  data: function() {
    return {
    }
  },
}
</script>
