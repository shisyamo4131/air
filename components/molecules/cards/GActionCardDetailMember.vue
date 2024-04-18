<script>
import { doc, updateDoc } from 'firebase/firestore'
import GUploaderInsuranceCard from '../uploaders/GUploaderInsuranceCard.vue'
import GActionCard from './GActionCard.vue'
/**
 * ## GActionCardDetailMember
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GActionCard, GUploaderInsuranceCard },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      dialog: false,
      tab: null,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    age() {
      const birth = this.$attrs.item.birth
      return birth ? this.$dayjs().diff(birth, 'year') : -1
    },
    company() {
      const companyId = this.$attrs.item.companyId
      const item = this.$store.getters['companies/get'](companyId)
      return this.$Company(item)
    },
    formatBirth() {
      const birth = this.$attrs.item.birth
      if (!birth) return '--年--月--日'
      return this.$dayjs(birth).format('YYYY年MM月DD日')
    },
    formatRegistrationDate() {
      const date = this.$attrs.item.registrationDate
      if (!date) return '--年--月--日'
      return this.$dayjs(date).format('YYYY年MM月DD日')
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    async onUploadComplete(event) {
      const docRef = doc(this.$firestore, `Members/${this.$attrs.item.docId}`)
      await updateDoc(docRef, {
        insuranceCardFile: event.url,
        insuranceCardFileThumb: event.thumb,
      })
    },
  },
}
</script>

<template>
  <g-action-card v-slot="{ item }" v-bind="$attrs" v-on="$listeners">
    <v-card-title class="justify-space-between">
      {{ item.fullName }}
      <v-dialog v-model="dialog" max-width="360">
        <template #activator="{ attrs, on }">
          <v-icon v-bind="attrs" v-on="on">mdi-card-bulleted-outline</v-icon>
        </template>
        <g-uploader-insurance-card
          :directory="item.imageDir"
          :src="item.insuranceCardFile"
          @upload:complete="onUploadComplete"
        />
      </v-dialog>
    </v-card-title>
    <v-card-subtitle>{{ item.fullNameKana }}</v-card-subtitle>
    <v-list>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>
            {{ company.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ `${formatRegistrationDate} 登録` }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-tabs v-model="tab">
      <v-tab>基本情報</v-tab>
      <v-tab>社会保障</v-tab>
      <v-tab>職業</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-list>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle> 生年月日 </v-list-item-subtitle>
              <v-list-item-title>
                {{ `${formatBirth} (${age}歳)` }}
              </v-list-item-title>
              <v-list-item-subtitle v-if="age >= 69" class="error--text">
                <v-icon left small color="error">mdi-information</v-icon
                >脱退年齢に近づいています。
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle> 住所 </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ `〒${item.zipcode}` }}
              </v-list-item-subtitle>
              <v-list-item-title>
                {{ item.fullAddress }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.address2 }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle> 連絡先 </v-list-item-subtitle>
              <v-list-item-title>
                {{ item.mobile }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle> email </v-list-item-subtitle>
              <v-list-item-title>
                {{ item.email }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-tab-item>
      <v-tab-item>
        <v-list>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>基礎年金番号</v-list-item-subtitle>
              <v-list-item-title>
                {{ item.basicPensionNumber }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>マイナンバー</v-list-item-subtitle>
              <v-list-item-title>
                {{ item.myNumber }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>被保険者番号</v-list-item-subtitle>
              <v-list-item-title
                v-if="item.socialInsuranceStatus === '2:completed'"
              >
                {{ item.healthInsuranceNumber }}
              </v-list-item-title>
              <v-list-item-title v-else>
                {{ $SOCIAL_INSURANCE_STATUS[item.socialInsuranceStatus] }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-tab-item>
      <v-tab-item>
        <v-list>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>職業</v-list-item-subtitle>
              <v-list-item-title>
                {{ item.job }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>屋号</v-list-item-subtitle>
              <v-list-item-title>
                {{ item.jobName }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
    <v-card-text v-if="item.remarks">
      {{ item.remarks }}
    </v-card-text>
  </g-action-card>
</template>

<style></style>
