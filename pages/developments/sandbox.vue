<template>
  <v-card>
    <v-card-title>Upload File</v-card-title>
    <v-card-actions>
      <v-btn @click="submit">submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
export default {
  data() {
    return {}
  },
  methods: {
    async submit() {
      const systemDocRef = doc(this.$firestore, 'settings/system')
      await setDoc(systemDocRef, { members: 0 })
      const snapshot = await getDocs(collection(this.$firestore, 'Members'))
      await updateDoc(systemDocRef, { members: snapshot.docs.length })
    },
  },
}
</script>

<style></style>
