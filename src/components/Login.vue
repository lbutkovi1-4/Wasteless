<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      
      <!-- Logo i naziv -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">🌿 WasteLess</h1>
        <p class="text-gray-500 mt-2">Praćenje otpada hrane</p>
      </div>

      <!-- Prijava / Registracija -->
      <div class="flex mb-6 bg-gray-100 rounded-full p-1">
        <button 
          @click="mode='login'"
          :class="mode==='login' ? 'bg-gray-800 text-white' : 'text-gray-500'"
          class="flex-1 py-2 rounded-full text-sm font-medium transition-colors">
          Prijava
        </button>
        <button 
          @click="mode='register'"
          :class="mode==='register' ? 'bg-gray-800 text-white' : 'text-gray-500'"
          class="flex-1 py-2 rounded-full text-sm font-medium transition-colors">
          Registracija
        </button>
      </div>

      <!-- Forma -->
      <div class="space-y-4">
        <div v-if="mode==='register'">
          <label class="block text-xs font-semibold text-gray-500 mb-1">NAZIV KUHINJE</label>
          <input 
            v-model="kitchenName"
            type="text" 
            placeholder="npr. Bistro Marina"
            class="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
        </div>

        <div>
          <label class="block text-xs font-semibold