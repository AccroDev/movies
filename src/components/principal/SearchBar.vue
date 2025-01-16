<script setup>
    import { useSearchStore } from '@/stores/SearchStore';
    const SearchStore = useSearchStore();
</script>

<template> 
    <form @submit.prevent action="/search" method="post" class="w-full my-10">
        <h2 class="text-center my-2 mb-4 text-2xl" >Rechercher une serie/film</h2>
        <div class="w-full relative py-0 px-2" > 
            <input v-model="SearchStore.query" type="text" name="query" id="query" class="w-full py-2 pr-10 pl-2 text-base opacity-80 outline-none rounded transition-all duration-300 queryInput"> 
            <button @click="SearchStore.setSearch(!SearchStore.search)" type="submit" class="absolute top-1 mt-[2px] right-3 w-7 h-7 flex items-center justify-center rounded-full transition duration-300 hover:bg-[#fdae5c]" :class="SearchStore.search ? 'searchBtn' : ''" v-html="SearchStore.search ? '<i class=\'fas fa-plus rotate-45 \' ></i>' : '<i class=\'fas fa-search\' ></i>'" >  </button>
        </div>
    </form> 
</template>

<style scoped>
    .queryInput{
        box-shadow: 0px 0px 3px 2px #c5b1d97d;
    }
    .queryInput:focus {
        box-shadow: 0px 0px 3px 2px #c5b1d9
    }

    .searchBtn::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%; 
        z-index: 1; /* Place l'after au-dessus du bouton */
        border: 2px solid #000; /* Bordure de l'effet */
        border-radius: 100%; /* Rend le cercle */
        border-bottom: 2px solid transparent; /* Cache la partie inférieure */
        animation: rotate infinite 500ms linear; /* Animation de rotation */ 
    }

    /* Animation pour l'effet de gauche à droite */
    @keyframes rotate { 
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Permet au texte et à l'icône de rester visibles */
    .searchBtn { 
        overflow: hidden; /* Cache la partie qui dépasse */
        z-index: 0; /* Permet au contenu du bouton de rester au-dessus */
    }

    .searchBtn i {
        position: relative;
        z-index: 2; /* Assure que l'icône est au-dessus de l'effet */
    }

</style>