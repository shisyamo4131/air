<script>
import GManagerMembers from '~/components/organisms/GManagerMembers.vue'
/**
 * ### pages.members.index
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GManagerMembers,
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
  <g-manager-members
    label="会員"
    :dialog-props="{ 'max-width': 600 }"
    :table-props="{
      actions: ['edit', 'delete', 'detail'],
      'hide-pagination': true,
      cols: { cols: 12, sm: 6, md: 4, lg: 3 },
    }"
    @click:detail="goToDetail($event.docId)"
  >
  </g-manager-members>
</template>

<style></style>
