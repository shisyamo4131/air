<script>
import GTextFieldSearch from '../inputs/GTextFieldSearch.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GTextFieldSearch },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    actions: { type: Array, default: () => [], required: false },
    colProps: { type: Object, default: () => ({}), required: false },
    hidePagination: { type: Boolean, default: false, required: false },
    hideSearch: { type: Boolean, default: false, required: false },
    search: { type: String, default: undefined, required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      internalSearch: undefined,
      loading: false,
      page: 1,
      pageCount: 0,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    computedSearch: {
      get() {
        return this.internalSearch
      },
      set(v) {
        this.internalSearch = v
        this.$emit('update:search', v)
      },
    },
    colOn() {
      return {
        'click:edit': (item) => this.$emit('click:edit', item),
        'click:delete': (item) => this.$emit('click:delete', item),
        'click:detail': (item) => this.$emit('click:detail', item),
      }
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    search: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.internalSearch = newVal
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <v-data-iterator
    v-bind="$attrs"
    hide-default-footer
    :search="computedSearch"
    :page.sync="page"
    @page-count="pageCount = $event"
    v-on="$listeners"
  >
    <!-- ### HEADER ### -->
    <template #header="props">
      <slot name="header" v-bind="props">
        <v-toolbar v-if="!hideSearch" flat>
          <slot name="prepend-search" />
          <g-text-field-search v-model="computedSearch" />
          <slot name="append-search" />
        </v-toolbar>
      </slot>
    </template>
    <template #default="props">
      <slot name="default" v-bind="{ ...props, actions }">
        <v-container fluid>
          <v-row>
            <v-col
              v-for="(item, index) of props.items"
              :key="index"
              v-bind="colProps"
            >
              <slot
                name="col"
                v-bind="{ attrs: { item, actions }, on: colOn }"
              />
            </v-col>
          </v-row>
        </v-container>
      </slot>
    </template>
    <!-- ### FOOTER ### -->
    <!-- Show pagination if 'hidePagination' prop is false. -->
    <template v-if="!hidePagination" #footer="props">
      <slot name="footer" v-bind="props">
        <v-container fluid style="height: 76px">
          <v-row justify="center" dense>
            <v-col cols="11">
              <v-pagination v-model="page" :length="pageCount" />
            </v-col>
          </v-row>
        </v-container>
      </slot>
    </template>
  </v-data-iterator>
</template>

<style></style>
