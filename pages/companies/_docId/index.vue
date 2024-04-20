<script>
import GDataTableMembers from '~/components/molecules/tables/GDataTableMembers.vue'
import GDocumentControllerCompany from '~/components/organisms/GDocumentControllerCompany.vue'
import GCollectionControllerMembers from '~/components/organisms/GCollectionControllerMembers.vue'
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
    GDocumentControllerCompany,
    GCollectionControllerMembers,
    GDataTableMembers,
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
      <g-document-controller-company
        :doc-id="docId"
        :actions="['edit', 'delete']"
        @submit:delete="$router.replace(`/companies`)"
      />
    </v-col>
    <v-col cols="12" md="8">
      <v-card>
        <v-card-title>会員リスト</v-card-title>
        <g-collection-controller-members
          label="会員"
          :company-id="docId"
          :dialog-props="{ 'max-width': 600 }"
          :actions="['edit', 'delete', 'detail']"
          @click:detail="$router.push(`/Members/${$event.docId}`)"
        >
          <template #table="{ attrs, on }">
            <g-data-table-members
              v-bind="attrs"
              sort-by="healthInsuranceNumber"
              v-on="on"
            />
          </template>
        </g-collection-controller-members>
      </v-card>
    </v-col>
  </v-row>
</template>

<style></style>
