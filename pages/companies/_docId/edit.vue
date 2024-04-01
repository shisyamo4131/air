<script>
import ARenderlessCrud from '~/components/atoms/renderless/ARenderlessCrud.vue'
import GInputCompany from '~/components/molecules/inputs/GInputCompany.vue'
import GTemplateEditor from '~/components/templates/GTemplateEditor.vue'
/**
 * ## page.members.regist
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GInputCompany, ARenderlessCrud, GTemplateEditor },
  /***************************************************************************
   * ASYNCDATA
   ***************************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const model = app.$Company()
    await model.fetch(docId)
    return { docId, model }
  },
}
</script>

<template>
  <a-renderless-crud
    :model="model"
    edit-mode="UPDATE"
    @submit:complete="$router.push(`/members/${model.docId}`)"
    @cancel="$router.go(-1)"
  >
    <template #default="{ attrs, on, status, actions }">
      <g-template-editor label="会社情報更新" v-bind="status" v-on="actions">
        <g-input-company v-bind="attrs" v-on="on" />
      </g-template-editor>
    </template>
  </a-renderless-crud>
</template>

<style></style>
