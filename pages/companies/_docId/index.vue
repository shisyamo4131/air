<script>
import GSimpleCardCompany from '~/components/molecules/cards/GSimpleCardCompany.vue'
// import GCrudCardMembers from '~/components/organisms/cruds/GCrudCardMembers.vue'
// import GCardCompanyInfo from '~/components/organisms/GCardCompanyInfo.vue'
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
    // GCardCompanyInfo,
    // GCrudCardMembers,
    GSimpleCardCompany,
  },
  /***************************************************************************
   * ASYNCDATA
   ***************************************************************************/
  asyncData({ route }) {
    const docId = route.params.docId
    return { docId }
  },
  computed: {
    model() {
      return this.$store.getters['companies/get'](this.docId)
    },
  },
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="4">
      <g-simple-card-company v-bind="model" />
      <!-- <g-card-company-info :doc-id="docId" /> -->
    </v-col>
    <v-col cols="12" md="8">
      <!-- <g-crud-card-members :company-id="docId" /> -->
    </v-col>
  </v-row>
</template>

<style></style>
