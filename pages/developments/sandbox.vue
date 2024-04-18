<template>
  <v-card>
    <v-card-title>Upload File</v-card-title>
    <v-card-actions>
      <v-btn @click="submit">submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    async submit() {
      const members = await this.$Member().fetchDocs()
      for (const member of members) {
        const model = this.$Member(member)
        await model.update()
      }
    },
  },
}
</script>

<style></style>
