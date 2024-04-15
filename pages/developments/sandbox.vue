<template>
  <v-card>
    <v-card-title>Upload File</v-card-title>
    <v-container fluid>
      <g-file-uploader
        accept="image/*"
        path="Members/Cards"
        file-name="test"
        create-thumb
        compress
        :compress-options="{ maxSizeMB: 3 }"
      >
        <template #default="{ attrs, on, uploader }">
          <v-file-input v-bind="attrs" v-on="on" />
          <v-btn v-bind="uploader.attrs" v-on="uploader.on">OK</v-btn>
        </template>
      </g-file-uploader>
      <v-text-field v-model="fileName" />
    </v-container>
    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script>
import GFileUploader from '~/components/organisms/GFileUploader.vue'
export default {
  components: { GFileUploader },
  data() {
    return {
      file: null,
      fileName: null,
    }
  },
  methods: {
    test() {
      console.log('OK')
    },
  },
}
</script>

<style></style>
