<script>
import GDetailCardCompany from '~/components/organisms/GDetailCardCompany.vue'
import GManagerMembers from '~/components/organisms/GManagerMembers.vue'
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
    GDetailCardCompany,
    GManagerMembers,
  },
  /***************************************************************************
   * ASYNCDATA
   ***************************************************************************/
  asyncData({ route }) {
    const docId = route.params.docId
    return { docId }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    company() {
      return this.$store.getters['companies/get'](this.docId)
    },
  },
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="4">
      <g-detail-card-company
        :item="company"
        :card-props="{ actions: ['edit', 'delete'] }"
        @submit:delete="$router.replace(`/companies`)"
      />
    </v-col>
    <v-col cols="12" md="8">
      <g-manager-members
        label="会員"
        :company-id="docId"
        :dialog-props="{ 'max-width': 600 }"
        :table-props="{
          actions: ['edit', 'delete'],
        }"
      />
    </v-col>
  </v-row>
</template>

<style></style>
