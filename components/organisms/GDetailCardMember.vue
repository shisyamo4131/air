<script>
import { doc, updateDoc } from 'firebase/firestore'
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
    docId: { type: String, required: true },
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
   * METHODS
   ***************************************************************************/
  methods: {
    getAge(birth) {
      if (!birth) return -1
      const result = this.$dayjs().diff(birth, 'year')
      return result
    },
    formatDate(date) {
      if (!date) return '--年--月--日'
      return this.$dayjs(date).format('YYYY年MM月DD日')
    },
    async onUploadComplete(event) {
      const docRef = doc(this.$firestore, `Members/${this.docId}`)
      await updateDoc(docRef, {
        insuranceCardFile: event.url,
        insuranceCardFileThumb: event.thumb,
      })
    },
  },
}
</script>

<template>
  <a-document-controller
    v-slot="props"
    v-bind="$attrs"
    :doc-id="docId"
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
        <g-input-member v-bind="props.editor.attrs" v-on="props.editor.on" />
      </template>
    </g-dialog-editor>
    <g-action-card v-bind="props.card.attrs" v-on="props.card.on">
      <v-card-title class="justify-space-between">
        {{ props.model.fullName }}
        <v-dialog v-model="dialog.insurance" max-width="360">
          <template #activator="{ attrs, on }">
            <v-icon v-bind="attrs" v-on="on">mdi-card-bulleted-outline</v-icon>
          </template>
          <v-card>
            <v-container
              class="d-flex flex-column justify-space-between align-center"
            >
              <v-img
                v-if="props.model.insuranceCardFile"
                :src="props.model.insuranceCardFile"
              />
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
                :directory="`Images/Members/${props.model.docId}`"
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
      <v-card-subtitle>{{ props.model.fullNameKana }}</v-card-subtitle>
      <v-list>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>
              {{
                $store.getters['companies/get'](props.model.companyId)?.name ||
                '...loading'
              }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ `${formatDate(props.model.registrationDate)} 登録` }}
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
                  {{ `${formatDate(props.model.birth)}` }}
                  ({{ `${getAge(props.model.birth)} 才` }})
                </v-list-item-title>
                <v-list-item-subtitle v-if="getAge >= 69" class="error--text">
                  <v-icon left small color="error">mdi-information</v-icon
                  >脱退年齢に近づいています。
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle> 住所 </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ `〒${props.model.zipcode}` }}
                </v-list-item-subtitle>
                <v-list-item-title>
                  {{ props.model.fullAddress }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ props.model.address2 }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle> 連絡先 </v-list-item-subtitle>
                <v-list-item-title>
                  {{ props.model.mobile }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle> email </v-list-item-subtitle>
                <v-list-item-title>
                  {{ props.model.email }}
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
                  {{ props.model.basicPensionNumber }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>マイナンバー</v-list-item-subtitle>
                <v-list-item-title>
                  {{ props.model.myNumber }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>被保険者番号</v-list-item-subtitle>
                <v-list-item-title
                  v-if="props.model.socialInsuranceStatus === '2:completed'"
                >
                  {{ props.model.healthInsuranceNumber }}
                </v-list-item-title>
                <v-list-item-title v-else>
                  {{
                    $SOCIAL_INSURANCE_STATUS[props.model.socialInsuranceStatus]
                  }}
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
                  {{ props.model.job }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>屋号</v-list-item-subtitle>
                <v-list-item-title>
                  {{ props.model.jobName }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
      <v-card-text v-if="props.model.remarks">
        {{ props.model.remarks }}
      </v-card-text>
    </g-action-card>
  </a-document-controller>
</template>

<style></style>
