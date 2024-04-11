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
    :table-props="{
      'hide-pagination': true,
      actions: ['edit', 'delete', 'detail'],
    }"
    :col-props="{ cols: 12, sm: 6, md: 4, lg: 3 }"
    @click:detail="goToDetail($event.docId)"
  />
</template>

<style></style>
