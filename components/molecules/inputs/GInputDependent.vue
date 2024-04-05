<script>
import GTextField from './GTextField.vue'
import GTextarea from './GTextarea.vue'
import GDate from './GDate.vue'
import GRadioGroup from './GRadioGroup.vue'
import GSelect from './GSelect.vue'
import GSwitch from './GSwitch.vue'
import ARenderlessZipcode from '~/components/atoms/renderless/ARenderlessZipcode.vue'
import { props } from '~/models/Dependent'
import GMixinInput from '~/components/mixins/GMixinInput'
/**
 * ### GInputDependent
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
  },
  mixins: [props, GMixinInput],
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
      :value="relation"
      label="続柄"
      required
      :items="$DEPENDENT_RELATION_ARRAY"
      :attach="attach"
      @input="$emit('update:relation', $event)"
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
    <g-switch
      :input-value="isTogether"
      label="同居"
      @change="$emit('update:isTogether', $event)"
    />
    <v-expand-transition>
      <div v-if="!isTogether">
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
          :required="!isTogether"
          @input="$emit('update:address1', $event)"
        />
        <g-text-field
          :value="address2"
          label="建物名・階数"
          @input="$emit('update:address2', $event)"
        />
      </div>
    </v-expand-transition>
    <g-date
      :value="registrationDate"
      label="社保加入日"
      required
      @input="$emit('update:registrationDate', $event)"
    />
    <g-text-field
      :value="basicPensionNumber"
      label="基礎年金番号"
      counter
      max-length="10"
      hint="ハイフン不要"
      @input="$emit('update:basicPensionNumber', $event)"
    />
    <g-text-field
      :value="myNumber"
      label="マイナンバー"
      counter
      max-length="12"
      hint="ハイフン不要"
      @input="$emit('update:myNumber', $event)"
    />
    <g-textarea
      :value="remarks"
      label="備考"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
