<template>
  <div id="app">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Teste Cedro</v-toolbar-title>
      <v-spacer></v-spacer>
      <!--<v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>-->
    </v-toolbar>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.v-toolbar {
  margin-bottom: 20px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
