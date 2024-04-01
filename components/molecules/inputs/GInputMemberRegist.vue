<script>
/**
 * ## GInputMemberRegist
 * @author shisyamo4131
 */
import GTextField from './GTextField.vue'
import GDate from './GDate.vue'
import GRadioGroup from './GRadioGroup.vue'
import GTextFieldPassword from './GTextFieldPassword.vue'
import ARenderlessZipcode from '~/components/atoms/renderless/ARenderlessZipcode.vue'
import { props } from '~/models/Member'
import EditMode from '~/components/mixins/EditMode'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTextField,
    ARenderlessZipcode,
    GDate,
    GRadioGroup,
    GTextFieldPassword,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  mixins: [props, EditMode],
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      rePassword: '',
    }
  },
  methods: {
    loaded(event) {
      this.$emit('update:pref', event.pref)
      this.$emit('update:city', event.city)
      this.$emit('update:address1', event.addr)
    },
  },
}
</script>

<template>
  <div>
    <g-text-field
      :value="email"
      label="メールアドレス"
      required
      input-type="email"
      @input="$emit('update:email', $event)"
    />
    <g-text-field-password
      :value="password"
      label="パスワード"
      required
      @input="$emit('update:password', $event)"
    />
    <g-text-field-password
      v-model="rePassword"
      label="パスワード再入力"
      required
      :rules="[(v) => v === password || 'パスワードが一致しません']"
    />
    <g-text-field
      :value="lastName"
      label="姓"
      required
      @input="$emit('update:lastName', $event)"
    />
    <g-text-field
      :value="firstName"
      label="名"
      required
      @input="$emit('update:firstName', $event)"
    />
    <g-text-field
      :value="lastNameKana"
      label="セイ"
      required
      ignore-surrogate-pair
      input-type="katakana"
      @input="$emit('update:lastNameKana', $event)"
    />
    <g-text-field
      :value="firstNameKana"
      label="メイ"
      required
      ignore-surrogate-pair
      input-type="katakana"
      @input="$emit('update:firstNameKana', $event)"
    />
    <g-date
      :value="birth"
      label="生年月日"
      required
      @input="$emit('update:birth', $event)"
    />
    <g-radio-group
      :value="gender"
      label="性別"
      row
      @change="$emit('update:gender', $event)"
    >
      <v-radio label="男性" value="male" />
      <v-radio label="女性" value="female" />
    </g-radio-group>
    <a-renderless-zipcode
      :value="zipcode"
      @input="$emit('update:zipcode', $event)"
      @loaded="loaded($event)"
    >
      <template #default="{ attrs, on }">
        <g-text-field v-bind="attrs" label="郵便番号" v-on="on" />
      </template>
    </a-renderless-zipcode>
    <g-text-field
      :value="pref"
      label="都道府県"
      required
      @input="$emit('update:pref', $event)"
    />
    <g-text-field
      :value="city"
      label="市区町村"
      required
      @input="$emit('update:city', $event)"
    />
    <g-text-field
      :value="address1"
      label="町域名・番地"
      required
      @input="$emit('update:address1', $event)"
    />
    <g-text-field
      :value="address2"
      label="建物名・階数"
      @input="$emit('update:address2', $event)"
    />
    <g-text-field
      :value="mobile"
      label="携帯電話"
      required
      input-type="tel"
      @input="$emit('update:mobile', $event)"
    />
  </div>
</template>

<style></style>
