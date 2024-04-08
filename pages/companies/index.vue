<script>
import GBtnRegistCompany from '~/components/molecules/btns/GBtnRegistCompany.vue'
import GSimpleCardCompany from '~/components/molecules/cards/GSimpleCardCompany.vue'
import GDataIterator from '~/components/molecules/tables/GDataIterator.vue'
/**
 * ### pages.companies.index
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GDataIterator,
    GSimpleCardCompany,
    GBtnRegistCompany,
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    companies() {
      return this.$store.state.companies.items
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    /**
     * 引数で指定されたidの会社詳細画面に遷移します。
     */
    goToDetail(docId) {
      this.$router.push(`/companies/${docId}`)
    },
  },
}
</script>

<template>
  <g-data-iterator :items="companies" hide-default-footer :items-per-page="-1">
    <template #append-search>
      <g-btn-regist-company />
    </template>
    <template #default="{ items }">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="(item, index) of items"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            xl="3"
          >
            <g-simple-card-company v-bind="item" @click:detail="goToDetail" />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </g-data-iterator>
</template>

<style></style>
