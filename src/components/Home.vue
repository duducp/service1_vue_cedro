<template>
  <v-layout row>
    <v-flex>
      <v-card class="form-app">
        <v-form ref="form">
          <v-text-field
            label="Informe o nome completo"
            v-model="name"
            required
          ></v-text-field>
          
          <v-btn @click="submit" :loading="loading" :disabled="loading" >
            Pesquisar
          </v-btn>
        </v-form>
      </v-card>

      <v-data-table
        :headers="headers"
        :items="dataResponse"
        hide-actions
        class="elevation-1"
        style="margin: 20px 20px;"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.process }}</td>
          <td>
            <span v-if="props.item.link_access_process">
              <v-btn
                flat
                small
                href="{ props.item.link_access_process }"
                target="_blank"
              >Ver Processo</v-btn>
            </span>
          </td>
        </template>

        <template slot="no-data">
          <p>Não há nenhum dado disponível</p>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash';   

  export default {
    data: () => ({
      loading: false,
      name: '',
      messages: {
        name: [],
      },
      headers: [
        {
          text: 'Código',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Nome',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Processo',
          value: 'process',
          sortable: false
        },
        {
          text: '',
          value: 'view'
        }
      ],
      dataResponse: []
    }),
    methods: {
      submit() {
        this.loading = true;

        let data = {
          'name': this.name
        };

        axios.post('http://localhost:8000/save', data, {
          headers: { "Content-Type": "application/json" }
        }).then((res) => {
          this.loading = false;
          this.displayNotification('Você está na fila, já já iremos te dar retorno!', 'Aguarde...', 'info');

          this.dataResponse.push({
            id: res.data.data['id'],
            name: res.data.data['name']
          })

          setTimeout(() => {
            this.searchProcess(res.data.data['id'])
          }, 3000);

          // this.$socket.send('some data')
          // this.$options.sockets.onmessage = (data) => console.log(data)
        }).catch((err) => {
          this.loading = false;
          // let errors = err.response.data.errors;
          this.displayNotification('Oops.. algo deu errado. Tente novamente!', '', 'error');
        })

      },
      searchProcess(id) {
        axios.get('http://localhost:8000/busca/' + id).then((res) => {
          this.displayNotification('Busca realizada com sucesso!', 'Sucesso', 'success');
          
          const index = _.findIndex(this.dataResponse, {id: res.data.data['id']})

          if (index !== -1) {
            this.dataResponse.splice(index, 1);

            this.dataResponse.push({
              id: res.data.data['id'],
              name: res.data.data['name'],
              link_access_process: res.data.data['response']['dominio'] + res.data.data['response']['link'],
              process: res.data.data['response']['numero_processo']
            })
          }

          console.log(res['data']['data'])
          console.log(this.dataResponse)

          // this.$socket.send('some data')
          // this.$options.sockets.onmessage = (data) => console.log(data)
        }).catch((err) => {
          this.loading = false;
          this.displayNotification('Oops.. algo deu errado ao buscar o processo!', '', 'error');
        })
      },
      displayNotification(message, title, type = 'success') {
        this.$snotify[type](message, title, {timeout: 3000});
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
    color: #fff;
  }
</style>