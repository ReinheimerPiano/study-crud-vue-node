<template>
  <div style="width: 100vw; height: 100vh">
    <h1 style="text-align: center;">Clientes</h1>
    <v-data-table
      :headers="headers"
      :items="cidades"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        { text: "Codigo", value: "id" },
        { text: "Nome", value: "Nome" },
        { text: "Email", value: "Email" },
        { text: "Data Nasc", value: "Data_Nascimento" },
        { text: "CPF", value: "CPF" },
        { text: "Logradouro", value: "Logradouro" },
        { text: "Numero", value: "Numero" },
        { text: "Cod Cidade", value: "Cidade_Id" }
      ],
      cidades: []
    };
  },
  watch: {
    options: {
      handler() {
        this.lendoDadosApi();
      }
    },
    deep: true
  },
  methods: {
    lendoDadosApi() {
      this.loading = true;
      axios
        .get("http://localhost:3000/Cliente")
        .then(response => {
          this.cidades = response.data;
        })
        .catch(error => {
          if (!error.response) {
            // network error
            this.errorStatus = "Error: Network Error";
          } else {
            this.errorStatus = error.response.data.message;
          }
        });
    }
  },
  async mounted() {
    console.log("mounted");
    this.lendoDadosApi();
  }
};
</script>
