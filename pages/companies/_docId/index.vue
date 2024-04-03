<script>
import GCardCompanyInfo from '~/components/molecules/cards/GCardCompanyInfo.vue'
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
    <g-card-company-info :doc-id="docId" />
  </div>
</template>

<style></style>
