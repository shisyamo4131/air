<script>
import AFileUploader from '~/components/atoms/AFileUploader.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { AFileUploader },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    src: { type: String, default: undefined, required: false },
  },
}
</script>

<template>
  <a-file-uploader
    v-slot="{ attrs, on, uploader }"
    v-bind="$attrs"
    file-name="insurance"
    v-on="$listeners"
  >
    <v-card>
      <v-container
        class="d-flex flex-column justify-space-between align-center"
      >
        <v-img v-if="src" :src="src" />
        <v-card v-else outlined style="width: 100%; height: 180px">
          <v-container
            class="d-flex justify-center align-center"
            style="height: 100%"
          >
            <h1>NO IMAGE</h1>
          </v-container>
        </v-card>
      </v-container>
      <v-container>
        <v-file-input v-bind="attrs" v-on="on">
          <template #append-outer>
            <v-btn icon v-bind="uploader.attrs" v-on="uploader.on">
              <v-icon>mdi-upload-box-outline</v-icon>
            </v-btn>
          </template>
        </v-file-input>
      </v-container>
    </v-card>
  </a-file-uploader>
</template>

<style></style>
