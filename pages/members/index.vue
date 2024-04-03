<script>
import AIconRegist from '~/components/atoms/icons/AIconRegist.vue'
import GDialogEditor from '~/components/molecules/dialogs/GDialogEditor.vue'
import GInputMember from '~/components/molecules/inputs/GInputMember.vue'
import GTextFieldSearch from '~/components/molecules/inputs/GTextFieldSearch.vue'
/**
 * ### pages.companies.index
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GTextFieldSearch, GInputMember, AIconRegist, GDialogEditor },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
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
          label="会員登録"
          :loading="loading"
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
            cols="12"
            sm="6"
            md="4"
            lg="3"
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
                <v-icon @click="$router.push(`/members/${item.docId}`)"
                  >mdi-eye</v-icon
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-iterator>
</template>

<style></style>
