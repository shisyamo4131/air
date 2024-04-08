<script>
import GMembers from '../GMembers.vue'
import GBtnMemberRegist from '~/components/molecules/btns/GBtnMemberRegist.vue'
import GDataTableMembers from '~/components/molecules/tables/GDataTableMembers.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GBtnMemberRegist, GDataTableMembers, GMembers },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    companyId: { type: String, default: undefined, required: false },
    dataTableProps: {
      type: Object,
      default: () => {
        return {
          itemsPerPage: 5,
          actions: ['edit', 'delete', 'detail'],
        }
      },
      required: false,
    },
  },
}
</script>

<template>
  <v-card v-bind="$attrs" v-on="$listeners">
    <v-card-title class="justify-space-between">
      <span>会員リスト</span>
      <g-btn-member-regist />
    </v-card-title>
    <g-members v-slot="{ items }" :company-id="companyId">
      <slot name="data-table" v-bind="{ items }">
        <g-data-table-members :items="items" v-bind="dataTableProps" />
      </slot>
    </g-members>
  </v-card>
</template>

<style></style>
