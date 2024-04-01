<script>
import ARenderlessCrud from '~/components/atoms/renderless/ARenderlessCrud.vue'
import GInputMember from '~/components/molecules/inputs/GInputMember.vue'
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
  components: { GInputMember, ARenderlessCrud, GTemplateEditor },
  /***************************************************************************
   * ASYNCDATA
   ***************************************************************************/
  asyncData({ app }) {
    const model = app.$Member()
    return { model }
  },
}
</script>

<template>
  <a-renderless-crud
    :model="model"
    edit-mode="REGIST"
    @submit:complete="$router.push(`/members/${model.docId}`)"
    @cancel="$router.push('/members')"
  >
    <template #default="{ attrs, on, status, actions }">
      <g-template-editor label="会員登録" v-bind="status" v-on="actions">
        <g-input-member v-bind="attrs" v-on="on" />
      </g-template-editor>
    </template>
  </a-renderless-crud>
</template>

<style></style>
