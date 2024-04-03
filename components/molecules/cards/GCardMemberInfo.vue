<script>
import { doc, onSnapshot } from 'firebase/firestore'
import GInputMember from '../inputs/GInputMember.vue'
import GDialogEditor from '~/components/molecules/dialogs/GDialogEditor.vue'
import AIconEdit from '~/components/atoms/icons/AIconEdit.vue'
/**
 * ### GCardMemberInfo
 * @author shisyamo4131
 */
export default {
  components: { AIconEdit, GInputMember, GDialogEditor },
  props: {
    docId: { type: String, required: true },
  },
  data() {
    return {
      dialog: false,
      editModel: this.$Member(),
      loading: false,
      model: this.$Member(),
      listener: null,
      tab: null,
    }
  },
  computed: {
    company() {
      const result = this.$Company()
      result.initialize(
        this.$store.getters['companies/get'](this.model.companyId)
      )
      return result
    },
    age() {
      if (!this.model.birth) return undefined
      const result = this.$dayjs().diff(this.model.birth, 'year')
      return result
    },
  },
  watch: {
    dialog(v) {
      !v || this.editModel.initialize(this.model)
    },
    docId: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        const docRef = doc(this.$firestore, `Members/${newVal}`)
        this.listener = onSnapshot(docRef, (doc) => {
          this.model.initialize(doc.data())
        })
      },
      immediate: true,
    },
  },
  destroyed() {
    if (this.listener) this.listener()
  },
  methods: {
    async submit() {
      try {
        this.loading = true
        await this.editModel.update()
        this.dialog = false
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <v-card>
    <v-card-title class="justify-space-between">
      <span>
        {{ model.fullName }}
        <v-icon small>mdi-gender-{{ model.gender }}</v-icon>
      </span>
      <g-dialog-editor
        v-model="dialog"
        label="会員情報更新"
        :loading="loading"
        @click:submit="submit"
      >
        <template #activator="{ attrs, on }">
          <v-btn icon v-bind="attrs" v-on="on">
            <a-icon-edit v-bind="attrs" v-on="on" />
          </v-btn>
        </template>
        <template #form>
          <g-input-member v-bind.sync="editModel" />
        </template>
      </g-dialog-editor>
    </v-card-title>
    <v-card-subtitle>{{ model.fullNameKana }}</v-card-subtitle>
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
                  model.birth
                    ? $dayjs(model.birth).format('YYYY年MM月DD日')
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
                {{ `〒${model.zipcode}` }}
              </v-list-item-subtitle>
              <v-list-item-title>
                {{ model.fullAddress }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ model.address2 }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle> 連絡先 </v-list-item-subtitle>
              <v-list-item-title>
                {{ model.mobile }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle> email </v-list-item-subtitle>
              <v-list-item-title>
                {{ model.email }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>所属</v-list-item-subtitle>
              <v-list-item-title>
                {{ company.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{
                  model.registrationDate
                    ? $dayjs(model.registrationDate).format(
                        'YYYY年MM月DD日 登録'
                      )
                    : ''
                }}
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
                {{ model.basicPensionNumber }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>マイナンバー</v-list-item-subtitle>
              <v-list-item-title>
                {{ model.myNumber }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
    <v-card-text v-if="model.remarks">
      {{ model.remarks }}
    </v-card-text>
  </v-card>
</template>

<style></style>
