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
        return [
          { text: '氏名', value: 'fullName' },
          { text: '社会保険', value: 'socialInsuranceStatus' },
        ]
      }
      return [
        { text: '枝番', value: 'healthInsuranceBranch' },
        { text: '氏名', value: 'fullName' },
        { text: '続柄', value: 'relation' },
        { text: '社会保険', value: 'socialInsuranceStatus' },
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
      <span>{{ item.fullName }}</span>
      <span>{{ `(${$dayjs().diff($dayjs(item.birth), 'year')})` }}</span>
      <v-chip v-if="item.isSpouse" class="ml-2" x-small color="secondary"
        >配偶者</v-chip
      >
    </template>
    <template #[`item.relation`]="{ item }">
      {{ $DEPENDENT_RELATION[item.relation] }}
    </template>
    <template #[`item.socialInsuranceStatus`]="{ item }">
      {{ $SOCIAL_INSURANCE_STATUS[item.socialInsuranceStatus] }}
    </template>
  </g-data-table>
</template>

<style></style>
