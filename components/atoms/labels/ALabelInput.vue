<script>
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    label: { type: String, default: undefined, required: false },
    required: { type: Boolean, default: false, required: false },
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    style() {
      const isMobile = this.$vuetify.breakpoint.mobile
      return {
        width: isMobile ? '100%' : '120px',
        height: isMobile ? '24px' : '40px',
        'min-width': isMobile ? '100%' : '120px',
        'word-break': 'break-all',
        'padding-left': isMobile ? '4px' : '0px',
      }
    },
  },
}
</script>

<template>
  <div :class="{ 'd-flex': !$vuetify.breakpoint.mobile }">
    <div
      class="d-inline-flex align-center air-label text-caption pr-1"
      :style="style"
    >
      {{ label }}<span v-if="required" class="red--text">*</span>
    </div>
    <slot
      name="default"
      v-bind="{ attrs: { ...$attrs, required }, on: $listeners }"
    />
  </div>
</template>

<style></style>
