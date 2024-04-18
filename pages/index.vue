<script>
import { limit, orderBy } from 'firebase/firestore'
import GChipCompany from '~/components/molecules/chips/GChipCompany.vue'
export default {
  name: 'IndexPage',
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GChipCompany },
  /***************************************************************************
   * ASYNCDATA
   ***************************************************************************/
  asyncData({ app }) {
    const member = app.$Member()
    const members = member.subscribe(undefined, [
      orderBy('registrationDate', 'desc'),
      limit(5),
    ])
    return { member, members }
  },
  /***************************************************************************
   * DESTROYED
   ***************************************************************************/
  destroyed() {
    this.member.unsubscribe()
  },
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" sm="6" lg="3">
          <v-card>
            <v-card-text>
              <div class="d-flex align-center">
                <v-avatar>
                  <v-icon>mdi-account-group</v-icon>
                </v-avatar>
                <div>
                  <h4>会員数</h4>
                  <h2>{{ members.length }}名</h2>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>新規会員</v-card-title>
        <v-card-text class="overflow-x-auto">
          <v-simple-table class="table-members">
            <thead>
              <tr>
                <th>氏名</th>
                <th>登録日</th>
                <th>所属</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) of members" :key="index">
                <td>{{ item.fullName }}</td>
                <td>{{ item.registrationDate }}</td>
                <td>
                  <g-chip-company
                    :company-id="item.companyId"
                    x-small
                    color="primary"
                  />
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.table-members th:nth-child(1) {
  min-width: 108px;
}
.table-members th:nth-child(2) {
  min-width: 108px;
}
.table-members th:nth-child(3) {
  min-width: 96px;
}
</style>
