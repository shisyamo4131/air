<script>
import GInputCompany from '../molecules/inputs/GInputCompany.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GActionCard from '../molecules/cards/GActionCard.vue'
import GDocumentController from '~/components/organisms/GDocumentController.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GActionCard,
    GInputCompany,
    GDialogEditor,
    GDocumentController,
  },
}
</script>

<template>
  <g-document-controller
    v-slot="props"
    v-bind="$attrs"
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
        <g-input-company v-bind="props.model.attrs" v-on="props.model.on" />
      </template>
    </g-dialog-editor>
    <g-action-card v-slot="item" v-bind="props.card.attrs" v-on="props.card.on">
      <v-card-title class="justify-space-between">
        {{ item.name }}
      </v-card-title>
      <v-card-subtitle>{{ item.abbrKana }}</v-card-subtitle>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> 住所 </v-list-item-subtitle>
            <v-list-item-title>
              {{ item.fullAddress }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.address2 }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> 電話番号 </v-list-item-subtitle>
            <v-list-item-title>
              {{ item.tel }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> FAX番号 </v-list-item-subtitle>
            <v-list-item-title>
              {{ item.fax }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> 法人番号 </v-list-item-subtitle>
            <v-list-item-title>
              {{ item.companyNumber }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> インボイス番号 </v-list-item-subtitle>
            <v-list-item-title>
              {{ `T-${item.invoiceNumber}` }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> 事業所整理記号 </v-list-item-subtitle>
            <v-list-item-title>
              {{ item.jigyoushoSeiriKigou }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </g-action-card>
  </g-document-controller>
</template>

<style></style>
