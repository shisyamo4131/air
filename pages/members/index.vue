<script>
import GSimpleCardMember from '~/components/molecules/cards/GSimpleCardMember.vue'
import GDataIterator from '~/components/molecules/tables/GDataIterator.vue'
import GMembers from '~/components/controllers/GMembers.vue'
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
    GMembers,
    GSimpleCardMember,
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    /**
     * 引数で指定されたidの会員詳細画面に遷移します。
     */
    goToDetail(docId) {
      this.$router.push(`/members/${docId}`)
    },
  },
}
</script>

<template>
  <g-members v-slot="{ items }">
    <g-data-iterator :items="items" hide-default-footer :items-per-page="-1">
      <template #default="props">
        <v-container fluid>
          <v-row>
            <v-col
              v-for="(item, index) of props.items"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <g-simple-card-member
                v-bind="item"
                @click:detail="goToDetail($event)"
              />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </g-data-iterator>
  </g-members>
</template>

<style></style>
