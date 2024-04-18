<script>
import GCollectionControllerCompanies from '~/components/organisms/GCollectionControllerCompanies.vue'
/**
 * ### pages.companies.index
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GCollectionControllerCompanies,
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
  <g-collection-controller-companies
    label="会社"
    :dialog-props="{ 'max-width': 600 }"
    :table-props="{
      actions: ['edit', 'delete', 'detail'],
      'hide-pagination': true,
      cols: { cols: 12, sm: 6, md: 4, lg: 3 },
    }"
    @click:detail="goToDetail($event.docId)"
  >
  </g-collection-controller-companies>
</template>

<style></style>
