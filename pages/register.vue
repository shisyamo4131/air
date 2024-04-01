<template>
  <g-template-default label="会員登録">
    <template #default>
      <v-container>
        <v-card flat>
          <v-card-subtitle>
            下記フォームに入力後、登録ボタンを押してください。
          </v-card-subtitle>
          <v-card-text>
            <v-form ref="form">
              <g-input-member-regist v-bind.sync="model" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="primary" @click="submit">登録</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </template>
  </g-template-default>
</template>

<script>
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from 'firebase/auth'
import GInputMemberRegist from '~/components/molecules/inputs/GInputMemberRegist.vue'
import GTemplateDefault from '~/components/templates/GTemplateDefault.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GTemplateDefault, GInputMemberRegist },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      model: this.$Member(),
      registed: false,
    }
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    validate() {
      const result = this.$refs.form.validate()
      if (!result) alert('入力に不備があります。')
      return result
    },
    async submit() {
      if (!this.validate()) return
      try {
        await createUserWithEmailAndPassword(
          this.$auth,
          this.model.email,
          this.model.password
        )
        this.registed = true
        await sendEmailVerification(this.$auth.currentUser)
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        await signOut(this.$auth)
        if (this.registed) this.$router.push('regist-complete')
      }
    },
  },
}
</script>

<style></style>
