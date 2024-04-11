<template>
  <div>
    <g-data-iterator :items="$store.state.companies.items" :actions="['edit']">
      <template #col="{ item, actions }">
        <g-simple-card-company :item="item" :actions="actions" />
      </template>
    </g-data-iterator>
  </div>
</template>

<script>
import GSimpleCardCompany from '~/components/molecules/cards/GSimpleCardCompany.vue'
import GDataIterator from '~/components/molecules/tables/GDataIterator.vue'
export default {
  components: { GDataIterator, GSimpleCardCompany },
}
</script>

<style></style>
