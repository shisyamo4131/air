<script>
import GTextField from './GTextField.vue'
/**
 * ### GTextFieldMyNumber
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GTextField },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    label: { type: String, default: '個人番号', required: false },
  },
  data() {
    return {
      rules: {
        char: (v) => !v || /^\d*$/.test(v) || '半角数字のみ',
        length: (v) => !v || v.length === 12 || '12桁で入力',
      },
    }
  },
}
</script>

<template>
  <g-text-field
    v-bind="{ ...$props, ...$attrs }"
    counter
    maxlength="12"
    hint="ハイフン不要"
    :rules="[rules.char, rules.length]"
    v-on="$listeners"
  />
</template>

<style></style>
