import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { useGlobalStore } from './GlobalStore';

export const useAuthStore = defineStore('auth', () => {
  const globalStore = useGlobalStore();
  const displayBlock = ref("signin"); // "signin", "confirm", "success"
  const displayLoginBlock = ref("login"); // "login", "sendmail", "changepwd"
  const direction = ref("right"); // "right" ou "left"
  const userData = ref([]);
  const userShops = ref([]); 
  const historyMovies = ref([]);

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
    return direction;
  }

  function setUserDate (newData) {
    userData.value = newData
  }

  async function fetchUserShops() {
    try {
      const response = await axios.get(`${globalStore.apiHost}/api/get-user-shops`); 
      userShops.value = response.data;
    } catch (error) {
      console.error('Error fetching user shops:', error);
    }
  } 

  async function fetchHistory() {
    try {
      const response = await axios.get(`${globalStore.apiHost}/api/get-history`);
      historyMovies.value = response.data;
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  }

  async function DeleteShop(id) {
    userShops.value = userShops.value.filter(shop => shop.id !== id)
    try {
      const formData = new FormData();
            formData.append("shop_id",id)
      await axios.post(`${globalStore.apiHost}/api/delete-shop`,formData ); 
    } catch (error) {
      console.error('Error fetching user shops:', error);
    }
  } 

  async function logout() {
    userData.value = [];
    sessionStorage.removeItem('userData');
    try {
      const response = await axios.post(`${globalStore.apiHost}/api/logout`); 
    } catch (error) {
      console.log(error); 
    }
  }

  const shopSelected = ref(false);
  function setShopSelected(newValue) {
    shopSelected.value = newValue;
  }

  return { displayBlock, userData, setUserDate, direction, setDisplayBlock, displayLoginBlock, logout, userShops, fetchUserShops ,DeleteShop,shopSelected, setShopSelected, historyMovies, fetchHistory };
});
