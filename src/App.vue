<template>
  <div>
    <Login v-if="!korisnik" @login="handleLogin" />

    <div v-else>
      <header class="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div class="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <span class="text-xl font-bold text-gray-800">🌿 WasteLess</span>
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-500">{{ korisnik.email }}</span>
            <button 
              @click="odjava"
              class="text-sm px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50">
              Odjava
            </button>
          </div>
        </div>
        <nav class="max-w-5xl mx-auto px-5 flex gap-1 text-sm font-medium">
          <button 
            v-for="tab in tabovi" :key="tab.id"
            @click="aktivniTab = tab.id"
            :class="aktivniTab === tab.id ? 'border-gray-800 text-gray-800' : 'border-transparent text-gray-400'"
            class="px-4 py-3 border-b-2 transition-colors">
            {{ tab.naziv }}
          </button>
        </nav>
      </header>

      <main class="bg-gray-50 min-h-screen">
        <UnosOtpada v-if="aktivniTab === 'unos'" @novi-unos="dodajUnos" />
        <DnevniPregled v-if="aktivniTab === 'pregled'" :unosi="unosi" @obrisi="obrisiUnos" />
        <Statistika v-if="aktivniTab === 'statistika'" :unosi="unosi" />
      </main>
    </div>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import UnosOtpada from './components/UnosOtpada.vue'
import DnevniPregled from './components/DnevniPregled.vue'
import Statistika from './components/Statistika.vue'
import { auth, db } from './firebase'
import { signOut } from 'firebase/auth'
import { collection, addDoc, deleteDoc, doc, query, where, onSnapshot } from 'firebase/firestore'

export default {
  name: 'App',
  components: { Login, UnosOtpada, DnevniPregled, Statistika },
  data() {
    return {
      korisnik: null,
      unosi: [],
      aktivniTab: 'unos',
      tabovi: [
        { id: 'unos', naziv: 'Unos otpada' },
        { id: 'pregled', naziv: 'Dnevni pregled' },
        { id: 'statistika', naziv: 'Statistika' }
      ],
      unsubscribe: null
    }
  },
  methods: {
    handleLogin(podaci) {
      this.korisnik = podaci
      this.ucitajUnose()
    },
    ucitajUnose() {
      const q = query(
        collection(db, 'unosi'),
        where('userId', '==', this.korisnik.uid)
      )
      this.unsubscribe = onSnapshot(q, (snapshot) => {
        this.unosi = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => b.createdAt - a.createdAt)
      })
    },
    async odjava() {
      if (this.unsubscribe) this.unsubscribe()
      await signOut(auth)
      this.korisnik = null
      this.unosi = []
    },
    async dodajUnos(unos) {
      await addDoc(collection(db, 'unosi'), {
        ...unos,
        userId: this.korisnik.uid,
        createdAt: Date.now()
      })
      this.aktivniTab = 'pregled'
    },
    async obrisiUnos(id) {
      await deleteDoc(doc(db, 'unosi', id))
    }
  },
  beforeUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  }
}
</script>