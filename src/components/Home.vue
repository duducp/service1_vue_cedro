<template>
  <v-layout row>
    <v-flex>
      <v-card class="form-app">
        <v-form ref="form">
          <v-text-field
            label="Name"
            v-model="name"
            :error-messages="messages.email"
            required
          ></v-text-field>
          
          <v-btn @click="submit" color="primary" :loading="loading" :disabled="loading" >
            Enviar
          </v-btn>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "login",
    data: () => ({
      loading: false,
      name: '',
      messages: {
        name: [],
      }
    }),
    methods: {
      submit() {
        this.loading = true;

        let data = {
          name: this.name,
        };

        axios.post('http://localhost:8000/save', data).then((res) => {
          this.loading = false;
          console.log(res)
        }).catch((err) => {
          this.loading = false;

          let errors = err.response.data.errors;

          if (errors) {
            for (let field in errors) {
              this.messages[field] = errors[field]
            }
          }

        })

      }
    }
  }
</script>

<style scoped>
  .form-app {
    margin: 0 20px;
    padding: 10px;
  }

  .v-btn {
    background-color: #212121 !important;
  }
</style>