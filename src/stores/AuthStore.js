import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const displayBlock = ref("signin"); // "signin", "confirm", "success"
  const displayLoginBlock = ref("login"); // "login", "sendmail", "changepwd"
  const direction = ref("right"); // "right" ou "left"

  function setDisplayBlock(newValue,isLogin = false) {  
        if (isLogin) {
            const newOrder = ["login", "sendmail", "changepwd"];
            direction.value = determineDirection(displayLoginBlock.value, newValue,newOrder); 
            displayLoginBlock.value = newValue
        }else {
            direction.value = determineDirection(displayBlock.value, newValue); 
            displayBlock.value = newValue;
        }
  } 

  function determineDirection(current, next, newOrder = false) {
    const order = newOrder ? newOrder : ["signin", "confirm", "success"]; // Ordre logique
    let direction = order.indexOf(current) < order.indexOf(next) ? "right" : "left";
    console.log(direction);

    return direction;
  }

  return { displayBlock, direction, setDisplayBlock, displayLoginBlock,  };
});
