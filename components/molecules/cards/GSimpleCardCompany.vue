<script>
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
    <v-list-item>
      <v-list-item-avatar>
        <v-avatar color="primary" dark size="36">
          <span class="white--text">
            {{ item.abbr.substr(0, 1) }}
          </span>
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ item.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ item.fullAddress }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </g-action-card>
</template>

<style></style>
