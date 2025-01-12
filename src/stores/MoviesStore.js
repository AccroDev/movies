import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', () => {
  const DisplayAddInShop = ref(false); // "signin", "confirm", "success" 

  function setDisplayAddInShop(newValue) {  
    DisplayAddInShop.value = newValue; 
  }   

  return { DisplayAddInShop, setDisplayAddInShop};
});
