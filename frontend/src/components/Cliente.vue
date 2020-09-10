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
                >Cadastrar</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Cliente</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field
                        disabled
                        v-model="editedItem.id"
                        label="Cod"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="10" md="10">
                      <v-text-field
                        :counter="250"
                        :rules="nameRules"
                        required
                        v-model="editedItem.Nome"
                        label="Nome"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        :counter="250"
                        :rules="emailRules"
                        required
                        v-model="editedItem.Email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-label>Data de Nascimento</v-label>
                      <v-date-picker
                        v-model="editedItem.Data_Nascimento"
                        locale="pt-BR"
                        full-width
                        :landscape="$vuetify.breakpoint.smAndUp"
                      ></v-date-picker>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        :counter="11"
                        required
                        v-model="editedItem.CPF"
                        label="CPF"
                        @keypress="isNumber($event)"
                      ></v-text-field>
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
                      <v-text-field
                        s
                        required
                        v-model="editedItem.Numero"
                        label="Nº"
                        @keypress="isNumber($event)"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        :v-model="editedItem.EstadoId"
                        :items="estados.map(obj => obj)"
                        :item-text="obj => obj['Nome']"
                        :item-value="obj => obj['id']"
                        :return-object="false"
                        label="Selecione o Estado desejado"
                        @change="getCidadesEstIdApi($event)"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        v-model="editedItem.CidadeId"
                        :items="cidades.map(obj => obj)"
                        :item-text="obj => obj['Nome']"
                        :item-value="obj => obj['id']"
                        :return-object="false"
                        label="Selecione a Cidade desejado"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"
                  >Cancelar</v-btn
                >
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
let data = new Date().toISOString().substr(0, 10);

export default {
  data() {
    return {
      headers: [
        { text: "Codigo", value: "id" },
        { text: "Nome", value: "Nome" },
        { text: "Email", value: "Email" },
        { text: "Data Nasc", value: "Data_Nascimento" },
        { text: "CPF", value: "CPF" },
        { text: "Ações", value: "actions", sortable: false }
      ],
      clientes: [],
      estados: [],
      cidades: [],
      editedIndex: -1,
      estado: {
        id: 0,
        Nome: "",
        Abreviatura: ""
      },
      cidade: {
        id: 0,
        Nome: "",
        EstadoId: 0
      },
      editedItem: {
        Nome: "",
        Email: "",
        Data_Nascimento: data,
        CPF: "",
        Logradouro: "",
        EstadoId: 0,
        Numero: "",
        CidadeId: 0
      },
      defaultItem: {
        Nome: "",
        Email: "",
        Data_Nascimento: data,
        CPF: "",
        Logradouro: "",
        EstadoId: 0,
        Numero: "",
        CidadeId: 0
      },
      valid: true,
      nameRules: [
        v => !!v || "Nome é obrigatório",
        v => (v && v.length <= 250) || "Namo deve ter menos que 250c"
      ],
      emailRules: [
        v => !!v || "E-mail é obrigatório",
        v => /.+@.+\..+/.test(v) || "E-mail não é valido"
      ]
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

    isNumber(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },

    lendoDadosApi() {
      this.loading = true;
      axios
        .get(baseUrl + "Cliente")
        .then(response => {
          this.clientes = response.data;
        })
        .catch(error => {
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
        .then(response => {
          this.estados = response.data;
        })
        .catch(error => {
          if (!error.response) {
            // network error
            this.errorStatus = "Error: Network Error";
          } else {
            this.errorStatus = error.response.data.message;
          }
        });
    },

    async getCidadesEstIdApi(event) {
      let id = event;
      console.log(id);
      this.editedItem.EstadoId = id;
      console.log(this.editedItem.EstadoId);
      let est = await axios
        .get(baseUrl + "cidade/estado/" + id)
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
      axios.delete(baseUrl + "Cidade/" + item.id).catch(error => {
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
      if (this.editedIndex > -1) {
        axios
          .put(baseUrl + "Cliente/" + this.editedItem.id, {
            EstadoId: this.editedItem.EstadoId,
            CidadeId: this.editedItem.CidadeId,
            Nome: this.editedItem.Nome,
            Email: this.editedItem.Email,
            Data_Nascimento: this.editedItem.Data_Nascimento,
            CPF: this.editedItem.CPF,
            Logradouro: this.editedItem.Logradouro,
            Numero: this.editedItem.Numero
          })
          .then(function(response) {
            Object.assign(th.clientes[index], response.data.updatedAffectLines);
          })
          .catch(error => {
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
            EstadoId: this.editedItem.EstadoId,
            CidadeId: this.editedItem.CidadeId,
            Nome: this.editedItem.Nome,
            Email: this.editedItem.Email,
            Data_Nascimento: this.editedItem.Data_Nascimento,
            CPF: this.editedItem.CPF,
            Logradouro: this.editedItem.Logradouro,
            Numero: this.editedItem.Numero
          })
          .then(function(response) {
            th.clientes.push(response.data);
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
      this.close();
    }
  },
  async mounted() {
    this.lendoDadosApi();
  }
};
</script>
