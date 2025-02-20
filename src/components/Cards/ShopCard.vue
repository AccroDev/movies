<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { useGlobalStore } from '@/stores/GlobalStore';



const props = defineProps({
  shop: {
    type: Object,
    required: true
  }
});
const authStore = useAuthStore();
const emits = defineEmits(["ShowAddModal"]);
const GlobalStore = useGlobalStore();

function updateShop() { 
    emits('ShowAddModal', props.shop);
}
 
</script>

<template>   
    <div class="w-full max-w-[300px] m-2 rounded-xl overflow-hidden shadow-md bg-white border border-gray-200"> 
        <div class="relative h-56 bg-gray-100">
            <img 
            :src="GlobalStore.apiHost + props.shop.miniature"
            alt="Miniature de la Boutique" 
            class="w-full h-full object-cover"
            />
            <span @click="authStore.DeleteShop(props.shop.id);" class=" cursor-pointer hover:bg-red-800/80 absolute top-2 left-2 bg-red-800/50 text-white text-xs py-[2px] px-2 rounded-sm transition-all duration-200"> Supp. </span>
            
            <span @click="updateShop" class="cursor-pointer hover:bg-indigo-800/80 absolute top-2 right-2 bg-indigo-800/50 text-white text-xs py-[2px] px-2 rounded-sm transition-all duration-200">  Modifier
            </span>
        </div>

        <!-- Informations sur la boutique -->
        <div class="p-3">
            <h3 class="text-xl font-semibold text-gray-800">{{ props.shop.name }}</h3>
            <p class="text-sm text-gray-500 mt-1">Ville : <span class="text-gray-700">{{ props.shop.ville }}</span></p>
            <p class="text-sm text-gray-500 mt-1">Numéro : <span class="text-gray-700">{{ props.shop.phone_number }}</span></p> 
            <p class="text-sm text-gray-500 mt-1 italic">Adresse : <span class="text-gray-700">{{ props.shop.address }}</span></p> 
            <p class="text-sm text-gray-500 mt-1 italic">Prix /saison : <span class="text-gray-700">{{ props.shop.prixSaison ?? "" }}</span></p>
            <p class="text-sm text-gray-500 mt-1 italic">Prix /film : <span class="text-gray-700">{{ props.shop.prixFilm ?? "" }}</span></p>
        </div> 
    </div> 
</template>
