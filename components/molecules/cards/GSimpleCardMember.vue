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
    <v-list-item>
      <v-list-item-avatar>
        <v-avatar color="primary" dark size="36">
          <span class="white--text">
            {{ item.fullName.substr(0, 1) }}
          </span>
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <span>
            {{ item.fullName }}
            <v-icon small>mdi-gender-{{ item.gender }}</v-icon>
          </span>
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ item.fullNameKana }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-chip small>
        {{ $store.getters['companies/get'](item.companyId)?.abbr || '' }}
      </v-chip>
      <v-chip v-if="item.job" small>
        {{ item.job }}
      </v-chip>
    </v-card-text>
  </g-action-card>
</template>

<style></style>
