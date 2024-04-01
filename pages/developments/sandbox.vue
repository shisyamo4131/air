<template>
  <g-template-default>
    <v-card>
      <v-card-title>sandbox</v-card-title>
      <v-card-text>
        <g-date v-model="value" label="date" />
      </v-card-text>
    </v-card>
  </g-template-default>
</template>

<script>
import GDate from '~/components/molecules/inputs/GDate.vue'
import GTemplateDefault from '~/components/templates/GTemplateDefault.vue'
export default {
  components: { GTemplateDefault, GDate },
  data() {
    return {
      value: null,
    }
  },
}
</script>

<style></style>
