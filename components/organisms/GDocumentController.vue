<script>
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    /* A function used to different process from default submit. */
    customSubmit: { type: Function, default: undefined, required: false },
    /* A object controlled by this component. */
    item: { type: Object, required: true },
    /* A string provided to dialog component. */
    label: { type: String, default: undefined, required: false },
    /* Specifies the model-id that controlled by this component. */
    modelId: { type: String, required: true },
    /* Specifies the parent-id that the model controlled by this component depends on. */
    parentId: { type: [String, Object], default: undefined, required: false },
    /* An object provided to the table component. */
    cardProps: { type: Object, default: () => ({}), required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      /* An boolean to control the dialog. */
      dialog: false,
      /* An boolean used to indicate that processing is in progress. */
      loading: false,
      /* The model controlled by this component. */
      model: null,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    attrs() {
      return {
        ...JSON.parse(JSON.stringify(this.model)),
      }
    },
    on() {
      const result = {}
      Object.keys(this.model).forEach((key) => {
        result[`update:${key}`] = ($event) => {
          this.model.initialize({ ...this.model, [key]: $event })
        }
      })
      return result
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    dialog(v) {
      if (!v) {
        this.model.initialize(this.item)
      }
    },
    item: {
      handler(v) {
        this.setModel()
      },
      immediate: true,
      deep: true,
    },
    modelId: {
      handler() {
        this.setModel()
      },
      immediate: true,
    },
    parentId: {
      handler() {
        this.setModel()
      },
      immediate: true,
      deep: true,
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    async defaultSubmit(mode) {
      if (mode === 'UPDATE') await this.model.update()
      if (mode === 'DELETE') await this.model.delete()
    },
    onClickCancel() {
      this.dialog = false
    },
    onClickDelete() {
      const answer = window.confirm('削除してもよろしいですか？')
      if (!answer) return
      this.submit('DELETE')
    },
    onClickEdit() {
      this.dialog = true
    },
    onClickSubmit() {
      this.submit('UPDATE')
    },
    setModel() {
      if (!this.parentId) {
        this.model = this[`$${this.modelId}`](this.item)
      } else {
        this.model = this[`$${this.modelId}`](this.parentId, this.item)
      }
    },
    async submit(mode) {
      try {
        this.loading = true
        if (this.customSubmit) await this.customSubmit(mode)
        if (!this.customSubmit) await this.defaultSubmit(mode)
        this.$emit(`submit:${mode.toLowerCase()}`)
        this.dialog = false
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
        this.$emit('submit:error')
      } finally {
        this.loading = false
      }
    },
  },
  /***************************************************************************
   * RENDER
   ***************************************************************************/
  render(createElement) {
    return createElement(
      'div',
      {},
      this.$scopedSlots.default({
        dialog: {
          attrs: {
            editMode: 'UPDATE',
            label: this.label,
            loading: this.loading,
            value: this.dialog,
          },
          on: {
            input: (v) => (this.dialog = v),
            'click:cancel': this.onClickCancel,
            'click:submit': this.onClickSubmit,
          },
        },
        model: {
          attrs: { ...this.attrs, editMode: 'UPDATE' },
          on: this.on,
        },
        card: {
          attrs: {
            item: this.item,
            ...this.cardProps,
          },
          on: {
            'click:edit': this.onClickEdit,
            'click:delete': this.onClickDelete,
          },
        },
      })
    )
  },
}
</script>
