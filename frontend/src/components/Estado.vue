<template>
  <div style="width: 100vw; height: 100vh">
    <v-data-table :headers="headers" :items="estados" class="elevation-1 ">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Estados</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >Cadastrar</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Estado</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field disabled
                        v-model="editedItem.id"
                        label="Cod"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.Nome"
                        label="Nome do Estado"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field
                        v-model="editedItem.Abreviacao"
                        label="Abreviatura"
                      ></v-text-field>
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
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
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
        { text: "Abreviacao", value: "Abreviacao" },
        { text: "Ações", value: "actions", sortable: false }
      ],
      estados: [],
      editedIndex: -1,
      editedItem: {
        Nome: "",
        Abreviacao: ""
      },
      defaultItem: {
        name: "",
        Abreviacao: ""
      }
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

    editItem(item) {
      this.editedIndex = this.estados.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.estados.indexOf(item);
      confirm("Tem certeza que deseja Excluir " + item.Nome + "?") &&
        this.estados.splice(index, 1);
      console.log(item.id);
      this.loading = true;
      axios.delete(baseUrl + "Estado/" + item.id).catch(error => {
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
      let th = this
      let index = this.editedIndex
      if (this.editedIndex > -1) {
        axios
          .put(baseUrl + "Estado/" + this.editedItem.id, {
            Nome: this.editedItem.Nome,
            Abreviacao: this.editedItem.Abreviacao
          })
          .then(function(response) {
            Object.assign(th.estados[index], response.data.updatedAffectLines);
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
          .post(baseUrl + "Estado", {
            Nome: this.editedItem.Nome,
            Abreviacao: this.editedItem.Abreviacao
          })
          .then(function(response) {
            th.estados.push(response.data);
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
