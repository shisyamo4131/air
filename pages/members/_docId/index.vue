<script>
import GCardMemberInfo from '~/components/molecules/cards/GCardMemberInfo.vue'
/**
 * ## page.members.docId
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GCardMemberInfo,
  },
  /***************************************************************************
   * ASYNCDATA
   ***************************************************************************/
  asyncData({ route }) {
    const docId = route.params.docId
    return { docId }
  },
}
</script>

<template>
  <div>
    <g-card-member-info :doc-id="docId" />
  </div>
</template>

<style></style>
