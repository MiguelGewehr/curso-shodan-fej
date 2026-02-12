const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setUserRole = functions.https.onCall((data, context) => {
  // Verifique se o chamador é admin (opcional, para segurança)
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Apenas admins podem definir papéis.');
  }

  const { uid, role } = data; // Ex.: { uid: 'user-id', role: 'admin' }
  const claims = {};
  claims[role] = true; // Ex.: { admin: true }

  return admin.auth().setCustomUserClaims(uid, claims)
    .then(() => {
      return { message: `Papel ${role} definido para ${uid}` };
    })
    .catch(error => {
      throw new functions.https.HttpsError('internal', error.message);
    });
});