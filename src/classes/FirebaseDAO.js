import admin from "firebase-admin";
import config from "../config/config.js";
import { logError } from "../loggers/index.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

class FirebaseDAO {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
  }

  async list(id) {
    try {
      const document = await this.coleccion.doc(id).get();
      return document ? { id: document.id, ...document.data() } : null;
    } catch (error) {
      logError(error);
    }
  }

  async listAll() {
    try {
      const querySnapshot = await this.coleccion.orderBy("timestamp").get();
      let docs = querySnapshot.docs;
      const response = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return response;
    } catch (error) {
      logError(error);
    }
  }

  async save(item) {
    try {
      const docRef = await this.coleccion.add({
        ...item,
        timestamp: Date.now(),
      });
      return docRef.id;
    } catch (error) {
      logError(error);
    }
  }

  async update(item, id) {
    try {
      const res = await this.coleccion
        .doc(id)
        .update({ ...item, timestamp: Date.now() });
      return res;
    } catch (error) {
      logError(error);
    }
  }

  async delete(id) {
    try {
      const res = await this.coleccion.doc(id).delete();
      return res;
    } catch (error) {
      logError(error);
    }
  }

  async deleteAll() {
    try {
      const querySnapshot = await this.coleccion.get();
      let docs = querySnapshot.docs;
      docs.map(async (doc) => await this.delete(doc.id));
    } catch (error) {
      logError(error);
    }
  }
}

export default FirebaseDAO;
