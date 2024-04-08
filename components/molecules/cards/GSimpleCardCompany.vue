<script>
import AIconDetail from '~/components/atoms/icons/AIconDetail.vue'
import { props } from '~/models/Company'
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
    fullAddress: { type: String, default: undefined, required: false },
  },
}
</script>

<template>
  <v-card>
    <v-list-item>
      <v-list-item-avatar>
        <v-avatar color="primary" dark size="36">
          <span class="white--text">
            {{ abbr.substr(0, 1) }}
          </span>
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ fullAddress }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions class="justify-end">
      <v-btn icon @click="$emit('click:detail', docId)">
        <a-icon-detail />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style></style>
