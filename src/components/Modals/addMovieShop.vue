<script setup>
    import UpdateMovieInShop from '../Cards/UpdateMovieInShop.vue';
    const emits = defineEmits(["closeAddModal"])
    
</script>

<template>
    <section @click="emits('closeAddModal')" class="fixed top-0 left-0 bottom-0 right-0 bg-black/80 w-full h-full z-20 flex justify-center items-center ">
        <div @click.stop class="bg-white rounded-md w-[95%] sm:w-4/5 max-w-2xl h-[90%] overflow-hidden flex justify-center items-center p-2 sm:p-4 addShopWrapper relative">
            <div class="w-full max-h-full overflow-y-auto overflow-x-hidden " > 
                    <h2 class="text-2xl font-bold mb-6 mt-8 sm:mt-4 text-center text-back">Modifier Dans Nos Boutiques</h2> 
                    <div class="flex flex-wrap items-center" >
                        <UpdateMovieInShop />  
                        <UpdateMovieInShop />  
                        <UpdateMovieInShop />  
                        <UpdateMovieInShop />  
                        <UpdateMovieInShop />    
                    </div>
            </div>
            <button @click="emits('closeAddModal')" class="absolute top-2 right-1 rounded-sm px-3 py-1 text-xs bg-red-950 opacity-80 text-white font-medium hover:opacity-60 duration-300" >Fermer</button>
        
        </div>
    </section>
</template>\

<style>
    
</style>