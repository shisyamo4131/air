<script>
import AIconRegist from '~/components/atoms/icons/AIconRegist.vue'
import GCardMemberInfo from '~/components/molecules/cards/GCardMemberInfo.vue'
import GDialogEditor from '~/components/molecules/dialogs/GDialogEditor.vue'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
/**
 * ## page.members.docId
 *
 * @author shisyamo4131
 */
export default {
  components: {
    GCardMemberInfo,
    GDataTable,
    AIconRegist,
    GDialogEditor,
  },
  asyncData({ app, route }) {
    const docId = route.params.docId
    const dependents = app.$Dependent(docId).subscribe()
    const editModel = {
      dependent: app.$Dependent(docId),
    }
    return { docId, dependents, editModel }
  },
  data() {
    return {
      editMode: 'REGIST',
      dialog: {
        dependent: false,
      },
      loading: false,
    }
  },
  watch: {
    'dialog.dependent'(v) {
      if (!v) {
        this.editMode = 'REGIST'
        this.editModel.dependent.initialize()
      }
    },
  },
  methods: {
    async submitDependent() {
      try {
        this.loading = true
        if (this.editMode === 'REGIST') await this.editModel.dependent.create()
        if (this.editMode === 'UPDATE') await this.editModel.dependent.update()
        if (this.editMode === 'DELETE') await this.editModel.dependent.delete()
        this.dialog.dependent = false
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
  <v-row>
    <v-col cols="12" md="4">
      <g-card-member-info :doc-id="docId" />
    </v-col>
    <v-col cols="12" md="8">
      <v-card>
        <v-card-title class="justify-space-between">
          <span>家族構成</span>
          <g-dialog-editor
            v-model="dialog.dependent"
            label="家族情報更新"
            :loading="loading"
            @click:submit="submitDependent"
          >
            <template #activator="{ attrs, on }">
              <a-icon-regist v-bind="attrs" v-on="on" />
            </template>
            <template #form>
              <v-text-field v-model="editModel.dependent.lastName" />
              <v-text-field v-model="editModel.dependent.firstName" />
            </template>
          </g-dialog-editor>
        </v-card-title>
        <g-data-table
          :items="dependents"
          :headers="[{ text: '氏名', value: 'fullName' }]"
          :mobile-breakpoint="0"
          hide-pagination
          hide-search
          show-actions
          :actions="['edit', 'delete', 'detail']"
        >
        </g-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<style></style>
