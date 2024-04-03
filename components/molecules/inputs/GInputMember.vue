<script>
import GTextField from './GTextField.vue'
import GTextarea from './GTextarea.vue'
import GAutocompleteCompany from './GAutocompleteCompany.vue'
import GDate from './GDate.vue'
import GRadioGroup from './GRadioGroup.vue'
import ARenderlessZipcode from '~/components/atoms/renderless/ARenderlessZipcode.vue'
import { props } from '~/models/Member'
import GMixinInput from '~/components/mixins/GMixinInput'
/**
 * ### GInputMember
 * @author shisyamo4131
 */
export default {
  components: {
    GTextField,
    ARenderlessZipcode,
    GTextarea,
    GAutocompleteCompany,
    GDate,
    GRadioGroup,
  },
  mixins: [props, GMixinInput],
  props: {
    attach: { type: undefined, default: false, required: false },
  },
}
</script>

<template>
  <div>
    <v-row dense>
      <v-col cols="6">
        <g-text-field
          :value="lastName"
          label="姓"
          required
          @input="$emit('update:lastName', $event)"
        />
      </v-col>
      <v-col cols="6">
        <g-text-field
          :value="firstName"
          label="名"
          required
          @input="$emit('update:firstName', $event)"
        />
      </v-col>
      <v-col cols="6">
        <g-text-field
          :value="lastNameKana"
          label="セイ"
          required
          hint="検索に使用されます"
          ignore-surrogate-pair
          input-type="katakana"
          @input="$emit('update:lastNameKana', $event)"
        />
      </v-col>
      <v-col cols="6">
        <g-text-field
          :value="firstNameKana"
          label="メイ"
          required
          hint="検索に使用されます"
          ignore-surrogate-pair
          input-type="katakana"
          @input="$emit('update:firstNameKana', $event)"
        />
      </v-col>
    </v-row>
    <g-autocomplete-company
      :value="companyId"
      label="所属"
      required
      :attach="attach"
      @input="$emit('update:companyId', $event)"
    />
    <g-date
      :value="registrationDate"
      label="登記日"
      required
      @input="$emit('update:registrationDate', $event)"
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
      @loaded="$emit('update:address1', $event.full)"
    >
      <template #default="{ attrs, on }">
        <g-text-field v-bind="attrs" label="郵便番号" v-on="on" />
      </template>
    </a-renderless-zipcode>
    <g-text-field
      :value="address1"
      label="住所"
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
    <g-text-field
      :value="tel"
      label="電話番号"
      input-type="tel"
      @input="$emit('update:tel', $event)"
    />
    <g-text-field
      :value="email"
      label="email"
      required
      input-type="email"
      @input="$emit('update:email', $event)"
    />
    <g-textarea
      :value="remarks"
      label="備考"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
