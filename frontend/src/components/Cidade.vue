
<template>
  <div style="width: 100vw; height: 100vh">
    <h1 style="text-align: center;">Cidades</h1>
    <v-data-table
      :headers="headers"
      :items="cidades"
      class="elevation-1"
    />
  </div>
</template>
<script>
import axios from 'axios';

  export default {
    data () {
      return {
        headers: [
          { text: 'Codigo',value: 'id', },
          { text: 'Nome', value: 'Nome' },
          { text: 'Cod Estado', value: 'Estado_Id' },
        ],
        cidades: []}
    },
    watch: {
    options: {
      handler() {
        this.lendoDadosApi();
      },
    },
    deep: true,
  },
  methods: {
    lendoDadosApi() {
      this.loading = true;
      axios
        .get(
          "http://localhost:3000/Cidade"
        )
        .then((response) => {
          this.cidades = response.data;
        })
        .catch(error => {
        if (!error.response) {
            // network error
            this.errorStatus = 'Error: Network Error';
        } else {
            this.errorStatus = error.response.data.message;
        }
      });
    },
  },
  async mounted() {
      console.log('mounted');
    this.lendoDadosApi();
  },
};
</script>