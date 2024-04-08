<script>
/**
 * ### pages.developments.components
 * @author shisyamo4131
 */
import ASelect from '~/components/atoms/inputs/ASelect.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    ASelect,
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      items: [],
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
