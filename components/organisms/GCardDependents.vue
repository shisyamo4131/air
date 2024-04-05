<script>
import { orderBy } from 'firebase/firestore'
import AIconRegist from '../atoms/icons/AIconRegist.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputDependent from '../molecules/inputs/GInputDependent.vue'
import GDataTableDependents from '../molecules/tables/GDataTableDependents.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GDialogEditor,
    AIconRegist,
    GInputDependent,
    GDataTableDependents,
  },
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
    this.items = this.model.subscribe(undefined, [orderBy('birth')])
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
    modify(item) {
      this.editMode = 'UPDATE'
      this.editModel.initialize(item)
      this.dialog = true
    },
    async remove(item) {
      const answer = window.confirm('削除しますか？')
      if (!answer) return
      this.editModel.initialize(item)
      await this.editModel.delete()
    },
  },
}
</script>

<template>
  <v-card>
    <v-card-title class="justify-space-between">
      <span>被扶養者</span>
      <g-dialog-editor
        v-model="dialog"
        :label="`被扶養者情報${editMode === 'REGIST' ? '登録' : '更新'}`"
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
          <g-input-dependent v-bind.sync="editModel" />
        </template>
      </g-dialog-editor>
    </v-card-title>
    <g-data-table-dependents
      :items="items"
      hide-pagination
      hide-search
      :actions="['edit', 'delete']"
      @click:edit="modify($event)"
      @click:delete="remove($event)"
    />
  </v-card>
</template>

<style></style>
