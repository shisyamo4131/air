<script>
/**
 * ### GTemplateDefault
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    label: { type: String, default: 'GTemplateDefault', required: false },
    showToolbar: { type: Boolean, default: false, required: false },
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    containerHeight() {
      return this.templateHeight - this.titlebarHeight - this.toolbarHeight
    },
    templateHeight() {
      const top = this.$vuetify.application.top
      const bar = this.$vuetify.application.bar
      const footer = this.$vuetify.application.footer
      const bottom = this.$vuetify.application.bottom
      const padding = this.$vuetify.breakpoint.xs ? 0 : 24
      const height = this.$vuetify.breakpoint.height
      return height - (top + bar + footer + bottom + padding)
    },
    titlebarHeight() {
      return 48
    },
    toolbarHeight() {
      if (!this.showToolbar) return 0
      return this.$vuetify.breakpoint.smAndDown ? 56 : 64
    },
  },
}
</script>

<template>
  <div :style="{ height: `${templateHeight}px` }">
    <v-toolbar color="primary" dark dense flat>
      <slot name="prepend-titlebar" v-bind="{ label }" />
      <v-toolbar-title>{{ label }}</v-toolbar-title>
      <v-spacer />
      <slot name="append-titlebar" v-bind="{ label }" />
    </v-toolbar>
    <v-toolbar v-show="showToolbar" flat>
      <slot name="toolbar">
        <v-toolbar-title>toolbar</v-toolbar-title>
      </slot>
    </v-toolbar>
    <div class="overflow-y-auto" :style="{ height: `${containerHeight}px` }">
      <!-- <div> -->
      <slot name="default" v-bind="{ height: containerHeight }">
        <v-container fluid>
          <v-card>
            <v-card-text>
              プロジェクトのデフォルトレイアウトコンポーネントです。<br />
              defaultスロットを使用して、この部分を他のコンポーネントに置き換えてください。
            </v-card-text>
          </v-card>
        </v-container>
      </slot>
    </div>
  </div>
</template>

<style></style>
