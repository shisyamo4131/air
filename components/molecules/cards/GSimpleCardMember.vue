<script>
import AIconDetail from '~/components/atoms/icons/AIconDetail.vue'
import { props } from '~/models/Member'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { AIconDetail },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [props],
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    docId: { type: String, required: true },
    fullName: { type: String, default: undefined, required: false },
    fullNameKana: { type: String, default: undefined, required: false },
  },
}
</script>

<template>
  <v-card>
    <v-card-title class="justify-space-between">
      <span>
        {{ fullName }}
        <v-icon small>mdi-gender-{{ gender }}</v-icon>
      </span>
      <v-chip small>
        {{ $store.getters['companies/get'](companyId)?.abbr || '' }}
      </v-chip>
    </v-card-title>
    <v-card-subtitle>{{ fullNameKana }}</v-card-subtitle>
    <v-card-actions class="justify-end">
      <v-btn icon @click="$emit('click:detail', docId)">
        <a-icon-detail />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style></style>
