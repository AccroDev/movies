<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useGlobalStore } from '@/stores/GlobalStore';
import { useAuthStore } from '@/stores/AuthStore';

const showTown = ref(false);
const classTownsElements = ref("hidden");
const AuthStore = useAuthStore();

function ToggleTown() {
  showTown.value = !showTown.value;
  if (showTown.value) {
    classTownsElements.value = "scale-y-0";
    setTimeout(() => {
      classTownsElements.value = "scale-y-100";
    }, 3);
  } else {
    classTownsElements.value = "scale-y-0";
    setTimeout(() => {
      classTownsElements.value = "hidden";
    }, 300);
  }
}

const emit = defineEmits(["closeAddModal"]);
const globalStore = useGlobalStore();

const error = ref(false);
const sending = ref(false);

const createShop = async () => {
    if (sending.value) {
        return;
    }
  const form = document.querySelector('#createShopForm');
  const formData = new FormData(form);

  // Vérification des champs requis
  if (!formData.get('name') || !formData.get('miniature') || !formData.get('ville') || !formData.get('phone_number') || !formData.get('address')) {
    error.value = 'Veuillez remplir tous les champs requis.';
    return;
  }

  try {
    sending.value = true;
    const response = await axios.post(`${globalStore.apiHost}/api/create-shop`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    sending.value = false;
    if (response.data.statut) {
      alert('Boutique créée avec succès.');
      emit('closeAddModal');
    } else {
        error.value = 'Échec de la création de la boutique : ' + response.data.message;
    } 
  } catch (error) {
    sending.value = false;
    error.value = 'Erreur lors de la création de la boutique ';
    console.error('Erreur lors de la création de la boutique :', error); 
  }
};
 
</script>

<template>
  <div class="fixed top-0 left-0 bottom-0 right-0 bg-black/80 w-full h-full z-20 flex justify-center items-center" @click="emit('closeAddModal')">
    <div @click.stop class="bg-white rounded-md w-[95%] sm:w-4/5 max-w-2xl h-[90%] overflow-hidden flex justify-center items-center p-2 sm:p-4 addShopWrapper relative">
      <form @submit.prevent="createShop" method="post" enctype="multipart/form-data" class="w-full sm:w-4/5" id="createShopForm" >
        <h2 class="text-2xl font-bold mb-6 text-center text-back">Créer une Boutique</h2>
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-black">Nom De la Boutique</label>
          <input type="text" id="name" name="name" required class="mt-1 block w-full px-3 py-2 border-b border-black focus:outline-none sm:text-sm bg-transparent text-black">
        </div>
        <div class="mb-4">
          <label for="miniature" class="block text-sm font-medium text-black">Miniature</label>
          <input type="file" name="miniature" id="miniature" required class="mt-1 block w-full px-3 py-2 border-b border-black focus:outline-none sm:text-sm bg-transparent text-black">
        </div>
        <div class="mb-4">
          <label for="ville" class="block text-sm font-medium text-black">Ville</label>
          <div class="relative w-full h-10 border-b border-black" @click="ToggleTown()">
            <div class="flex flex-1 justify-between items-center mx-1 cursor-pointer">
              <h5 class="font-semibold text-lg uppercase filterTitle">Bujumbura</h5>
              <span class="fas fa-arrow-down font-semibold"></span>
            </div>
            <ul class="absolute top-10 left-0 right-0 origin-top scale-y-0 px-2 py-1 bg-[#feebd6] rounded-md duration-200 transition-all z-10" :class="classTownsElements">
              <input name="ville" class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">Bujumbura</input>
              <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">Goma</li>
              <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">Bukavu</li>
              <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">Minova</li>
            </ul>
          </div>
        </div>
        <div class="mb-6">
          <label for="phone_number" class="block text-sm font-medium text-black">Télephone</label>
          <input type="tel" name="phone_number" id="phone_number" required class="mt-1 block w-full px-3 py-2 border-b border-black focus:outline-none sm:text-sm bg-transparent text-black">
        </div>
        <div class="mb-6">
          <label for="address" class="block text-sm font-medium text-black">Adress</label>
          <input type="text" name="address" id="address" required class="mt-1 block w-full px-3 py-2 border-b border-black focus:outline-none sm:text-sm bg-transparent text-black">
        </div>
        <div v-if="error" class=" m-3 text-sm text-red-800 underline lowercase" > {{ error }} </div>  
        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
            <span class="inline-flex justify-center items-center" v-if="sending" >
                <span class="spinner inline-block w-4 h-4 border-2 mr-1 border-white border-b-2 border-b-transparent rounded-full" ></span> Enregistrement...
            </span> 
            <span v-else >Enregistrer</span> 
        </button>
      </form>
      <button @click="emit('closeAddModal')" class="absolute top-2 right-1 rounded-sm px-3 py-1 text-xs bg-red-950 opacity-80 text-white font-medium hover:opacity-60 duration-300">Fermer</button>
    </div>
  </div>
</template>

