<template>
  <div class="max-w-xl mx-auto p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-2">Statistika</h2>
    <p class="text-gray-500 text-sm mb-6">Pregled trendova otpada.</p>

    <!-- Ukupne kartice -->
    <div class="grid grid-cols-2 gap-4 mb-8">
      <div class="bg-white rounded-2xl shadow p-5">
        <p class="text-xs font-semibold text-gray-500 mb-1">UKUPNO</p>
        <p class="text-3xl font-bold text-gray-800">{{ ukupnoKg }}<span class="text-base text-gray-400"> kg</span></p>
      </div>
      <div class="bg-white rounded-2xl shadow p-5">
        <p class="text-xs font-semibold text-gray-500 mb-1">UKUPNO UNOSA</p>
        <p class="text-3xl font-bold text-gray-800">{{ unosi.length }}</p>
      </div>
    </div>

    <!-- Raspodjela po razlogu -->
    <div class="bg-white rounded-2xl shadow p-6 mb-6">
      <p class="text-sm font-semibold mb-5">Raspodjela po razlogu bacanja</p>
      <div class="space-y-4">
        <div v-for="r in razlogStatistika" :key="r.naziv">
          <div class="flex justify-between text-xs mb-1">
            <span class="font-medium">{{ r.naziv }}</span>
            <span class="text-gray-500">{{ r.kg.toFixed(1) }} kg · {{ r.postotak }}%</span>
          </div>
          <div class="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div 
              class="h-full rounded-full bg-gray-800 transition-all"
              :style="{ width: r.postotak + '%' }">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Najčešći razlog -->
    <div class="bg-white rounded-2xl shadow p-5">
      <p class="text-xs font-semibold text-gray-500 mb-1">NAJČEŠĆI RAZLOG</p>
      <p class="text-lg font-bold text-gray-800">{{ najcesciRazlog }}</p>
    </div>

  </div>
</template>

<script>
const RAZLOZI = [
  'Otpad pri pripremi',
  'Isteklo / pokvarilo se',
  'Vraćeno s tanjura',
  'Prevelika porcija',
  'Ostalo'
]

export default {
  name: 'Statistika',
  props: {
    unosi: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ukupnoKg() {
      return this.unosi.reduce((sum, u) => {
        if (u.jedinica === 'kg') return sum + u.kolicina
        if (u.jedinica === 'g') return sum + u.kolicina / 1000
        return sum + u.kolicina
      }, 0).toFixed(1)
    },
    razlogStatistika() {
      const ukupno = parseFloat(this.ukupnoKg) || 1
      return RAZLOZI.map(naziv => {
        const kg = this.unosi
          .filter(u => u.razlog === naziv)
          .reduce((sum, u) => {
            if (u.jedinica === 'kg') return sum + u.kolicina
            if (u.jedinica === 'g') return sum + u.kolicina / 1000
            return sum + u.kolicina
          }, 0)
        return {
          naziv,
          kg,
          postotak: Math.round((kg / ukupno) * 100)
        }
      })
    },
    najcesciRazlog() {
      if (this.unosi.length === 0) return 'Nema podataka'
      return this.razlogStatistika
        .slice()
        .sort((a, b) => b.kg - a.kg)[0].naziv
    }
  }
}
</script>
