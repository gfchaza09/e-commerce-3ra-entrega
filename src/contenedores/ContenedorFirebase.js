import admin from "firebase-admin";
import config from "../config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
  }

  async list(id) {
    try {
      const document = await this.coleccion.doc(id).get();
      return document ? { id: document.id, ...document.data() } : null;
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }

  async save(product) {
    try {
      const docRef = await this.coleccion.add({
        ...product,
        timestamp: Date.now(),
      });
      return docRef.id;
    } catch (error) {
      console.log(error);
    }
  }

  async update(prod, id) {
    try {
      const res = await this.coleccion
        .doc(id)
        .update({ ...prod, timestamp: Date.now() });
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const res = await this.coleccion.doc(id).delete();
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      const querySnapshot = await this.coleccion.get();
      let docs = querySnapshot.docs;
      docs.map(async (doc) => await this.delete(doc.id));
    } catch (error) {
      console.log(error);
    }
  }
}

export default ContenedorFirebase;
