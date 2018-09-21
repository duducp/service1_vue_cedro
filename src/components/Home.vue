<template>
  <v-layout row>
    <v-flex>
      <v-card class="form-app">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-btn :disabled="!valid" @click="submit">
            Enviar
          </v-btn>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style>
  .form-app {
    margin: 0 20px;
    padding: 10px;
  }
</style>
