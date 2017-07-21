<template>
  <v-card class="card card--flex-toolbar">
    <v-toolbar card class="white" prominent>
      <v-toolbar-title class="body-2 grey--text">Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text style="height: 200px;"></v-card-text>
  </v-card>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.card
  z-index: 9000
</style>

