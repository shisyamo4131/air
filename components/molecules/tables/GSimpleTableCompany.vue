<script>
import { props } from '~/models/Company'
/**
 * ## GSimpleTableCompany
 *
 * @author shisyamo4131
 */
export default {
  mixins: [props],
}
</script>

<template>
  <v-simple-table>
    <tbody>
      <tr>
        <td>会社名</td>
        <td>{{ name }}</td>
      </tr>
      <tr>
        <td>略称</td>
        <td>
          <div class="text-caption grey--text text--darken-1">
            {{ abbrKana }}
          </div>
          <div>{{ abbr }}</div>
        </td>
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
        <td>電話番号</td>
        <td>{{ tel }}</td>
      </tr>
      <tr>
        <td>FAX番号</td>
        <td>{{ fax }}</td>
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
