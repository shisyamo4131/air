<script>
/**
 * ## GActionCardDetailCompany
 * @author shisyamo4131
 */
import GActionCard from './GActionCard.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GActionCard },
}
</script>

<template>
  <g-action-card v-slot="{ item }" v-bind="$attrs" v-on="$listeners">
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
</template>

<style></style>
