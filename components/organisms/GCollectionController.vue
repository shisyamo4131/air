<script>
/**
 * ## GCollectionController
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    /* An object provided to the VCol included in VContainer. */
    colProps: { type: Object, default: () => ({}), required: false },
    /* A function used to different process from default submit. */
    customSubmit: { type: Function, default: undefined, required: false },
    /* An array provided to the table component. */
    items: { type: Array, default: () => [], required: false },
    /* A string provided to dialog component. */
    label: { type: String, default: undefined, required: false },
    /* Specifies the model-id that controlled by this component. */
    modelId: { type: String, required: true },
    /* Specifies the parent-id that the model controlled by this component depends on. */
    parentId: { type: [String, Object], default: undefined, required: false },
    /* An object provided to the table component. */
    tableProps: { type: Object, default: () => ({}), required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      /* An boolean to control the dialog. */
      dialog: false,
      /* A string used to control the edit-mode. */
      editMode: 'REGIST',
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
        this.model.initialize()
        this.editMode = 'REGIST'
      }
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
      if (mode === 'REGIST') await this.model.create()
      if (mode === 'UPDATE') await this.model.update()
      if (mode === 'DELETE') await this.model.delete()
    },
    onClickCancel() {
      this.dialog = false
    },
    onClickDelete(item) {
      if (!item) return
      const answer = window.confirm('削除してもよろしいですか？')
      if (!answer) return
      this.editMode = 'DELETE'
      this.model.initialize(item)
      this.submit('DELETE')
    },
    onClickDetail(item) {
      this.$emit('click:detail', item)
    },
    onClickEdit(item) {
      this.editMode = 'UPDATE'
      this.model.initialize(item)
      this.dialog = true
    },
    onClickRegist() {
      this.editMode = 'REGIST'
      this.model.initialize()
      this.dialog = true
    },
    onClickSubmit() {
      this.submit(this.editMode)
    },
    setModel() {
      if (!this.parentId) {
        this.model = this[`$${this.modelId}`]()
      } else {
        this.model = this[`$${this.modelId}`](this.parentId)
      }
    },
    async submit(mode) {
      try {
        this.loading = true
        if (this.customSubmit) await this.customSubmit(mode)
        if (!this.customSubmit) await this.defaultSubmit(mode)
        this.$emit(`submit:complete`, mode)
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
            editMode: this.editMode,
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
          attrs: { ...this.attrs, editMode: this.editMode },
          on: this.on,
        },
        table: {
          attrs: {
            items: this.items,
            ...this.tableProps,
            colProps: this.colProps,
          },
          on: {
            'click:edit': this.onClickEdit,
            'click:delete': this.onClickDelete,
            'click:detail': this.onClickDetail,
          },
        },
      })
    )
  },
}
</script>
