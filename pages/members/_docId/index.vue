<script>
import AIconEdit from '~/components/atoms/icons/AIconEdit.vue'
import AIconPrev from '~/components/atoms/icons/AIconPrev.vue'
import ARenderlessCrud from '~/components/atoms/renderless/ARenderlessCrud.vue'
import GSimpleTableMember from '~/components/molecules/tables/GSimpleTableMember.vue'
import GTemplateDefault from '~/components/templates/GTemplateDefault.vue'
/**
 * ## page.members.docId
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTemplateDefault,
    GSimpleTableMember,
    ARenderlessCrud,
    AIconEdit,
    AIconPrev,
  },
  /***************************************************************************
   * ASYNCDATA
   ***************************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const model = app.$Member()
    await model.fetch(docId)
    return { docId, model }
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      site: {
        lazySearch: null,
      },
      tab: 0,
    }
  },
  watch: {},
}
</script>

<template>
  <a-renderless-crud
    :model="model"
    edit-mode="DELETE"
    @submit:complete="$router.replace('/members')"
  >
    <template #default>
      <g-template-default label="会員詳細">
        <template #prepend-toolbar>
          <v-btn icon @click="$router.push('/members')">
            <a-icon-prev />
          </v-btn>
        </template>
        <template #append-toolbar>
          <v-spacer />
          <v-btn icon @click="$router.push(`/members/${docId}/edit`)">
            <a-icon-edit color="undefined" />
          </v-btn>
        </template>
        <template #default>
          <v-tabs v-model="tab">
            <v-tab>登録情報</v-tab>
            <v-tab>現場情報</v-tab>
          </v-tabs>
          <v-container fluid>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card outlined>
                  <g-simple-table-member v-bind="model" />
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <!-- <g-data-table-sites
                  :height="height - 72"
                  :items="sites"
                  :lazy-search.sync="site.lazySearch"
                /> -->
              </v-tab-item>
            </v-tabs-items>
          </v-container>
        </template>
      </g-template-default>
    </template>
  </a-renderless-crud>
</template>

<style></style>
