<script>
import AIconDelete from '~/components/atoms/icons/AIconDelete.vue'
import AIconDetail from '~/components/atoms/icons/AIconDetail.vue'
import AIconEdit from '~/components/atoms/icons/AIconEdit.vue'
/**
 * ## GSimpleCard
 * 情報をシンプルに表示するためのカードコンポーネントです。
 *
 * ### PROPS
 * #### actions
 * VCardActionsに表示するボタンを文字列で指定します。
 * 指定できるのは指定できるのは'edit'、'delete'、'detail'です。
 *
 * ### SLOTS
 * #### default
 * メインコンポーネントです。
 *
 * #### append-actions
 * VCardActionsの後部にボタンを追加するために使用します。
 *
 * #### prepend-actions
 * VCardActionsの前部にボタンを追加するために使用します。
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { AIconEdit, AIconDelete, AIconDetail },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    actions: {
      type: Array,
      default: () => [],
      validator: (v) =>
        !v.length ||
        v.some((item) => ['edit', 'delete', 'detail'].includes(item)),
      required: false,
    },
  },
}
</script>

<template>
  <v-card v-bind="$attrs">
    <slot name="default" />
    <v-card-actions class="justify-end">
      <slot name="prepend-actions" />
      <v-btn
        v-for="(action, index) of actions"
        :key="index"
        icon
        @click="$emit(`click:${action}`)"
      >
        <component :is="`a-icon-${action}`" />
      </v-btn>
      <slot name="append-actions" />
    </v-card-actions>
  </v-card>
</template>

<style></style>
