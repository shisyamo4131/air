<script>
import GAutocomplete from './GAutocomplete.vue'
/**
 * ### GAutocompleteCompany
 *
 * @author shisyamo4131
 */
export default {
  /*******************************************************
   * COMPONENTS
   *******************************************************/
  components: { GAutocomplete },
  /*******************************************************
   * PROPS
   *******************************************************/
  props: {
    autoSelectFirst: { type: Boolean, default: true, required: false },
    itemText: {
      type: [String, Array, Function],
      default: () => (item) => {
        return `${item.name}`
      },
      required: false,
    },
  },
  /*******************************************************
   * DATA
   *******************************************************/
  data() {
    return {
      model: this.$Company(),
    }
  },
}
</script>

<template>
  <g-autocomplete
    v-bind="{ ...$props, ...$attrs }"
    :model="model"
    v-on="$listeners"
  >
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </g-autocomplete>
</template>

<style></style>
