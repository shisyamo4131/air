<script>
import { where } from 'firebase/firestore'
import AIconRegist from '../atoms/icons/AIconRegist.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputMember from '../molecules/inputs/GInputMember.vue'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
import ACollectionController from '../atoms/ACollectionController.vue'
import GActionCardSimpleMember from '~/components/molecules/cards/GActionCardSimpleMember.vue'
import GDataIterator from '~/components/molecules/tables/GDataIterator.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GDataIterator,
    GActionCardSimpleMember,
    GDialogEditor,
    AIconRegist,
    GInputMember,
    ACollectionController,
    GTextFieldSearch,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    companyId: { type: String, default: '', required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      items: [],
      listener: this.$Member(),
    }
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    companyId: {
      handler() {
        if (this.companyId) {
          this.items = this.listener.subscribe(undefined, [
            where('companyId', '==', this.companyId),
          ])
        } else {
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
    this.listener.unsubscribe()
  },
}
</script>

<template>
  <a-collection-controller
    v-bind="$attrs"
    :items="items"
    model-id="Member"
    :default-item="{ companyId }"
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
            <g-input-member v-bind="model.attrs" v-on="model.on" />
          </template>
        </g-dialog-editor>
      </v-toolbar>
      <slot name="table" v-bind="{ attrs: table.attrs, on: table.on }">
        <g-data-iterator v-bind="table.attrs" v-on="table.on">
          <template #col="{ attrs, on }">
            <g-action-card-simple-member v-bind="attrs" v-on="on" />
          </template>
        </g-data-iterator>
      </slot>
    </template>
  </a-collection-controller>
</template>

<style></style>
