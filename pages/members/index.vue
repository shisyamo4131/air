<script>
import GCollectionControllerMembers from '~/components/organisms/GCollectionControllerMembers.vue'
/**
 * ### pages.members.index
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GCollectionControllerMembers,
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
  <g-collection-controller-members
    label="会員"
    :actions="['edit', 'delete', 'detail']"
    :dialog-props="{ 'max-width': 600 }"
    :table-props="{
      'hide-pagination': true,
      cols: { cols: 12, sm: 6, md: 4, lg: 3 },
      'sort-by': 'fullNameKana',
    }"
    @click:detail="goToDetail($event.docId)"
  >
  </g-collection-controller-members>
</template>

<style></style>
