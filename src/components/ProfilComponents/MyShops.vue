<script setup>
    import ShopCard from '../Cards/ShopCard.vue';
    import AddShops from '../Modals/AddShops.vue';
    import { ref } from 'vue';
    const showAddShop = ref(false)
    const events = defineEmits(['close']) 
</script>

<template>
    <section class="max-w-3xl mx-auto p-2 md:p-0" >
        <h3 class="font-semibold text-lg border-b-4 border-[#fdae5c] max-w-max " >Mes Boutiques De Transfert</h3>
        <div class="containerShops flex flex-wrap" >
            <ShopCard src="/src/assets/img/user.jpg" />
            <ShopCard src="/src/assets/img/edition.webp" />
        </div>
        <button class="text-white bg-blue-500 rounded-md px-2 py-1 my-2 hover:opacity-85 transition-opacity duration-300 w-full max-w-72 min-h-12 text-xl " @click="showAddShop = !showAddShop" > <i class="fas fa-plus" ></i> Créer Une Boutique </button>
        <transition name="slide" >
            <AddShops :key="'one'" v-if="showAddShop" @closeAddModal="showAddShop = !showAddShop" />
        </transition>
    </section>
    
</template>
 