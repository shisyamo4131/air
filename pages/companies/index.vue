<script>
import AIconRegist from '~/components/atoms/icons/AIconRegist.vue'
import GSimpleCardCompany from '~/components/molecules/cards/GSimpleCardCompany.vue'
import GDialogEditor from '~/components/molecules/dialogs/GDialogEditor.vue'
import GInputCompany from '~/components/molecules/inputs/GInputCompany.vue'
import GDataIterator from '~/components/molecules/tables/GDataIterator.vue'
/**
 * ### pages.companies.index
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GDataIterator,
    GSimpleCardCompany,
    GDialogEditor,
    GInputCompany,
    AIconRegist,
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      dialog: false,
      editMode: 'REGIST',
      editModel: this.$Company(),
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    companies() {
      return this.$store.state.companies.items
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    openEditor(item, mode) {
      this.editModel.initialize(item)
      this.editMode = mode
      this.dialog = true
    },
    /**
     * 引数で指定されたidの会社詳細画面に遷移します。
     */
    goToDetail(docId) {
      this.$router.push(`/companies/${docId}`)
    },
  },
}
</script>

<template>
  <g-data-iterator :items="companies" hide-default-footer :items-per-page="-1">
    <template #append-search>
      <g-dialog-editor
        v-model="dialog"
        :edit-mode.sync="editMode"
        :edit-model="editModel"
        label="会社"
        max-width="600"
      >
        <template #activator="{ attrs, on }">
          <v-btn icon v-bind="attrs" v-on="on">
            <a-icon-regist />
          </v-btn>
        </template>
        <template #form="{ attrs, on }">
          <g-input-company v-bind="attrs" v-on="on" />
        </template>
      </g-dialog-editor>
    </template>
    <template #default="{ items }">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="(item, index) of items"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            xl="3"
          >
            <g-simple-card-company
              v-bind="item"
              :actions="['edit', 'detail']"
              @click:edit="openEditor(item, 'UPDATE')"
              @click:detail="goToDetail(item.docId)"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </g-data-iterator>
</template>

<style></style>
