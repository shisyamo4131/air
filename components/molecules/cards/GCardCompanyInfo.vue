<script>
import GInputCompany from '../inputs/GInputCompany.vue'
import GDialogEditor from '~/components/molecules/dialogs/GDialogEditor.vue'
import AIconEdit from '~/components/atoms/icons/AIconEdit.vue'
/**
 * ### GCardCompanyInfo
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { AIconEdit, GInputCompany, GDialogEditor },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    docId: { type: String, required: true },
  },
  data() {
    return {
      dialog: false,
      editModel: this.$Company(),
      loading: false,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    model() {
      const data = this.$store.getters['companies/get'](this.docId)
      const model = this.$Company()
      model.initialize(data)
      return model
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
        await this.editModel.update()
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
  <v-card>
    <v-card-title class="justify-space-between">
      {{ model.name }}
      <g-dialog-editor
        v-model="dialog"
        label="会社情報更新"
        :loading="loading"
        @click:submit="submit"
      >
        <template #activator="{ attrs, on }">
          <v-btn icon v-bind="attrs" v-on="on">
            <a-icon-edit v-bind="attrs" v-on="on" />
          </v-btn>
        </template>
        <template #form>
          <g-input-company v-bind.sync="editModel" />
        </template>
      </g-dialog-editor>
    </v-card-title>
    <v-card-subtitle>{{ model.abbrKana }}</v-card-subtitle>
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-map-marker</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ model.address1 }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ model.address2 }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-phone</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ model.tel }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-fax</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ model.fax }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-text>
      {{ model.remarks }}
    </v-card-text>
  </v-card>
</template>

<style></style>
