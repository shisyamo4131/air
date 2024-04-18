<script>
import GInputMember from '../molecules/inputs/GInputMember.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GActionCardDetailMember from '../molecules/cards/GActionCardDetailMember.vue'
import ADocumentController from '~/components/atoms/ADocumentController.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GInputMember,
    GDialogEditor,
    ADocumentController,
    GActionCardDetailMember,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    docId: { type: String, required: true },
  },
}
</script>

<template>
  <a-document-controller
    v-bind="$attrs"
    :doc-id="docId"
    label="会員"
    model-id="Member"
    v-on="$listeners"
  >
    <template #default="{ dialog, editor, card }">
      <g-dialog-editor v-bind="dialog.attrs" max-width="600" v-on="dialog.on">
        <template #form>
          <g-input-member v-bind="editor.attrs" v-on="editor.on" />
        </template>
      </g-dialog-editor>
      <g-action-card-detail-member v-bind="card.attrs" v-on="card.on" />
    </template>
  </a-document-controller>
</template>

<style></style>
