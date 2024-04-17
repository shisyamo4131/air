<script>
import GInputCompany from '../molecules/inputs/GInputCompany.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GActionCard from '../molecules/cards/GActionCard.vue'
import ADocumentController from '~/components/atoms/ADocumentController.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GActionCard,
    GInputCompany,
    GDialogEditor,
    ADocumentController,
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
    v-slot="props"
    v-bind="$attrs"
    :doc-id="docId"
    label="会社"
    model-id="Company"
    v-on="$listeners"
  >
    <g-dialog-editor
      v-bind="props.dialog.attrs"
      max-width="600"
      v-on="props.dialog.on"
    >
      <template #form>
        <g-input-company v-bind="props.editor.attrs" v-on="props.editor.on" />
      </template>
    </g-dialog-editor>
    <g-action-card v-bind="props.card.attrs" v-on="props.card.on">
      <v-card-title class="justify-space-between">
        {{ props.model.name }}
      </v-card-title>
      <v-card-subtitle>{{ props.model.abbrKana }}</v-card-subtitle>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> 住所 </v-list-item-subtitle>
            <v-list-item-title>
              {{ props.model.fullAddress }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ props.model.address2 }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> 電話番号 </v-list-item-subtitle>
            <v-list-item-title>
              {{ props.model.tel }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> FAX番号 </v-list-item-subtitle>
            <v-list-item-title>
              {{ props.model.fax }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> 法人番号 </v-list-item-subtitle>
            <v-list-item-title>
              {{ props.model.companyNumber }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> インボイス番号 </v-list-item-subtitle>
            <v-list-item-title>
              {{ `T-${props.model.invoiceNumber}` }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> 事業所整理記号 </v-list-item-subtitle>
            <v-list-item-title>
              {{ props.model.jigyoushoSeiriKigou }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </g-action-card>
  </a-document-controller>
</template>

<style></style>
