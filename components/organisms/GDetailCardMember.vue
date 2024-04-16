<script>
import { getDownloadURL, ref } from 'firebase/storage'
import GInputMember from '../molecules/inputs/GInputMember.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GActionCard from '../molecules/cards/GActionCard.vue'
import AFileUploader from '../atoms/AFileUploader.vue'
import ADocumentController from '~/components/atoms/ADocumentController.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GActionCard,
    GInputMember,
    GDialogEditor,
    ADocumentController,
    AFileUploader,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    item: { type: Object, required: true },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      dialog: {
        insurance: false,
      },
      src: {
        insurance: null,
      },
      tab: null,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    company() {
      const result = this.$Company()
      result.initialize(
        this.$store.getters['companies/get'](this.item.companyId)
      )
      return result
    },
    age() {
      if (!this.item.birth) return undefined
      const result = this.$dayjs().diff(this.item.birth, 'year')
      return result
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    item: {
      handler(v) {
        if (!(v?.insuranceCardFile || undefined)) return
        const imageRef = ref(this.$storage, v.insuranceCardFile)
        getDownloadURL(imageRef)
          .then((downloadURL) => {
            this.src.insurance = downloadURL
          })
          .catch((err) => {
            // eslint-disable-next-line
            console.error(err)
            this.src.insurance = null
          })
      },
      immediate: true,
      deep: true,
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    onUploadComplete(event) {
      // this.src.insurance = event.url
      const model = this.$Member(this.item)
      model.insuranceCardFile = event.src
      model.insuranceCardFileThumb = event.thumb
      model.update()
    },
  },
}
</script>

<template>
  <a-document-controller
    v-slot="props"
    v-bind="{ ...$attrs, item }"
    label="会員"
    model-id="Member"
    v-on="$listeners"
  >
    <g-dialog-editor
      v-bind="props.dialog.attrs"
      max-width="600"
      v-on="props.dialog.on"
    >
      <template #form>
        <g-input-member v-bind="props.model.attrs" v-on="props.model.on" />
      </template>
    </g-dialog-editor>
    <g-action-card v-bind="props.card.attrs" v-on="props.card.on">
      <v-card-title class="justify-space-between">
        {{ item.fullName }}
        <v-dialog v-model="dialog.insurance" max-width="360">
          <template #activator="{ attrs, on }">
            <v-icon v-bind="attrs" v-on="on">mdi-card-bulleted-outline</v-icon>
          </template>
          <v-card>
            <v-container
              class="d-flex flex-column justify-space-between align-center"
            >
              <v-img v-if="src.insurance" :src="src.insurance" />
              <v-card v-else outlined style="width: 100%; height: 180px">
                <v-container
                  class="d-flex justify-center align-center"
                  style="height: 100%"
                >
                  <h1>NO IMAGE</h1>
                </v-container>
              </v-card>
            </v-container>
            <v-container>
              <a-file-uploader
                v-slot="{ attrs, on, uploader }"
                :path="`Images/Members/${item.docId}`"
                file-name="insurance"
                @upload:complete="onUploadComplete"
              >
                <v-file-input v-bind="attrs" v-on="on">
                  <template #append-outer>
                    <v-btn icon v-bind="uploader.attrs" v-on="uploader.on">
                      <v-icon>mdi-upload-box-outline</v-icon>
                    </v-btn>
                  </template>
                </v-file-input>
              </a-file-uploader>
            </v-container>
          </v-card>
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
              {{
                item.registrationDate
                  ? $dayjs(item.registrationDate).format('YYYY年MM月DD日 登録')
                  : ''
              }}
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
                  {{
                    item.birth
                      ? $dayjs(item.birth).format('YYYY年MM月DD日')
                      : ''
                  }}
                  ({{ `${age ? age : '--'}才` }})
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
  </a-document-controller>
</template>

<style></style>
