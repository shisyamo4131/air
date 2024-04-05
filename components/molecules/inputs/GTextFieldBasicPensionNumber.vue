<script>
import GTextField from './GTextField.vue'
/**
 * ### GTextFieldBasicPensionNumber
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
    label: { type: String, default: '基礎年金番号', required: false },
  },
  /***************************************************************************
   * data
   ***************************************************************************/
  data() {
    return {
      rules: {
        char: (v) => !v || /^\d*$/.test(v) || '半角数字のみ',
        length: (v) => !v || v.length === 10 || '10桁で入力',
      },
    }
  },
}
</script>

<template>
  <g-text-field
    v-bind="{ ...$props, ...$attrs }"
    counter
    maxlength="10"
    hint="ハイフン不要"
    :rules="[rules.char, rules.length]"
    v-on="$listeners"
  />
</template>

<style></style>
