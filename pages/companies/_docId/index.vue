<script>
import GBtnMemberRegist from '~/components/molecules/btns/GBtnMemberRegist.vue'
import GCardCompanyInfo from '~/components/organisms/GCardCompanyInfo.vue'
import GDataIteratorMembers from '~/components/organisms/GDataIteratorMembers.vue'
import GMembers from '~/components/organisms/GMembers.vue'
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
    GDataIteratorMembers,
    GMembers,
    GBtnMemberRegist,
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
      <v-card>
        <v-card-title class="justify-space-between">
          <span>会員</span>
          <g-btn-member-regist />
        </v-card-title>
        <g-members v-slot="{ items }" :company-id="docId">
          <g-data-iterator-members
            :items="items"
            @click:detail="$router.push(`/members/${$event.docId}`)"
          />
        </g-members>
      </v-card>
    </v-col>
  </v-row>
</template>

<style></style>
