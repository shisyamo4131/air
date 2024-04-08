<script>
import GTextFieldSearch from '../inputs/GTextFieldSearch.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GTextFieldSearch },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    hideSearch: { type: Boolean, default: false, required: false },
    search: { type: String, default: undefined, required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      internalSearch: undefined,
      loading: false,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    computedSearch: {
      get() {
        return this.internalSearch
      },
      set(v) {
        this.internalSearch = v
        this.$emit('update:search', v)
      },
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    search: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.internalSearch = newVal
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <v-data-iterator v-bind="$attrs" v-on="$listeners">
    <template #header="props">
      <slot name="#header" v-bind="props">
        <v-toolbar v-if="!hideSearch" flat>
          <slot name="prepend-search" />
          <g-text-field-search v-model="computedSearch" />
          <slot name="append-search" />
        </v-toolbar>
      </slot>
    </template>
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-data-iterator>
</template>

<style></style>
