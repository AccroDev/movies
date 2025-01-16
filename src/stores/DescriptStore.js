import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDescriptStore = defineStore('descript', () => {
  const displayBlock = ref("descript"); // "descript", "shops", "download"
  const direction = ref("right"); // "right" ou "left"
  const moviesData = ref([]);

  function setDisplayBlock(newValue) { 
    direction.value = determineDirection(displayBlock.value, newValue); 
    displayBlock.value = newValue;
  }

  function determineDirection(current, next) {
    const order = ["descript", "shops", "download"]; // Ordre logique
    let direction = order.indexOf(current) < order.indexOf(next) ? "right" : "left";  
    return direction;
  }

  function setMovieData(data) {
    const index = moviesData.value.findIndex(movie => movie.id === data.id);
    if (index !== -1) {
      moviesData.value[index] = data;
    } else {
      moviesData.value.push(data);
    }
  }

  function getMovieData(id) {
    return moviesData.value.find(movie => movie.id === id);
  }

  return { displayBlock, direction, setDisplayBlock, moviesData, setMovieData, getMovieData };
});
