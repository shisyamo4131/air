<script>
// import AIconDetail from '../atoms/icons/AIconDetail.vue'
import GDataIterator from '../molecules/tables/GDataIterator.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    // AIconDetail,
    GDataIterator,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    hideDefaultFooter: { type: Boolean, default: true, required: false },
    itemsPerPage: { type: Number, default: -1, required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      cols: { cols: '12', sm: '6', md: '4', lg: '3' },
    }
  },
}
</script>

<template>
  <g-data-iterator v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
    <template #default="props">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="(item, index) of props.items"
            :key="index"
            v-bind="{ ...cols }"
          >
            <!-- <g-simple-card-member v-bind="item" /> -->
          </v-col>
        </v-row>
      </v-container>
    </template>
  </g-data-iterator>
</template>

<style></style>
