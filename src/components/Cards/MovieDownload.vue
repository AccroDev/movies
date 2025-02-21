<script setup>
    import { computed } from 'vue';
    import { useGlobalStore } from '@/stores/GlobalStore';


    const props = defineProps({
        items : {
            type : Object,
            required : true
        },
        paramsID : {
            required : true
        }
    })
    const GlobalStore = useGlobalStore();
    const path = computed(() => {
        return `/download/${ props.items.name}-${props.paramsID}`;
    })

    function hundleClick(url)
    { 

        // Créer un élément <a> pour forcer le téléchargement
        const link = document.createElement('a');
        link.href = GlobalStore.apiHost + url;
        link.download = `${props.items.name}`; // Optionnel, si tu veux spécifier un nom de fichier

        // Ajouter l'élément à la page et simuler un clic
        document.body.appendChild(link);
        link.click();

        // Supprimer l'élément <a> après avoir déclenché le téléchargement
        document.body.removeChild(link);
    }
    
</script>

<template>
    <div class="flex flex-col p-2 w-full sm:w-1/2 downloadMovieItem" >
        <div class="flex items-center" >
            <div class="w-[20%] sm:w-[30%] min-w-[20%]  sm:min-w-[30%] " >
                <img src="/src/assets/img/téléchargement.jfif" alt="">
            </div>
            <div class="w-[80%] sm:w-[70%] min-w-1/3 h-full flex flex-col justify-between" >
                <h3 class="text-sm break-words  " >{{ props.items.name }}</h3>
                <div class="flex justify-between items-center mt-2" >
                    <strong class="mx-1 px-1 text-sm text-black flex items-center justify-center rounded-sm bg-[#fedebc] cursor-pointer font-normal" >{{ props.items.size }}</strong>
                    <button @click="hundleClick(path)" class="mx-1 px-1 text-sm text-white flex items-center justify-center rounded-sm bg-blue-500" >Download</button>
                </div>
            </div>
        </div>
        <div class="hidden w-full h-3 rounded-sm bg-gray-400 my-1  items-center justify-center after:absolute relative after:w-[42%] after:h-full after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-blue-500" >
            <small class="text-[8px] text-white relative block w-max z-20" >42%</small>
        </div>
    </div>
</template>

<style>
    @media screen and (max-width: 400px) {
        .downloadMovieItem {
            width: 100%;
            min-width: 100%;
        }
    }
</style>