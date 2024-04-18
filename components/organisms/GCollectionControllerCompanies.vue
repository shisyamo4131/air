<script>
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputCompany from '../molecules/inputs/GInputCompany.vue'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
import AIconRegist from '../atoms/icons/AIconRegist.vue'
import ACollectionController from '../atoms/ACollectionController.vue'
import GActionCardSimpleCompany from '~/components/molecules/cards/GActionCardSimpleCompany.vue'
import GDataIterator from '~/components/molecules/tables/GDataIterator.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GDataIterator,
    GActionCardSimpleCompany,
    GDialogEditor,
    GInputCompany,
    ACollectionController,
    GTextFieldSearch,
    AIconRegist,
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    items() {
      return this.$store.state.companies.items
    },
  },
}
</script>

<template>
  <a-collection-controller
    v-bind="$attrs"
    :items="items"
    model-id="Company"
    v-on="$listeners"
  >
    <template #default="{ model, dialog, search, table }">
      <v-toolbar flat>
        <g-text-field-search v-bind="search.attrs" v-on="search.on" />
        <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
          <template #activator="{ attrs, on }">
            <v-btn v-bind="attrs" icon v-on="on">
              <a-icon-regist />
            </v-btn>
          </template>
          <template #form>
            <g-input-company v-bind="model.attrs" v-on="model.on" />
          </template>
        </g-dialog-editor>
      </v-toolbar>
      <slot name="table" v-bind="{ attrs: table.attrs, on: table.on }">
        <g-data-iterator v-bind="table.attrs" v-on="table.on">
          <template #col="{ attrs, on }">
            <g-action-card-simple-company v-bind="attrs" v-on="on" />
          </template>
        </g-data-iterator>
      </slot>
    </template>
  </a-collection-controller>
</template>

<style></style>
