<template>
  <div class="max-w-xl mx-auto p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-2">Dnevni pregled</h2>
    <p class="text-gray-500 text-sm mb-6">Pregledaj i obriši unose za odabrani dan.</p>

    <!-- Odabir datuma -->
    <div class="mb-6">
      <label class="block text-xs font-semibold text-gray-500 mb-1">ODABERI DAN</label>
      <input 
        v-model="odabraniDatum"
        type="date"
        class="px-4 py-2 rounded-lg border border-gray-200 text-sm" />
    </div>

    <!-- Ukupno -->
    <div class="bg-white rounded-2xl shadow p-5 mb-6 flex items-center gap-4">
      <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
        <span class="text-red-500 font-bold">{{ ukupnoKg }}</span>
      </div>
      <div>
        <p class="font-medium text-sm">kg otpada na odabrani dan</p>
        <p class="text-xs text-gray-500">{{ dnevniUnosi.length }} unos(a)</p>
      </div>
    </div>

    <!-- Prazno stanje -->
    <div v-if="dnevniUnosi.length === 0" 
      class="text-center py-16 border border-dashed border-gray-200 rounded-2xl">
      <p class="text-gray-400 text-sm">Nema unosa za ovaj dan.</p>
    </div>

    <!-- Lista unosa -->
    <ul v-else class="space-y-3">
      <li v-for="unos in dnevniUnosi" :key="unos.id"
        class="bg-white rounded-xl shadow px-5 py-4 flex items-center justify-between">
        <div>
          <p class="font-medium text-sm">{{ unos.naziv }}</p>
          <p class="text-xs text-gray-500">{{ unos.razlog }}</p>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-bold text-sm">{{ unos.kolicina }} {{ unos.jedinica }}</span>
          <button 
            @click="$emit('obrisi', unos.id)"
            class="text-gray-400 hover:text-red-500 transition-colors">
            🗑️
          </button>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'DnevniPregled',
  props: {
    unosi: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      odabraniDatum: new Date().toISOString().slice(0, 10)
    }
  },
  computed: {
    dnevniUnosi() {
      return this.unosi.filter(u => u.datum === this.odabraniDatum)
    },
    ukupnoKg() {
      return this.dnevniUnosi.reduce((sum, u) => {
        if (u.jedinica === 'kg') return sum + u.kolicina
        if (u.jedinica === 'g') return sum + u.kolicina / 1000
        return sum + u.kolicina
      }, 0).toFixed(1)
    }
  }
}
</script>
