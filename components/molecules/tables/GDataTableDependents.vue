<script>
import GDataTable from './GDataTable.vue'
/**
 * ## GDataTableDependents
 * Dependents用DataTableコンポーネント
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
        { text: '続柄', value: 'relation' },
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
    <template #[`item.fullName`]="{ item }">
      {{ item.fullName
      }}<v-chip v-if="item.isSpouse" class="ml-2" x-small color="secondary"
        >配偶者</v-chip
      >
    </template>
    <template #[`item.relation`]="{ item }">
      {{ $DEPENDENT_RELATION[item.relation] }}
    </template>
  </g-data-table>
</template>

<style></style>
