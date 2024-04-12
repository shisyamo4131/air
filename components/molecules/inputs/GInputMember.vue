<script>
import GTextField from './GTextField.vue'
import GTextarea from './GTextarea.vue'
import GDate from './GDate.vue'
import GRadioGroup from './GRadioGroup.vue'
import GSelect from './GSelect.vue'
import GSwitch from './GSwitch.vue'
import GTextFieldBasicPensionNumber from './GTextFieldBasicPensionNumber.vue'
import GTextFieldMyNumber from './GTextFieldMyNumber.vue'
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
    GDate,
    GRadioGroup,
    GSelect,
    GSwitch,
    GTextFieldBasicPensionNumber,
    GTextFieldMyNumber,
  },
  mixins: [props, GMixinInput],
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    loaded(e) {
      this.$emit('update:pref', e.pref)
      this.$emit('update:city', e.city)
      this.$emit('update:address1', e.addr)
    },
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
    <g-select
      :value="companyId"
      label="所属"
      required
      :items="$store.state.companies.items"
      item-text="name"
      item-value="docId"
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
      @loaded="loaded"
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
    <g-text-field-basic-pension-number
      :value="basicPensionNumber"
      @input="$emit('update:basicPensionNumber', $event)"
    />
    <g-text-field-my-number
      :value="myNumber"
      @input="$emit('update:myNumber', $event)"
    />
    <g-select
      :value="socialInsuranceStatus"
      label="社会保険加入手続"
      :items="$SOCIAL_INSURANCE_STATUS_ARRAY"
      required
      @input="$emit('update:socialInsuranceStatus', $event)"
    />
    <v-expand-transition>
      <div v-show="socialInsuranceStatus === '2:completed'">
        <g-text-field
          :value="healthInsuranceNumber"
          label="被保険者番号"
          :rules="[(v) => !v || /^\d*$/.test(v) || '半角数字のみ']"
          :required="socialInsuranceStatus === '2:completed'"
          @input="$emit('update:healthInsuranceNumber', $event)"
        />
      </div>
    </v-expand-transition>
    <g-text-field
      :value="job"
      label="職業"
      @input="$emit('update:job', $event)"
    />
    <g-text-field
      :value="jobName"
      label="屋号"
      @input="$emit('update:jobName', $event)"
    />
    <g-switch
      :input-value="hasReferee"
      label="紹介者"
      @change="$emit('update:hasReferee', $event)"
    />
    <v-expand-transition>
      <div v-show="hasReferee">
        <g-text-field
          :value="referee"
          label="紹介者名"
          :required="hasReferee"
          @input="$emit('update:referee', $event)"
        />
      </div>
    </v-expand-transition>
    <g-textarea
      :value="remarks"
      label="備考"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
