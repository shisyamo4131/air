<script>
import EditMode from '~/components/mixins/EditMode'
/**
 * ## GController
 * props.modelに指定されたモデルに対するCREATE、UPDATE、DELETEを実行する
 * レンダーレスコンポーネントです。
 * ※modelはFireModelを継承している必要があります。
 *
 * ### PROPS
 *
 * #### custom-submit
 * 当該コンポーネントのSUBMIT処理の既定動作を変更することができます。
 * 第一引数に編集モードが渡されます。
 * Promiseを返す必要があります。
 *
 * #### edit-mode
 * モデルの編集モード（REGIST、UPDATE、DELETE）です。
 * mixinsにより読み込まれています。
 * .sync修飾子を利用した同期が可能です。
 *
 * #### items
 * defaultスロットからVDataTableやVDataIteratorに引き渡す配列です。
 *
 * #### label
 * defaultスロットのdialog、tableプロパティに提供されます。
 *
 * #### model
 * 当該コンポーネントで編集対象となるmodelオブジェクトです。
 * FireModelを継承している必要があります。
 *
 * #### table-props
 * defaultスロットのtable.attrsに展開されます。
 *
 * ### SLOTS
 *
 * #### default
 *
 * ##### model
 * props.modelの各プロパティおよびeditModeがattrsとして、各プロパティに対する
 * updateイベントのリスナーがonとして提供されます。
 *
 * ##### dialog
 * props.modelに対する編集をVDialogを通して行う場合に、VDialogに引き渡すことのできる
 * スロットプロパティをattrs、onとして提供します。
 *
 * ##### table
 * 描画にVDataTable、VDataIteratorに引き渡すことのできるスロットプロパティ
 * attrs、onを提供します。
 *
 * ##### status
 * editMode、loadingが提供されます。
 *
 * ##### actions
 * 当該コンポーネントが提供するclickアクションの関数をすべて提供します。
 *
 * ### EVENTS
 *
 * #### click:cancel
 * CANCELボタンがクリックされた時にemitされます。
 *
 * #### click:regist
 * REGISTボタンがクリックされた時にemitされます。
 *
 * #### click:edit
 * UPDATEボタンがクリックされた時にemitされます。
 *
 * #### submit:complete
 * - SUBMITボタンがクリックされ、処理が正常に完了した時にemitされます。
 * - DELETEボタンがクリックされ、処理が正常に完了した時にemitされます。
 *
 * #### submit:error
 * SUBMITまたはDELETEの処理でエラーが発生した時にemitされます。
 *
 * ### FUNCTIONS
 *
 * #### subscribe
 * props.modelのsubscribe()を実行します。
 * gram、constraintsを引数に指定可能です。
 * 当該コンポーネントのdestroyed()にてunsubscribe()を実行しています。
 *
 * NOTE: INPUTコンポーネントに対する入力の検証は行いません。
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [EditMode],
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    customSubmit: { type: Function, default: undefined, required: false },
    items: { type: Array, default: () => [], required: false },
    label: { type: String, default: undefined, required: false },
    model: { type: Object, required: true },
    tableProps: {
      type: Object,
      default: () => {
        return {}
      },
      required: false,
    },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      dialog: false,
      loading: false,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    attrs() {
      return { ...this.model, editMode: this.computedEditMode }
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
    status() {
      return {
        editMode: this.computedEditMode,
        loading: this.loading,
      }
    },
    actions() {
      return {
        'click:regist': this.onClickRegist,
        'click:edit': this.onClickEdit,
        'click:delete': this.onClickDelete,
        'click:detail': this.onClickDetail,
        'click:cancel': this.onClickCancel,
        'click:submit': this.onClickSubmit,
      }
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    dialog(v) {
      if (!v) this.model.initialize()
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
    onClickCancel() {
      this.computedEditMode = 'REGIST'
      this.$emit('click:cancel')
      this.dialog = false
    },
    onClickRegist() {
      this.computedEditMode = 'REGIST'
      this.model.initialize()
      this.$emit('click:regist')
      this.dialog = true
    },
    onClickEdit(item = undefined) {
      this.computedEditMode = 'UPDATE'
      this.model.initialize(item)
      this.$emit('click:edit', item)
      this.dialog = true
    },
    onClickDelete(item) {
      if (!item) return
      const answer = window.confirm('削除してもよろしいですか？')
      if (!answer) return
      this.computedEditMode = 'DELETE'
      this.model.initialize(item)
      this.submit('DELETE')
    },
    onClickDetail(item) {
      this.$emit('click:detail', item)
    },
    onClickSubmit() {
      this.submit(this.computedEditMode)
    },
  },
  /***************************************************************************
   * RENDER
   ***************************************************************************/
  render() {
    return this.$scopedSlots.default({
      model: {
        attrs: this.attrs,
        on: this.on,
      },
      dialog: {
        attrs: {
          editMode: this.computedEditMode,
          label: this.label,
          loading: this.loading,
          value: this.dialog,
        },
        on: {
          input: (v) => {
            this.dialog = v
          },
          'click:cancel': this.onClickCancel,
          'click:submit': this.onClickSubmit,
        },
      },
      table: {
        attrs: {
          items: this.items,
          label: this.label,
          ...this.tableProps,
        },
        on: {
          'click:edit': this.onClickEdit,
          'click:delete': this.onClickDelete,
          'click:detail': this.onClickDetail,
        },
      },
      status: this.status,
      actions: this.actions,
    })
  },
}
</script>
