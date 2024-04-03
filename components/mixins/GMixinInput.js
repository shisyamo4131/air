/**
 * ### mixins.GMixinInput.js
 * inputコンポーネントに実装する既定propsです。
 *
 * #### props.attach
 * v-dialog内でv-selectやv-autocompleteを使用する際に、展開されたv-menuが
 * v-dialogのスクロールに追従するようにするために使用します。
 *
 * v-dialog内でv-selectやv-autocompleteを使用した場合、展開されたv-menuが
 * v-dialogのスクロールに追従しません。これは、当該コンポーネントが既定でv-appに
 * attachされているからです。当該コンポーネントのprops.attachをtrueにすると
 * 展開されたv-menuがv-dialogのスクロールに追従するようになります。
 *
 * #### props.editMode
 * Inputコンポーネント内に表示されているデータの編集モードです。
 *
 * @author shisyamo4131
 */
export default {
  props: {
    attach: { type: undefined, default: false, required: false },
    editMode: {
      type: String,
      default: 'REGIST',
      validator: (v) => ['REGIST', 'UPDATE', 'DELETE'].includes(v),
      required: false,
    },
  },
}
