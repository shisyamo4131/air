<script>
import AIconRegist from '../atoms/icons/AIconRegist.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
import GInputDependent from '../molecules/inputs/GInputDependent.vue'
import GActionCardSimpleDependent from '../molecules/cards/GActionCardSimpleDependent.vue'
import ACollectionController from '../atoms/ACollectionController.vue'
import GDataIterator from '~/components/molecules/tables/GDataIterator.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GDataIterator,
    GDialogEditor,
    AIconRegist,
    ACollectionController,
    GTextFieldSearch,
    GInputDependent,
    GActionCardSimpleDependent,
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
      items: [],
      listener: null,
    }
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    memberId: {
      handler(v) {
        if (this.listener) this.listener.unsubscribe()
        this.listener = this.$Dependent(v)
        this.items = this.listener.subscribe()
      },
      immediate: true,
    },
  },
  /***************************************************************************
   * DESTROYED
   ***************************************************************************/
  destroyed() {
    this.listener.unsubscribe()
  },
}
</script>

<template>
  <a-collection-controller
    v-bind="$attrs"
    :items="items"
    model-id="Dependent"
    :parent-id="memberId"
    :default-item="{ memberId }"
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
            <g-input-dependent v-bind="model.attrs" v-on="model.on" />
          </template>
        </g-dialog-editor>
      </v-toolbar>
      <slot name="table" v-bind="{ attrs: table.attrs, on: table.on }">
        <g-data-iterator v-bind="table.attrs" v-on="table.on">
          <template #col="{ attrs, on }">
            <g-action-card-simple-dependent v-bind="attrs" v-on="on" />
          </template>
        </g-data-iterator>
      </slot>
    </template>
  </a-collection-controller>
</template>

<style></style>
