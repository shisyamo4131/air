<script>
import imageCompression from 'browser-image-compression'

export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    accept: { type: String, default: 'image/*', required: false },
    compress: { type: Boolean, default: false, required: false },
    compressOptions: {
      type: Object,
      default: () => ({ maxSizeMB: 1 }),
      required: false,
    },
    createThumb: { type: Boolean, default: false, required: false },
    fileName: { type: undefined, required: true },
    path: { type: undefined, required: true },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      file: null,
      loading: false,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    computedFileName() {
      if (!this.fileName) return undefined
      return `${this.fileName}.${this.extension.toLowerCase()}`
    },
    extension() {
      if (!this.file) return undefined
      const pop = this.file.name.split('.').pop()
      if (!pop) throw new Error('Could not get extension.')
      return pop.split('?')[0]
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    async compressImage(options) {
      try {
        return await imageCompression(this.file, options)
      } catch (error) {
        // eslint-disable-next-line
        console.error('An error has occured at compressImage().', error)
        throw error
      }
    },
    async upload() {
      if (!this.validator()) return
      try {
        this.loading = true
        const uploadFile = this.compress
          ? await this.compressImage(this.options)
          : this.file
        await this.$fileUploader(
          uploadFile,
          `${this.path}/${this.computedFileName}`
        )
        if (this.createThumb) {
          const thumbFile = await this.compressImage({ maxSizeMB: 0.2 })
          await this.$fileUploader(
            thumbFile,
            `${this.path}/thumb_${this.computedFileName}`
          )
        }
        this.file = null
        this.$emit('upload:complete')
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
    validator() {
      if (!this.path || !this.fileName) {
        // eslint-disable-next-line
        console.error('Parameters path and file-name are required.')
        return false
      }
      if (typeof this.path !== 'string' || typeof this.fileName !== 'string') {
        // eslint-disable-next-line
        console.error('Parameters path and file-name must be string.')
        return false
      }
      return true
    },
  },
  /***************************************************************************
   * RENDER
   ***************************************************************************/
  render(createElement) {
    return createElement('div', {}, [
      this.$scopedSlots.default({
        attrs: {
          accept: this.accept,
          disabled: this.loading,
          value: this.file,
        },
        on: {
          change: (v) => (this.file = v),
        },
        uploader: {
          attrs: {
            disabled:
              !this.fileName || !this.path || !this.file || this.loading,
            loading: this.loading,
          },
          on: { click: this.upload },
        },
      }),
    ])
  },
}
</script>
