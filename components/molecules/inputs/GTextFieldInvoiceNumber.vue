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
    label: { type: String, default: 'インボイス番号', required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      rules: {
        char: (v) => !v || /^\d*$/.test(v) || '半角数字のみ',
        length: (v) => !v || v.length === 13 || '13桁で入力',
      },
    }
  },
}
</script>

<template>
  <g-text-field
    v-bind="{ ...$props, ...$attrs }"
    counter
    maxlength="13"
    hint="ハイフン不要"
    prefix="T"
    :rules="[rules.char, rules.length]"
    v-on="$listeners"
  />
</template>

<style></style>
