<script>
import GManagerCompanies from '~/components/organisms/GManagerCompanies.vue'
/**
 * ### pages.companies.index
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GManagerCompanies,
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    /**
     * 引数で指定されたidの会社詳細画面に遷移します。
     */
    goToDetail(docId) {
      this.$router.push(`/companies/${docId}`)
    },
  },
}
</script>

<template>
  <g-manager-companies
    label="会社"
    :dialog-props="{ 'max-width': 600 }"
    :table-props="{
      actions: ['edit', 'delete', 'detail'],
      'hide-pagination': true,
      cols: { cols: 12, sm: 6, md: 4, lg: 3 },
    }"
    @click:detail="goToDetail($event.docId)"
  >
  </g-manager-companies>
</template>

<style></style>
