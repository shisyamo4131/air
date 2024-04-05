<script>
import { doc, onSnapshot } from 'firebase/firestore'
import GInputDependent from '../molecules/inputs/GInputDependent.vue'
import GDialogEditor from '~/components/molecules/dialogs/GDialogEditor.vue'
import AIconEdit from '~/components/atoms/icons/AIconEdit.vue'
import AIconDelete from '~/components/atoms/icons/AIconDelete.vue'
/**
 * ### GCardDependentInfo
 * @author shisyamo4131
 */
export default {
  components: {
    GInputDependent,
    GDialogEditor,
    AIconEdit,
    AIconDelete,
  },
  props: {
    dependentId: { type: String, required: true },
    memberId: { type: String, required: true },
  },
  data() {
    return {
      dialog: false,
      editModel: this.$Dependent(this.memberId),
      loading: false,
      member: this.$Member(),
      model: this.$Dependent(this.memberId),
      listener: null,
      tab: null,
    }
  },
  computed: {
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
    dependentId: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        const path = `Members/${this.memberId}/Dependents/${newVal}`
        const docRef = doc(this.$firestore, path)
        this.listener = onSnapshot(docRef, (doc) => {
          this.model.initialize(doc.data())
        })
      },
      immediate: true,
    },
    memberId: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.member.fetch(newVal)
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
    async remove() {
      const result = window.confirm('本当に削除しますか？')
      if (!result) return
      await this.model.delete()
      this.$emit('removed')
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
    </v-card-title>
    <v-card-subtitle>{{ model.fullNameKana }}</v-card-subtitle>
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
    <v-card-actions class="justify-space-around">
      <g-dialog-editor
        v-model="dialog"
        label="被扶養者情報更新"
        :loading="loading"
        max-width="600"
        @click:submit="submit"
      >
        <template #activator="{ attrs, on }">
          <v-btn v-bind="attrs" icon v-on="on">
            <a-icon-edit />
          </v-btn>
        </template>
        <template #form>
          <g-input-dependent v-bind.sync="editModel" />
        </template>
      </g-dialog-editor>
      <v-btn icon @click="remove">
        <a-icon-delete />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style></style>
