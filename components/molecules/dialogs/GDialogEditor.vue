<script>
import GBtnSubmit from '../btns/GBtnSubmit.vue'
import GBtnCancel from '../btns/GBtnCancel.vue'
import AIconClose from '~/components/atoms/icons/AIconClose.vue'
/**
 * ### GDialogEditor
 * データ編集用のv-cardコンポーネントを内包したdialogコンポーネントです。
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { AIconClose, GBtnSubmit, GBtnCancel },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    label: { type: String, default: undefined, required: false },
    loading: { type: Boolean, default: false, required: false },
    value: { type: Boolean, default: false, required: false },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    value(v) {
      if (!v) {
        document.getElementById(`scroll-container-${this._uid}`).scrollTop = 0
        this.$refs.form.resetValidation()
      }
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    validate() {
      const result = this.$refs.form.validate()
      if (!result) alert('入力に不備があります。')
      return result
    },
    submit() {
      if (!this.validate()) return
      this.$emit('click:submit')
    },
  },
}
</script>

<template>
  <v-dialog
    v-bind="$attrs"
    :value="value"
    scrollable
    eager
    persistent
    v-on="$listeners"
  >
    <template #activator="{ attrs, on }">
      <slot name="activator" v-bind="{ attrs, on }" />
    </template>
    <v-card>
      <v-card-title class="justify-space-between">
        <span>{{ label }}</span>
        <a-icon-close :disabled="loading" @click="$emit('input', false)" />
      </v-card-title>
      <v-card-text :id="`scroll-container-${_uid}`">
        <v-form ref="form" :disabled="loading">
          <slot name="form" />
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-space-around">
        <g-btn-cancel :disabled="loading" @click="$emit('input', false)" />
        <g-btn-submit :disabled="loading" :loading="loading" @click="submit" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style></style>
