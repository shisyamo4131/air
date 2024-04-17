<script>
import GDetailCardDependent from '~/components/organisms/GDetailCardDependent.vue'
/**
 * ## page.members.docId.dependents.dependentId
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GDetailCardDependent },
  /***************************************************************************
   * ASYNCDATA
   ***************************************************************************/
  asyncData({ route }) {
    const memberId = route.params.docId
    const dependentId = route.params.dependentId
    return { memberId, dependentId }
  },
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="4">
      <g-detail-card-dependent
        :doc-id="dependentId"
        :member-id="memberId"
        :card-props="{ actions: ['edit', 'delete'] }"
        @submit:delete="$router.replace(`/members/${memberId}`)"
      />
    </v-col>
    <v-col cols="12" md="8"> </v-col>
  </v-row>
</template>

<style></style>
