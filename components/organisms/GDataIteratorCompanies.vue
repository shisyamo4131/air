<script>
import AIconDetail from '../atoms/icons/AIconDetail.vue'
import AIconRegist from '../atoms/icons/AIconRegist.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputCompany from '../molecules/inputs/GInputCompany.vue'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTextFieldSearch,
    GDialogEditor,
    GInputCompany,
    AIconDetail,
    AIconRegist,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    hideDefaultFooter: { type: Boolean, default: true, required: false },
    itemsPerPage: { type: Number, default: -1, required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      cols: { cols: '12', sm: '6', md: '4', lg: '3' },
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
        const docRef = await this.editModel.create()
        this.dialog = false
        this.$emit('submit', docRef.id)
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
    v-bind="{ ...$props, ...$attrs }"
    :items="items"
    :search="search"
    v-on="$listeners"
  >
    <template #header>
      <v-toolbar flat>
        <g-text-field-search v-model="search" />
        <v-spacer />
        <g-dialog-editor
          v-model="dialog"
          label="会社登録"
          :loading="loading"
          max-width="600"
          @click:submit="submit"
        >
          <template #activator="{ attrs, on }">
            <v-btn v-bind="attrs" icon v-on="on">
              <a-icon-regist />
            </v-btn>
          </template>
          <template #form>
            <g-input-company v-bind.sync="editModel" attach />
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
            v-bind="{ ...cols }"
          >
            <v-card>
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-subtitle>{{ item.fullAddress }}</v-card-subtitle>
              <v-card-actions class="justify-end">
                <v-btn icon @click="$emit('click:detail', item.docId)">
                  <a-icon-detail />
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-iterator>
</template>

<style></style>
