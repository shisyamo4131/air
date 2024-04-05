const { onDocumentDeleted } = require('firebase-functions/v2/firestore')
const { getFirestore } = require('firebase-admin/firestore')
const { logger } = require('firebase-functions/v2')
const firestore = getFirestore()

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
