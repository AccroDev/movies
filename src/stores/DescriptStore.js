import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDescriptStore = defineStore('descript', () => {
  const displayBlock = ref("descript"); // "descript", "shops", "download"
  const direction = ref("right"); // "right" ou "left"

  function setDisplayBlock(newValue) { 
    direction.value = determineDirection(displayBlock.value, newValue); 
    displayBlock.value = newValue;
  }

  function determineDirection(current, next) {
    const order = ["descript", "shops", "download"]; // Ordre logique
    let direction = order.indexOf(current) < order.indexOf(next) ? "right" : "left";  
    return direction;
  }

  return { displayBlock, direction, setDisplayBlock };
});
