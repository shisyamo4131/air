<script>
import AIconRegist from '../atoms/icons/AIconRegist.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputMember from '../molecules/inputs/GInputMember.vue'
import GCollectionController from './GCollectionController.vue'
import GSimpleCardMember from '~/components/molecules/cards/GSimpleCardMember.vue'
import GDataIterator from '~/components/molecules/tables/GDataIterator.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GDataIterator,
    GSimpleCardMember,
    GDialogEditor,
    AIconRegist,
    GInputMember,
    GCollectionController,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    companyId: { type: String, default: undefined, required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      items: [],
    }
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    companyId: {
      handler() {
        this.items = this.$Member().subscribe()
      },
      immediate: true,
    },
  },
  /***************************************************************************
   * DESTROYED
   ***************************************************************************/
  destroyed() {
    this.model.unsubscribe()
  },
}
</script>

<template>
  <g-collection-controller
    v-bind="$attrs"
    :items="items"
    label="会員"
    model-id="Member"
    v-on="$listeners"
  >
    <template #default="{ model, dialog, table }">
      <g-data-iterator v-bind="table.attrs" v-on="table.on">
        <template #append-search>
          <g-dialog-editor
            v-bind="dialog.attrs"
            max-width="600"
            v-on="dialog.on"
          >
            <template #activator="{ attrs, on }">
              <v-btn v-bind="attrs" icon v-on="on">
                <a-icon-regist />
              </v-btn>
            </template>
            <template #form>
              <g-input-member v-bind="model.attrs" v-on="model.on" />
            </template>
          </g-dialog-editor>
        </template>
        <template #col="{ attrs, on }">
          <g-simple-card-member v-bind="attrs" v-on="on" />
        </template>
      </g-data-iterator>
    </template>
  </g-collection-controller>
</template>

<style></style>
