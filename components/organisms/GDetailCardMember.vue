<script>
import GInputMember from '../molecules/inputs/GInputMember.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GActionCard from '../molecules/cards/GActionCard.vue'
import GDocumentController from '~/components/organisms/GDocumentController.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GActionCard,
    GInputMember,
    GDialogEditor,
    GDocumentController,
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
}
</script>

<template>
  <g-document-controller
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
          </v-list>
        </v-tab-item>
      </v-tabs-items>
      <v-card-text v-if="item.remarks">
        {{ item.remarks }}
      </v-card-text>
    </g-action-card>
  </g-document-controller>
</template>

<style></style>
