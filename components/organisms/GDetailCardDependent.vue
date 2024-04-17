<script>
import GInputDependent from '../molecules/inputs/GInputDependent.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GActionCard from '../molecules/cards/GActionCard.vue'
import ADocumentController from '~/components/atoms/ADocumentController.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GActionCard,
    GDialogEditor,
    ADocumentController,
    GInputDependent,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    docId: { type: String, required: true },
    memberId: { type: String, required: true },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      member: this.$Member(),
      tab: null,
    }
  },
  /***************************************************************************
   * MOUNTED
   ***************************************************************************/
  mounted() {
    this.member.fetch(this.memberId)
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
  },
}
</script>

<template>
  <a-document-controller
    v-slot="props"
    v-bind="$attrs"
    :doc-id="docId"
    :parent-id="memberId"
    label="被扶養者"
    model-id="Dependent"
    v-on="$listeners"
  >
    <g-dialog-editor
      v-bind="props.dialog.attrs"
      max-width="600"
      v-on="props.dialog.on"
    >
      <template #form>
        <g-input-dependent v-bind="props.editor.attrs" v-on="props.editor.on" />
      </template>
    </g-dialog-editor>
    <g-action-card v-bind="props.card.attrs" v-on="props.card.on">
      <v-card-title class="justify-space-between">
        <span>
          {{ props.model.fullName }}
          <v-icon small>mdi-gender-{{ props.model.gender }}</v-icon>
        </span>
      </v-card-title>
      <v-card-subtitle>{{ props.model.fullNameKana }}</v-card-subtitle>
      <v-list>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle> 扶養者 </v-list-item-subtitle>
            <v-list-item-title>
              {{ member.fullName }}
            </v-list-item-title>
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
                  {{ `${formatDate(props.model.birth)}` }}
                  ({{ `${getAge(props.model.birth)} 才` }})
                </v-list-item-title>
                <v-list-item-subtitle v-if="getAge >= 69" class="error--text">
                  <v-icon left small color="error">mdi-information</v-icon
                  >脱退年齢に近づいています。
                </v-list-item-subtitle>
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
