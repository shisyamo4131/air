<script>
/**
 * ### GIconGender
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    gender: {
      type: String,
      validator: (v) => ['male', 'female'].includes(v),
      required: true,
    },
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    computedColor() {
      if (this.$attrs.color) return this.$attrs.color
      return this.gender === 'male' ? 'blue' : 'pink'
    },
  },
}
</script>

<template>
  <v-icon v-bind="$attrs" :color="computedColor" v-on="$listeners">
    {{ `mdi-gender-${gender}` }}
  </v-icon>
</template>

<style></style>
