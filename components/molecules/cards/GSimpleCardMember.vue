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
  <g-action-card v-slot="item" v-bind="$attrs" v-on="$listeners">
    <v-card-title class="justify-space-between">
      <span>
        {{ item.fullName }}
        <v-icon small>mdi-gender-{{ item.gender }}</v-icon>
      </span>
      <v-chip small>
        {{ $store.getters['companies/get'](item.companyId)?.abbr || '' }}
      </v-chip>
    </v-card-title>
    <v-card-subtitle>{{ item.fullNameKana }}</v-card-subtitle>
  </g-action-card>
</template>

<style></style>
