<script setup>
    import { useMoviesStore } from '@/stores/MoviesStore';
    import { RouterLink } from 'vue-router';
    import { ref, defineProps, watch, onMounted, computed } from 'vue';
    import { useGlobalStore } from '../../stores/GlobalStore';
    import axios from 'axios';
    import { useSearchStore } from '@/stores/SearchStore';
    import { useAuthStore } from '@/stores/AuthStore';

    const props = defineProps({
        movie: {
            type: Object,
            required: true, 
        },
        store : {
            type : String,
            required: false
        },
        pathName : {
            type : String,
            required: false,
            default : 'description'
        }
    });

    const MoviesStore = useMoviesStore();
    const globalStore = useGlobalStore();
    const ShopsIsSelected = ref(false);
    const PathIsShow = ref(false); 
    const SearchStore = useSearchStore();
    const AuthStore = useAuthStore(); 
    const path = ref('');
    const addOrRemove = ref(true);

    async function like() {
        let movie = false; 
        
        if (props.store === 'searc-principal') {
            movie = SearchStore.results.find(m => m.id === props.movie.id); 
        } else if (props.store === 'search-other') {
            movie = SearchStore.otherResults.find(m => m.id === props.movie.id); 
        }else if(props.store === "history") {
             movie = AuthStore.historyMovies.find(m => m.id === props.movie.id);
        } else {
            movie = globalStore.movies.find(m => m.id === props.movie.id);
        }
        
        if (movie) { 
            movie.like = !movie.like;
            movie.likeCount += movie.like ? 1 : -1; 
            
            try {
                await axios.get(`${globalStore.apiHost}/api/vote/${movie.id}`);
            } catch (error) {
                console.error('Error voting for movie:', error);
            }
        }
    } 

    /* watch(() => globalStore.SelectedSearchShop, async (newValue) => {
        if (newValue) { 
            await MoviesStore.fetchMoviesInShop(newValue);  
        }else {
            ShopsIsSelected.value = false;
            path.value = '';
            PathIsShow.value = false;
            addOrRemove.value = true;
        }
    });  
        

    watch(() => MoviesStore.updatedOfMoviesInShop, async (newVal) => { 
        if (newVal && globalStore.SelectedSearchShop) {
            const shopMovies = MoviesStore.MoviesInShop[globalStore.SelectedSearchShop];
            ShopsIsSelected.value = true;
            if (shopMovies && shopMovies.some(m => m.id === props.movie.id)) {
                ShopsIsSelected.value = true;
                path.value = shopMovies.find(m => m.id === props.movie.id).path;
                PathIsShow.value = false;
                addOrRemove.value = false;
            } else {
                ShopsIsSelected.value = true;
                path.value = '';
                PathIsShow.value = false;
                addOrRemove.value = true;
            }
        } else {
            ShopsIsSelected.value = false;
            path.value = '';
            PathIsShow.value = false;
            addOrRemove.value = true;
        }  
    });

    async function addInShop() {
        const response = await axios.get(`${globalStore.apiHost}/api/addShopMovie`, {
            params : {
                movie: props.movie.id,
                shop:  globalStore.selectedShop.id,// ? globalStore.SelectedSearchShop
                address : 'computer'
            }
        }); 
        if (response.data.statut) {
           // await MoviesStore.fetchMoviesInShop(globalStore.SelectedSearchShop,true);
            await MoviesStore.fetchMoviesInShop(globalStore.selectedShop.id,true);
        }
    }  */   

   const pathFind = computed(() => {
        const selectedShop = props.pathName === 'description' ? MoviesStore.selectedShop.id : MoviesStore.SelectedSearchShop.id;
        if (MoviesStore.MoviesInShop[selectedShop]) {
            return {
                match : false,
                path : ""
            }
        } else {
            return {
                match : false,
                path : ""
            }
        } 
   })
</script>

<template>
    <div class="w-full -mb-3 sm:w-1/2 sm:px-1 overflow-hidden rounded-t-md relative movie-card">
        <div class="movie-control absolute top-2 left-0 right-0 w-full flex justify-between items-center k h-6 z-10  " >

            <!-- if ShopIsSelected and is auth -->
            <div v-if="false && ShopsIsSelected" class="pl-2 flex items-center justify-start" >

                <!-- add this movie on shop selected -->
                <button @click="addInShop" v-if="addOrRemove" class="bg-[#fdae5c] rounded-full px-2 py-[1px] text-xs flex items-center justify-center" >Ajouter</button>

                <!-- remove this movie on shop selected -->
                <button @click="addInShop" v-else class="bg-[#fdae5c] rounded-full px-2 py-[1px] text-xs flex items-center justify-center" >Supp.</button>

            </div>

            <!-- if ShopIsSelected and is auth -->
            <div v-if="MoviesStore.selectedShop !== '' || MoviesStore.SelectedSearchShop !== false " class="pl-2 flex items-center justify-start" >

                <!-- add this movie on shop selected -->
                <button @click="addInShop" v-if="movie.address === ''" class="bg-[#fdae5c] rounded-full px-2 py-[1px] text-xs flex items-center justify-center" >Ajouter</button>

                <!-- remove this movie on shop selected -->
                <button @click="addInShop" v-else-if="movie.address && movie.address !== ''" class="bg-[#fdae5c] rounded-full px-2 py-[1px] text-xs flex items-center justify-center" >Supp.</button>

            </div>

            <!-- if ShopIsSelected and is auth -->
            <div class="pr-2 flex justify-end items-center w-full" >

                <!-- show path where found this movies on shop selected
                <button v-if="(globalStore.selectedShop && globalStore.selectedShop !== '') ||  (ShopsIsSelected && path !== '') " @click="PathIsShow = ShopsIsSelected && path !== '' ? !PathIsShow : PathIsShow" :class="PathIsShow ? 'w-2/4 justify-between' : 'w-6 justify-center'" class="bg-[#fdae5c] rounded-full px-2 py-[1px] text-xs h-6 flex items-center transition-all duration-300 overflow-hidden whitespace-nowrap text-ellipsis"> {{ PathIsShow ? path : '' }} <i class="fas" :class="PathIsShow ? 'fa-plus rotate-45' : !PathIsShow 'fa-check' " ></i> </button> -->
 

                <!-- show my shops and path where found this movies when there is not shops selected
                <button v-if="AuthStore.userData.id && ShopsIsSelected === false" @click="MoviesStore.setDisplayAddInShop(true,movie.id)" class="bg-[#fdae5c] rounded-full px-2 py-[1px] text-xs w-6 h-6 flex items-center justify-center"> <i class="fas fa-info" ></i> </button> -->
            </div>
            
        </div>
        <router-link :to="{name : props.pathName, params : { slug : movie.titre, id : movie.id}}" class="block w-full h-auto bg-blue-200 cursor-pointer overflow-hidden min-h-40" >
            <img :src="movie.miniature" class="w-full hover:scale-110 transition-transform duration-300" :alt="movie.titre">
        </router-link>
        <div class="px-1 sm:px-2 py-1 -translate-y-5 bg-cardmovie-gradient h-14 flex justify-between items-center">
            <div class="titleBlock" >
                <div class="flex items-center w-full">
                    <button class="bg-[#fdae5c] rounded px-3 mr-1 font-semibold py-[1px] text-sm">{{ movie.vote.toFixed(2) }}</button>
                    <router-link :to="{name : props.pathName, params : { slug : movie.titre, id : movie.id}}" class="block text-bold text-2xl whitespace-nowrap text-ellipsis overflow-hidden w-full cursor-pointer hover:opacity-65" :title="movie.titre">{{ movie.titre }}</router-link>
                </div>
                <p class="text-xs opacity-70 whitespace-nowrap overflow-hidden text-ellipsis">Le {{ movie.date }}, {{ movie.type }}, Vote total : {{ movie.totLike }}</p>
            </div>

            <div @click="like" class="px-2 py-1 w-16 h-6 bg-custom-gradient rounded-full flex justify-center items-center text-white cursor-pointer hover:scale-105 transition-transform duration-300">
                <i class="fas fa-trophy text-sm " :class="movie.like ? 'text-[#ffee00]' : '' " ></i> 
                <strong class="ml-1">{{ movie.likeCount }}</strong>  
            </div>
        </div>
    </div>
</template>

<style>
    .titleBlock{
        width: calc(100% - 80px);
    }
</style>