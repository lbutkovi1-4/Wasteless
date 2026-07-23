<template>
  <div>
    <!-- Ekran za prijavu -->
    <Login v-if="!korisnik" @login="handleLogin" />

    <!-- Glavna aplikacija -->
    <div v-else>
      <!-- Header -->
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

        <!-- Navigacija -->
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

      <!-- Sadržaj -->
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
      ]
    }
  },
  methods: {
    handleLogin(podaci) {
      this.korisnik = { email: podaci.email }
    },
    odjava() {
      this.korisnik = null
      this.unosi = []
    },
    dodajUnos(unos) {
      this.unosi.unshift({
        ...unos,
        id: crypto.randomUUID()
      })
      this.aktivniTab = 'pregled'
    },
    obrisiUnos(id) {
      this.unosi = this.unosi.filter(u => u.id !== id)
    }
  }
}
</script>
