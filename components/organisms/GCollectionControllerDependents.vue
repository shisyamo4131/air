<script>
import AIconRegist from '../atoms/icons/AIconRegist.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
import GInputDependent from '../molecules/inputs/GInputDependent.vue'
import GSimpleCardDependent from '../molecules/cards/GSimpleCardDependent.vue'
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
    GSimpleCardDependent,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    memberId: { type: String, default: '', required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      items: [],
      listener: this.$Dependent(this.memberId),
    }
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    memberId: {
      handler(v) {
        if (this.listener) this.listener.unsubscribe()
        if (v) {
          this.listener = this.$Dependent(v)
          this.items = this.listener.subscribe()
        }
      },
      immediate: true,
    },
  },
  /***************************************************************************
   * DESTROYED
   ***************************************************************************/
  destroyed() {
    if (this.listener) this.listener.unsubscribe()
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
            <g-simple-card-dependent v-bind="attrs" v-on="on" />
          </template>
        </g-data-iterator>
      </slot>
    </template>
  </a-collection-controller>
</template>

<style></style>
