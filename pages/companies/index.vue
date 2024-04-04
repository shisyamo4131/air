<script>
import GDataIteratorCompanies from '~/components/organisms/GDataIteratorCompanies.vue'
/**
 * ### pages.companies.index
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GDataIteratorCompanies,
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
  <g-data-iterator-companies @submit="goToDetail" @click:detail="goToDetail" />
</template>

<style></style>
