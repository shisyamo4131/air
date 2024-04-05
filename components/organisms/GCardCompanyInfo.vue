<script>
import GInputCompany from '../molecules/inputs/GInputCompany.vue'
import AIconDelete from '../atoms/icons/AIconDelete.vue'
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
  components: { AIconEdit, GInputCompany, GDialogEditor, AIconDelete },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    docId: { type: String, required: true },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
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
    async remove() {
      const result = window.confirm('本当に削除しますか？')
      if (!result) return
      await this.model.delete()
      this.$router.replace('/companies')
    },
  },
}
</script>

<template>
  <v-card>
    <v-card-title class="justify-space-between">
      {{ model.name }}
    </v-card-title>
    <v-card-subtitle>{{ model.abbrKana }}</v-card-subtitle>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle> 住所 </v-list-item-subtitle>
          <v-list-item-title>
            {{ model.fullAddress }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ model.address2 }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle> 電話番号 </v-list-item-subtitle>
          <v-list-item-title>
            {{ model.tel }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle> FAX番号 </v-list-item-subtitle>
          <v-list-item-title>
            {{ model.fax }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle> 法人番号 </v-list-item-subtitle>
          <v-list-item-title>
            {{ model.companyNumber }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle> インボイス番号 </v-list-item-subtitle>
          <v-list-item-title>
            {{ model.invoiceNumber }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle> 事業所整理記号 </v-list-item-subtitle>
          <v-list-item-title>
            {{ model.jigyoushoSeiriKigou }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-text>
      {{ model.remarks }}
    </v-card-text>
    <v-card-actions class="justify-space-around">
      <g-dialog-editor
        v-model="dialog"
        label="会社情報更新"
        :loading="loading"
        max-width="600"
        @click:submit="submit"
      >
        <template #activator="{ attrs, on }">
          <v-btn v-bind="attrs" icon v-on="on">
            <a-icon-edit />
          </v-btn>
        </template>
        <template #form>
          <g-input-company v-bind.sync="editModel" />
        </template>
      </g-dialog-editor>
      <v-btn icon @click="remove">
        <a-icon-delete />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style></style>
