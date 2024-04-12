<script>
import { doc, onSnapshot } from 'firebase/firestore'
import GDetailCardMember from '~/components/organisms/GDetailCardMember.vue'
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
    GDetailCardMember,
  },
  /***************************************************************************
   * ASYNCDATA
   ***************************************************************************/
  asyncData({ app, route }) {
    const docId = route.params.docId
    const member = app.$Member()
    const docRef = doc(app.$firestore, `Members/${docId}`)
    const listener = onSnapshot(docRef, (doc) => {
      member.initialize(doc.data())
    })
    return { docId, member, listener }
  },
  /***************************************************************************
   * DESTROYED
   ***************************************************************************/
  destroyed() {
    if (this.listener) this.listener()
  },
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="4">
      <g-detail-card-member
        :item="member"
        :card-props="{ actions: ['edit', 'delete'] }"
        @submit:delete="$router.replace(`/memberrs`)"
      />
    </v-col>
    <v-col cols="12" md="8">
      <!-- <v-card>
        <g-manager-members
          label="会員"
          :company-id="docId"
          :dialog-props="{ 'max-width': 600 }"
          :table-props="{
            actions: ['edit', 'delete'],
          }"
        >
          <template #table="{ attrs, on }">
            <g-data-table-members v-bind="attrs" v-on="on" />
          </template>
        </g-manager-members>
      </v-card> -->
    </v-col>
  </v-row>
</template>

<style></style>
