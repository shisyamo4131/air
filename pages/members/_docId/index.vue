<script>
import GCardMemberInfo from '~/components/organisms/GCardMemberInfo.vue'
import GCardDependents from '~/components/organisms/GCardDependents.vue'
/**
 * ## page.members.docId
 *
 * @author shisyamo4131
 */
export default {
  components: { GCardMemberInfo, GCardDependents },
  asyncData({ route }) {
    const docId = route.params.docId
    return { docId }
  },
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="4">
      <g-card-member-info :doc-id="docId" />
    </v-col>
    <v-col cols="12" md="8">
      <g-card-dependents :member-id="docId" />
    </v-col>
  </v-row>
</template>

<style></style>
