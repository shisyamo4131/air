<script>
import { props } from '~/models/Member'
/**
 * ## GSimpleTableMember
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [props],
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    fullName: { type: String, default: '', required: false },
    fullNameKana: { type: String, default: '', required: false },
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    company() {
      const result = this.$store.getters['companies/get'](this.companyId)
      return result || this.$Company()
    },
  },
}
</script>

<template>
  <v-simple-table>
    <tbody>
      <tr>
        <td>氏名</td>
        <td>
          <div class="text-caption grey--text text--darken-1">
            {{ fullNameKana }}
          </div>
          <div>{{ fullName }}</div>
        </td>
      </tr>
      <tr>
        <td>所属</td>
        <td>{{ company.name }}</td>
      </tr>
      <tr>
        <td>登録日</td>
        <td>{{ registrationDate }}</td>
      </tr>
      <tr>
        <td>生年月日</td>
        <td>{{ birth }}</td>
      </tr>
      <tr>
        <td>性別</td>
        <td>{{ $GENDER[gender] }}</td>
      </tr>
      <tr>
        <td>郵便番号</td>
        <td>{{ zipcode }}</td>
      </tr>
      <tr>
        <td>住所</td>
        <td>{{ address1 }}</td>
      </tr>
      <tr>
        <td>建物名・階数</td>
        <td>{{ address2 }}</td>
      </tr>
      <tr>
        <td>携帯番号</td>
        <td>{{ mobile }}</td>
      </tr>
      <tr>
        <td>電話番号</td>
        <td>{{ tel }}</td>
      </tr>
      <tr>
        <td>email</td>
        <td>{{ email }}</td>
      </tr>
      <tr>
        <td>備考</td>
        <td>
          <p style="white-space: pre-line">
            {{ remarks }}
          </p>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<style></style>
