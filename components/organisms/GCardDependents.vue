<script>
import AIconRegist from '../atoms/icons/AIconRegist.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputDependent from '../molecules/inputs/GInputDependent.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GDialogEditor, AIconRegist, GDataTable, GInputDependent },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    memberId: { type: String, required: true },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      dialog: false,
      editMode: 'REGIST',
      editModel: this.$Dependent(this.memberId),
      items: [],
      loading: false,
      model: this.$Dependent(this.memberId),
    }
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    dialog(v) {
      if (!v) {
        this.editMode = 'REGIST'
        this.editModel.initialize()
      }
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
        if (this.editMode === 'REGIST') await this.editModel.create()
        if (this.editMode === 'UPDATE') await this.editModel.update()
        if (this.editMode === 'DELETE') await this.editModel.delete()
        this.dialog = false
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
    openDialog(item, mode) {
      this.editMode = mode
      this.editModel.initialize(item)
      this.dialog = true
    },
  },
}
</script>

<template>
  <v-card>
    <v-card-title class="justify-space-between">
      <span>家族構成</span>
      <g-dialog-editor
        v-model="dialog"
        label="家族情報更新"
        :loading="loading"
        @click:submit="submit"
      >
        <template #activator="{ attrs, on }">
          <v-btn v-bind="attrs" icon v-on="on">
            <a-icon-regist />
          </v-btn>
        </template>
        <template #form>
          <g-input-dependent v-bind.sync="editModel" />
        </template>
      </g-dialog-editor>
    </v-card-title>
    <g-data-table
      :items="items"
      :headers="[{ text: '氏名', value: 'fullName' }]"
      :mobile-breakpoint="0"
      hide-pagination
      hide-search
      show-actions
      :actions="['edit', 'delete', 'detail']"
      @click:edit="openDialog($event, 'UPDATE')"
    >
    </g-data-table>
  </v-card>
</template>

<style></style>
