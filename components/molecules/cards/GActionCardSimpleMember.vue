<script>
import GIconGender from '../icons/GIconGender.vue'
import GActionCard from './GActionCard.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GActionCard, GIconGender },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    color() {
      if (!this.$attrs.item.fullNameKana) return ''
      const code = [...this.$attrs.item.fullNameKana].reduce((sum, i) => {
        sum += i.charCodeAt(0)
        return sum
      }, 0)
      return `hsl(${Number(code) % 360}, 100%, 40%)`
    },
  },
}
</script>

<template>
  <g-action-card v-slot="{ item }" v-bind="$attrs" v-on="$listeners">
    <v-card-title>
      <div
        style="
          border-left-color: primary;
          border-left-style: dotted;
          padding-left: 16px;
        "
      >
        {{ item.fullName }}
      </div>
      <g-icon-gender :gender="item.gender" small />
    </v-card-title>
    <v-card-subtitle style="padding-left: 36px">
      {{ item.fullNameKana }}
    </v-card-subtitle>
  </g-action-card>
</template>

<style></style>
