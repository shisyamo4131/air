<script>
import GDataTable from './GDataTable.vue'
/**
 * ## GDataTableCompanies
 * Companies用DataTableコンポーネント
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GDataTable },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {},
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    headers() {
      if (this.$vuetify.breakpoint.xs) {
        return [{ text: '氏名', value: 'fullName' }]
      }
      return [
        { text: '氏名', value: 'fullName' },
        { text: '状態', value: 'status', sortable: false },
      ]
    },
  },
}
</script>

<template>
  <g-data-table
    v-bind="{ ...$props, ...$attrs }"
    :headers="headers"
    :mobile-breakpoint="0"
    v-on="$listeners"
  >
    <template #[`item.status`]="{ item }">
      {{ $MEMBER_STATUS[item.status] }}
    </template>
  </g-data-table>
</template>

<style></style>
