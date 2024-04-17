<script>
import GDocumentControllerMember from '~/components/organisms/GDocumentControllerMember.vue'
import GDataTableDependents from '~/components/molecules/tables/GDataTableDependents.vue'
import GManagerDependents from '~/components/organisms/GManagerDependents.vue'
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
    GDocumentControllerMember,
    GDataTableDependents,
    GManagerDependents,
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
      <g-document-controller-member
        :doc-id="docId"
        :card-props="{ actions: ['edit', 'delete'] }"
        @submit:delete="$router.replace(`/members`)"
      />
    </v-col>
    <v-col cols="12" md="8">
      <v-card>
        <v-card-title>被扶養者リスト</v-card-title>
        <g-manager-dependents
          label="被扶養者"
          :member-id="docId"
          :dialog-props="{ 'max-width': 600 }"
          :table-props="{
            actions: ['edit', 'delete', 'detail'],
          }"
          @click:detail="
            $router.push(`/members/${docId}/dependents/${$event.docId}`)
          "
        >
          <template #table="{ attrs, on }">
            <g-data-table-dependents
              v-bind="attrs"
              sort-by="healthInsuranceBranch"
              v-on="on"
            />
          </template>
        </g-manager-dependents>
      </v-card>
    </v-col>
  </v-row>
</template>

<style></style>
