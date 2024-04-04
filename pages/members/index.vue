<script>
import GDataIteratorMembers from '~/components/organisms/GDataIteratorMembers.vue'
/**
 * ### pages.companies.index
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GDataIteratorMembers,
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    /**
     * 引数で指定されたidの会員詳細画面に遷移します。
     */
    goToDetail(docId) {
      this.$router.push(`/members/${docId}`)
    },
  },
}
</script>

<template>
  <div>
    <g-data-iterator-members @submit="goToDetail" @click:detail="goToDetail" />
  </div>
</template>

<style></style>
