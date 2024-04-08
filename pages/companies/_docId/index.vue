<script>
import GCrudCardMembers from '~/components/organisms/cruds/GCrudCardMembers.vue'
import GCardCompanyInfo from '~/components/organisms/GCardCompanyInfo.vue'
/**
 * ## page.companies.docId
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GCardCompanyInfo,
    GCrudCardMembers,
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
  <v-row>
    <v-col cols="12" md="4">
      <g-card-company-info :doc-id="docId" />
    </v-col>
    <v-col cols="12" md="8">
      <g-crud-card-members :company-id="docId" />
    </v-col>
  </v-row>
</template>

<style></style>
