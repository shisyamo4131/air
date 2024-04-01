<script>
import { limit, where } from 'firebase/firestore'
import AIconRegist from '~/components/atoms/icons/AIconRegist.vue'
import GDataTableMembers from '~/components/molecules/tables/GDataTableMembers.vue'
import GTemplateDefault from '~/components/templates/GTemplateDefault.vue'
/**
 * ### pages.members.index
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GTemplateDefault, GDataTableMembers, AIconRegist },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      defaultConstraints: [where('status', '==', 'active'), limit(10)],
      items: [],
      lazySearch: undefined,
      model: this.$Member(),
    }
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    lazySearch: {
      handler(v) {
        if (v) {
          this.items = this.model.subscribe(v)
        } else {
          this.items = this.model.subscribe(undefined, this.defaultConstraints)
        }
      },
      immediate: true,
    },
  },
  /***************************************************************************
   * DESTROYED
   ***************************************************************************/
  destroyed() {
    this.model.unsubscribe()
  },
}
</script>

<template>
  <g-template-default label="会員管理">
    <template #append-titlebar>
      <v-btn icon
        ><a-icon-regist @click="$router.push('/members/regist')"
      /></v-btn>
    </template>
    <template #default="{ height }">
      <g-data-table-members
        :height="height"
        :items="items"
        :lazy-search.sync="lazySearch"
        show-actions
        @click:detail="$router.push(`members/${$event.docId}`)"
      />
    </template>
  </g-template-default>
</template>

<style></style>
