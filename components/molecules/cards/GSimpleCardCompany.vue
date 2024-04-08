<script>
import GSimpleCard from './GSimpleCard.vue'
import { props } from '~/models/Company'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GSimpleCard },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [props],
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    fullAddress: { type: String, default: undefined, required: false },
  },
}
</script>

<template>
  <g-simple-card v-bind="$attrs" v-on="$listeners">
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
  </g-simple-card>
</template>

<style></style>
