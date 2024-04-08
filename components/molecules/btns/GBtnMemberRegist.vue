<script>
import GDialogEditor from '../dialogs/GDialogEditor.vue'
import GInputMember from '../inputs/GInputMember.vue'
import AIconRegist from '~/components/atoms/icons/AIconRegist.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GDialogEditor, AIconRegist, GInputMember },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      dialog: false,
      loading: false,
      editModel: this.$Member(),
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
  <g-dialog-editor
    v-model="dialog"
    label="会員登録"
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
      <g-input-member v-bind.sync="editModel" attach />
    </template>
  </g-dialog-editor>
</template>

<style></style>
