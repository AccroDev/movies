<script setup>
    const showTown = ref(false);
    import { ref } from 'vue';

    const classTownsElements = ref("hidden"); 
    function ToggleTown() {
        showTown.value = !showTown.value;
        if (showTown.value) {
            classTownsElements.value = "scale-y-0"
            setTimeout(() => { 
                classTownsElements.value = "scale-y-100" 
            }, 3);
        } else {
            classTownsElements.value = "scale-y-0"
            setTimeout(() => {
                classTownsElements.value = "hidden"
            }, 300);
        }
    } 
    const emit = defineEmits(["closeAddModal"])
</script>

<template>
    <div class="fixed top-0 left-0 bottom-0 right-0 bg-black/80 w-full h-full z-20 flex justify-center items-center " @click="emit('closeAddModal')" >
        <div @click.stop class="bg-white rounded-md w-[95%] sm:w-4/5 max-w-2xl h-[90%] overflow-hidden flex justify-center items-center p-2 sm:p-4 addShopWrapper relative" >
            <div class="w-full sm:w-4/5 " > 
                    <h2 class="text-2xl font-bold mb-6 text-center text-back">Créer une Boutique</h2>
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-black">Nom De la Boutique</label>
                        <input type="text" id="name" required class="mt-1 block w-full px-3 py-2 border-b border-black focus:outline-none sm:text-sm bg-transparent text-black">
                    </div> 
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-black">Miniature</label>
                        <input type="file" id="name" required class="mt-1 block w-full px-3 py-2 border-b border-black focus:outline-none sm:text-sm bg-transparent text-black">
                    </div> 
                    <div class="mb-4" >
                        <label for="name" class="block text-sm font-medium text-black">Ville</label>
                        <div class="relative w-full h-10 border-b border-black"  @click="ToggleTown()">
                            <div class="flex flex-1 justify-between items-center mx-1 cursor-pointer ">
                                <h5 class="font-semibold text-lg  uppercase filterTitle">Bujumbura</h5>
                                <span  class="fas fa-arrow-down font-semibold"></span>
                            </div> 
                            <ul class="absolute top-10 left-0  right-0 origin-top scale-y-0 px-2 py-1 bg-[#feebd6] rounded-md duration-200 transition-all z-10" :class="classTownsElements" >
                                <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >Bujumbura</li>
                                <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >Goma</li>
                                <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >Bukavu</li>
                                <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >Minova</li>
                            </ul>
                        </div>
                    </div>   
                    <div class="mb-6">
                        <label for="telephone" class="block text-sm font-medium text-black">Télephone</label>
                        <input type="tel" id="telephone" required class="mt-1 block w-full px-3 py-2 border-b border-black focus:outline-none  sm:text-sm bg-transparent text-black">
                    </div> 
                    <div class="mb-6">
                        <label for="adress" class="block text-sm font-medium text-black">Adress</label>
                        <input type="text" id="adress" required class="mt-1 block w-full px-3 py-2 border-b border-black focus:outline-none  sm:text-sm bg-transparent text-black">
                    </div> 
                    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">Enregistrer</button>
            </div>
            <button @click="emit('closeAddModal')" class="absolute top-2 right-1 rounded-sm px-3 py-1 text-xs bg-red-950 opacity-80 text-white font-medium hover:opacity-60 duration-300" >Fermer</button>
        </div>
    </div>
</template>
 
 