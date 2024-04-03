<script>
import AIconRegist from '~/components/atoms/icons/AIconRegist.vue'
import GDialogEditor from '~/components/molecules/dialogs/GDialogEditor.vue'
import GInputCompany from '~/components/molecules/inputs/GInputCompany.vue'
import GTextFieldSearch from '~/components/molecules/inputs/GTextFieldSearch.vue'
/**
 * ### pages.companies.index
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GTextFieldSearch, GInputCompany, AIconRegist, GDialogEditor },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      dialog: false,
      editModel: this.$Company(),
      loading: false,
      search: null,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    items() {
      return this.$store.state.companies.items
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    dialog(v) {
      !v || this.editModel.initialize(this.model)
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    async submit() {
      try {
        this.loading = true
        await this.editModel.create()
        this.dialog = false
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <v-data-iterator
    :items="items"
    :items-per-page="-1"
    hide-default-footer
    :search="search"
  >
    <template #header>
      <v-toolbar flat>
        <g-text-field-search v-model="search" />
        <v-spacer />
        <g-dialog-editor
          v-model="dialog"
          label="会社登録"
          :loading="loading"
          @click:submit="submit"
        >
          <template #activator="{ attrs, on }">
            <v-btn icon v-bind="attrs" v-on="on">
              <a-icon-regist />
            </v-btn>
          </template>
          <template #form>
            <g-input-company v-bind.sync="editModel" />
          </template>
        </g-dialog-editor>
      </v-toolbar>
    </template>
    <template #default="props">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="(item, index) of props.items"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-actions class="justify-space-around">
                <v-icon @click="$router.push(`/companies/${item.docId}`)"
                  >mdi-eye</v-icon
                >
                <v-icon disabled>mdi-account-group-outline</v-icon>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-iterator>
</template>

<style></style>
