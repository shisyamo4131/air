const {
  onDocumentDeleted,
  onDocumentCreated,
} = require('firebase-functions/v2/firestore')
const { getFirestore } = require('firebase-admin/firestore')
const { getStorage } = require('firebase-admin/storage')
const { logger } = require('firebase-functions/v2')
const firestore = getFirestore()
const storage = getStorage()

/**
 * ### exports.createMember
 * Process when a Member document is created.
 * - Synchronize number of members to the system document.
 */
exports.createMember = onDocumentCreated('Members/{docId}', async (event) => {
  await syncSystemMembers()
})

/**
 * ### exports.deleteMember
 * Process when a Member document is deleted.
 * - Delete Dependents documents.
 */
exports.deleteMember = onDocumentDeleted('Members/{docId}', async (event) => {
  const docId = event.params.docId
  logger.info(`Member document (${docId}) was deleted.`)

  // Delete documents from Dependents collection.
  logger.info(`Delete documents from Dependents collection.`)
  await deleteDependents(docId).catch((err) => {
    logger.error(`[member.js] An error has occured at 'deleteDependents'.`)
    throw new Error(err)
  })
  await deleteImages(docId)
})

/**
 * ### deleteDependents
 * Deletes documents from Dependents collection that are dependent on the Member
 * specified in the argument 'memberId'.
 * @param {string} memberId
 * @returns
 */
async function deleteDependents(memberId) {
  const path = `Members/${memberId}/Dependents`
  const colRef = firestore.collection(path)
  const querySnapshot = await colRef.get()
  if (querySnapshot.empty) return
  const promises = querySnapshot.docs.map((doc) => doc.ref.delete())
  await Promise.all(promises)
}

/**
 * ### deleteImages
 * Deletes images from Storage that are dependent on the Member
 * specified in the argument 'memberId'.
 * @param {string} memberId
 * @returns
 */
async function deleteImages(memberId) {
  const directory = `Images/Members/${memberId}`
  const fileBucket = storage.bucket()
  await fileBucket.deleteFiles({ prefix: directory })
}

/**
 * ### syncSystemMembers
 * Synchronize number of members to the system document.
 */
async function syncSystemMembers() {
  const colRef = firestore.collection('Members')
  const snapshot = await colRef.get()
  const members = snapshot.docs.length
  await firestore.doc('settings/system').update({ members })
}
