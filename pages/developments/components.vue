<script>
/**
 * ### pages.developments.components
 * @author shisyamo4131
 */
import ASelect from '~/components/atoms/inputs/ASelect.vue'
import GDataIteratorCompanies from '~/components/organisms/GDataIteratorCompanies.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    ASelect,
    GDataIteratorCompanies,
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      items: [
        {
          text: 'GDataIteratorCompanies',
          component: 'g-data-iterator-companies',
        },
      ],
      selectedItem: null,
    }
  },
}
</script>

<template>
  <div>
    <a-select
      v-model="selectedItem"
      label="select model"
      :items="items"
      return-object
      hide-details
    />
    <v-container>
      <component
        :is="selectedItem.component"
        v-if="selectedItem"
        v-bind.sync="selectedItem.model"
      />
    </v-container>
  </div>
</template>

<style></style>
