<template>
  <div>
    <v-container v-if="edit">
      <slot name="form"></slot>
    </v-container>
    <div v-else>
      <v-row dense>
        <v-col :cols="$store.state.cols.header" class="font-weight-bold">
          <slot name="header"></slot>
        </v-col>
        <v-col :cols="$store.state.cols.content" v-if="loading">
          <v-progress-linear indeterminate color="primary"></v-progress-linear>
        </v-col>
        <v-col :cols="$store.state.cols.content" v-else>
          <slot name="value"></slot>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "ihris-element",
  props: [ "edit", "loading" ]
}
</script>
