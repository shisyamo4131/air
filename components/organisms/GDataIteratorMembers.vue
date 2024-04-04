<script>
import AIconDetail from '../atoms/icons/AIconDetail.vue'
import AIconRegist from '../atoms/icons/AIconRegist.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputMember from '../molecules/inputs/GInputMember.vue'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
export default {
  components: {
    GTextFieldSearch,
    GDialogEditor,
    AIconRegist,
    GInputMember,
    AIconDetail,
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
      editModel: this.$Member(),
      items: [],
      loading: false,
      model: this.$Member(),
      search: null,
    }
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
   * MOUNTED
   ***************************************************************************/
  mounted() {
    this.items = this.model.subscribe()
  },
  /***************************************************************************
   * DESTROYED
   ***************************************************************************/
  destroyed() {
    this.model.unsubscribe()
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
          label="会員登録"
          :loading="loading"
          max-width="600"
          @click:submit="submit"
        >
          <template #activator="{ attrs, on }">
            <v-btn icon v-bind="attrs" v-on="on">
              <a-icon-regist />
            </v-btn>
          </template>
          <template #form>
            <g-input-member v-bind.sync="editModel" attach />
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
              <v-card-title class="justify-space-between">
                <span>
                  {{ item.fullName }}
                  <v-icon small>mdi-gender-{{ item.gender }}</v-icon>
                </span>
                <v-chip small>
                  {{
                    $store.getters['companies/get'](item.companyId)?.abbr || ''
                  }}
                </v-chip>
              </v-card-title>
              <v-card-subtitle>{{ item.fullNameKana }}</v-card-subtitle>
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
