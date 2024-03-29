<script>
import { limit, orderBy, where } from 'firebase/firestore'
import AIconRegist from '~/components/atoms/icons/AIconRegist.vue'
import GDataTableCompanies from '~/components/molecules/tables/GDataTableCompanies.vue'
import GTemplateDefault from '~/components/templates/GTemplateDefault.vue'
/**
 * ### pages.companies.index
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GTemplateDefault, GDataTableCompanies, AIconRegist },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      defaultConstraints: [
        where('status', '==', 'active'),
        orderBy('updateAt', 'desc'),
        limit(10),
      ],
      items: [],
      lazySearch: undefined,
      model: this.$Company(),
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
  <g-template-default label="会社管理">
    <template #append-titlebar>
      <v-btn icon
        ><a-icon-regist @click="$router.push('/companies/regist')"
      /></v-btn>
    </template>
    <template #default="{ height }">
      <g-data-table-companies
        :height="height"
        :items="items"
        :lazy-search.sync="lazySearch"
        show-actions
        @click:detail="$router.push(`companies/${$event.docId}`)"
      />
    </template>
  </g-template-default>
</template>

<style></style>
