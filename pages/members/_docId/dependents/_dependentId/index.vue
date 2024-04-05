<script>
import GCardDependentInfo from '~/components/organisms/GCardDependentInfo.vue'
/**
 * ## page.members.docId.dependents.dependentId
 *
 * @author shisyamo4131
 */
export default {
  components: { GCardDependentInfo },
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
      <g-card-dependent-info
        :dependent-id="dependentId"
        :member-id="memberId"
        @removed="$router.replace(`/members/${memberId}`)"
      />
    </v-col>
    <v-col cols="12" md="8"> </v-col>
  </v-row>
</template>

<style></style>
