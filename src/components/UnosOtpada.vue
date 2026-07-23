<template>
  <div class="max-w-xl mx-auto p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-2">Novi unos otpada</h2>
    <p class="text-gray-500 text-sm mb-6">Zabilježi što je bačeno, koliko i zašto.</p>

    <div class="bg-white rounded-2xl shadow p-6 space-y-5">
      
      <!-- Naziv namirnice -->
      <div>
        <label class="block text-xs font-semibold text-gray-500 mb-1">NAZIV NAMIRNICE</label>
        <input 
          v-model="naziv"
          type="text" 
          placeholder="npr. luk, piletina, kruh..."
          class="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
      </div>

      <!-- Količina i jedinica -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-gray-500 mb-1">KOLIČINA</label>
          <input 
            v-model="kolicina"
            type="number" 
            min="0" 
            step="0.01"
            placeholder="0.0"
            class="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-500 mb-1">JEDINICA</label>
          <select 
            v-model="jedinica"
            class="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm">
            <option>kg</option>
            <option>g</option>
            <option>kom</option>
            <option>L</option>
          </select>
        </div>
      </div>

      <!-- Razlog -->
      <div>
        <label class="block text-xs font-semibold text-gray-500 mb-1">RAZLOG BACANJA</label>
        <select 
          v-model="razlog"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm">
          <option>Otpad pri pripremi</option>
          <option>Isteklo / pokvarilo se</option>
          <option>Vraćeno s tanjura</option>
          <option>Prevelika porcija</option>
          <option>Ostalo</option>
        </select>
      </div>

      <!-- Datum -->
      <div>
        <label class="block text-xs font-semibold text-gray-500 mb-1">DATUM</label>
        <input 
          v-model="datum"
          type="date"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
      </div>

      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

      <!-- Gumb -->
      <button 
        @click="spremiUnos"
        class="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors">
        Spremi unos
      </button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'UnosOtpada',
  data() {
    return {
      naziv: '',
      kolicina: '',
      jedinica: 'kg',
      razlog: 'Otpad pri pripremi',
      datum: new Date().toISOString().slice(0, 10),
      error: ''
    }
  },
  methods: {
    spremiUnos() {
      this.error = ''
      if (!this.naziv.trim()) {
        this.error = 'Unesi naziv namirnice.'
        return
      }
      if (!this.kolicina || this.kolicina <= 0) {
        this.error = 'Unesi ispravnu količinu.'
        return
      }
      this.$emit('novi-unos', {
        naziv: this.naziv,
        kolicina: Number(this.kolicina),
        jedinica: this.jedinica,
        razlog: this.razlog,
        datum: this.datum
      })
      // Reset forme
      this.naziv = ''
      this.kolicina = ''
      this.jedinica = 'kg'
      this.razlog = 'Otpad pri pripremi'
    }
  }
}
</script>
