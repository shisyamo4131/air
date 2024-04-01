<script>
/**
 * ### GTextFieldPassword
 *
 * @author shisyamo4131
 */
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import ALabelInput from '~/components/atoms/labels/ALabelInput.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { ATextField, ALabelInput },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    rules: { type: Array, default: () => [], required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      charError: (v) =>
        /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,}$/i.test(v) || '8文字以上の英数字',
      show: false,
    }
  },
}
</script>

<template>
  <a-label-input v-bind="$attrs" v-on="$listeners">
    <template #default="{ attrs, on }">
      <a-text-field
        v-bind="attrs"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        counter
        :rules="[...rules, charError]"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        v-on="on"
      />
    </template>
  </a-label-input>
</template>
<style></style>
