<template>
  <div style="width: 100vw; height: 100vh">
    <v-data-table :headers="headers" :items="clientes" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Clientes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="createItem"
              >Cadastrar</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Cliente</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field disabled v-model="editedItem.id" label="Cod"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="10" md="10">
                      <v-text-field :counter="250" required v-model="editedItem.Nome" label="Nome"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        :counter="250"
                        required
                        v-model="editedItem.Email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-menu
                        ref="menu"
                        v-model="editedItem.Data_Nascimento"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Data de Nasc"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable locale="pt-BR">
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">Cancelar</v-btn>
                          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field :counter="11" required v-model="editedItem.CPF" label="CPF"></v-text-field>
                    </v-col>
                    <v-col cols="10" sm="10" md="10">
                      <v-text-field
                        :counter="250"
                        required
                        v-model="editedItem.Logradouro"
                        label="Logradouro"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="2" md="2">
                      <v-text-field s required v-model="editedItem.Numero" label="Nº"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        v-on:change="getCidadesEstIdApi($event)"
                        :value.sync="states"
                        :v-model="editedItem.EstadoId"
                        :items="estados.map((obj) => (obj))"
                        :item-text="(obj) => (obj)['Nome']"
                        :item-value="(obj) => (obj)['id']"
                        :return-object="false"
                        label="Selecione o Estado desejado"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        id="cidades"
                        :v-model="editedItem.CidadeId"
                        :items="cidades.map((obj) => (obj))"
                        :item-text="(obj) => (obj)['Nome']"
                        :item-value="(obj) => (obj)['id']"
                        :return-object="false"
                        label="Selecione a Cidade desejada"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Atualizar</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from "axios";
const baseUrl = "http://localhost:3000/";
export default {
  data() {
    return {
      headers: [
        { text: "Codigo", value: "id" },
        { text: "Nome", value: "Nome" },
        { text: "Email", value: "Email" },
        { text: "Data Nasc", value: "Data_Nascimento" },
        { text: "CPF", value: "CPF" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      clientes: [],
      estados: [],
      cidades: [],
      editedIndex: -1,
      estado: {
        id: 0,
        Nome: "",
        Abreviatura: "",
      },
      cidade: {
        id: 0,
        Nome: "",
        Abreviatura: "",
      },
      editedItem: {
        Nome: "",
        Email: "",
        Data_Nascimento: "",
        CPF: "",
        Logradouro: "",
        Numero: "",
        EstadoId: 0,
        CidadeId: 0,
      },
      defaultItem: {
        Nome: "",
        Email: "",
        Data_Nascimento: "",
        CPF: "",
        Logradouro: "",
        Numero: "",
        EstadoId: 0,
        CidadeId: 0,
      },
    };
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
        .get(baseUrl + "Cliente")
        .then((response) => {
          this.clientes = response.data;
        })
        .catch((error) => {
          if (!error.response) {
            this.errorStatus = "Error: Network Error";
          } else {
            this.errorStatus = error.response.data.message;
          }
        });
    },

    listaEstadosApi() {
      axios
        .get(baseUrl + "Estado")
        .then((response) => {
          this.estados = response.data;
        })
        .catch((error) => {
          if (!error.response) {
            // network error
            this.errorStatus = "Error: Network Error";
          } else {
            this.errorStatus = error.response.data.message;
          }
        });
    },

    async getCidadesEstIdApi(event) {
      let id = event
      let est = await axios
        .get(baseUrl + "cidade/estado/" + id)
        .then((response) => {
          this.cidades = response.data;
        })
        .catch((error) => {
          if (!error.response) {
            // network error
            this.errorStatus = "Error: Network Error";
          } else {
            this.errorStatus = error.response.data.message;
          }
        });
    },

    editItem(item) {
      this.editedIndex = this.clientes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.listaEstadosApi();
      this.dialog = true;
    },

    createItem() {
      this.listaEstadosApi();
    },

    deleteItem(item) {
      const index = this.clientes.indexOf(item);
      confirm("Tem certeza que deseja Excluir " + item.Nome + "?") &&
        this.clientes.splice(index, 1);
      this.loading = true;
      axios.delete(baseUrl + "Cidade/" + item.id).catch((error) => {
        if (!error.response) {
          // network error
          this.errorStatus = "Error: Network Error";
        } else {
          this.errorStatus = error.response.data.message;
        }
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let th = this;
      let index = this.editedIndex;
      console.log(this.editedItem.EstadoId);
      if (this.editedIndex > -1) {
        axios
          .put(baseUrl + "Cliente/" + this.editedItem.id, {
            Nome: this.editedItem.Nome,
            Email: this.editedItem.Email,
            Data_Nascimento: this.editedItem.Data_Nascimento,
            CPF: this.editedItem.CPF,
            Logradouro: this.editedItem.Logradouro,
            Numero: this.editedItem.Numero,
            EstadoId: this.editedItem.EstadoId,
            CidadeId: this.editedItem.CidadeId,
          })
          .then(function (response) {
            Object.assign(th.clientes[index], response.data.updatedAffectLines);
          })
          .catch((error) => {
            if (!error.response) {
              // network error
              this.errorStatus = "Error: Network Error";
            } else {
              this.errorStatus = error.response.data.message;
            }
          });
      } else {
        axios
          .post(baseUrl + "Cliente", {
            Nome: this.editedItem.Nome,
            Email: this.editedItem.Email,
            Data_Nascimento: this.editedItem.Data_Nascimento,
            CPF: this.editedItem.CPF,
            Logradouro: this.editedItem.Logradouro,
            Numero: this.editedItem.Numero,
            EstadoId: this.editedItem.EstadoId,
            CidadeId: this.editedItem.CidadeId,
          })
          .then(function (response) {
            th.clientes.push(response.data);
          })
          .catch((error) => {
            if (!error.response) {
              // network error
              this.errorStatus = "Error: Network Error";
            } else {
              this.errorStatus = error.response.data.message;
            }
          });
      }
      this.close();
    },
  },
  async mounted() {
    this.lendoDadosApi();
  },
};
</script>
