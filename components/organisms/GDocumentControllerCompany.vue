<script>
import GInputCompany from '../molecules/inputs/GInputCompany.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GActionCardDetailCompany from '../molecules/cards/GActionCardDetailCompany.vue'
import ADocumentController from '~/components/atoms/ADocumentController.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GInputCompany,
    GDialogEditor,
    ADocumentController,
    GActionCardDetailCompany,
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
    label="会社"
    model-id="Company"
    v-on="$listeners"
  >
    <template #default="{ dialog, editor, card }">
      <g-dialog-editor v-bind="dialog.attrs" max-width="600" v-on="dialog.on">
        <template #form>
          <g-input-company v-bind="editor.attrs" v-on="editor.on" />
        </template>
      </g-dialog-editor>
      <g-action-card-detail-company v-bind="card.attrs" v-on="card.on" />
    </template>
  </a-document-controller>
</template>

<style></style>
