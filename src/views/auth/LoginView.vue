<script setup>  
    import { ref } from 'vue';
    import HeaderComponent from '@/components/principal/HeaderComponent.vue';
    import { useAuthStore } from '@/stores/AuthStore';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import { useGlobalStore } from '@/stores/GlobalStore';


    const email = ref('');
    const password = ref('');
    const confcode = ref('');
    const rememberMe = ref(false);
    const Sending = ref(false);
    const errors = ref(false);
    const AuthStore = useAuthStore();
    const globalStore = useGlobalStore();
    const router = useRouter();

    const handleSubmit = async () => { 
 
      const formData = new FormData();
        formData.append("email", email.value);
        formData.append("password", password.value);  

      if (Sending.value) {
        return
      }
      Sending.value = true;

      try { 

        const response = await axios.post(`${globalStore.apiHost}/api/login`,formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }); 
        
        if (response.data.statut && response.data.statut === true) { 
          errors.value = false; 
          AuthStore.setUserDate({
            "name" : response.data.name,
            "email" : response.data.email,
            "accreditation" : response.data.accreditation,
            "date" : response.data.date,
            "avatar" : response.data.avatar,
            "id" : response.data.id, 
          })
          sessionStorage.setItem('userData', JSON.stringify({
            "name" : response.data.name,
            "email" : response.data.email,
            "accreditation" : response.data.accreditation,
            "date" : response.data.date,
            "avatar" : response.data.avatar,
            "id" : response.data.id, 
          }))

          //rediriger 
          router.push({ name: 'home' }); 

        }else { 
          errors.value = response.data.message ? response.data.message : " Erreur Serveur "
        }  

        Sending.value = false;
      } catch (error) {

        Sending.value = false;
        errors.value = "veillez vérifier votre connexion"
        console.error('Error fetching recommended movies:', error);

      }  
      
    };

    const resetError = ref(false);
    const isResetSending = ref(false);
    async function restorePwd () { 
      if (isResetSending.value) {
        return;
      } 

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const checkEmail =  emailRegex.test(email.value); 
      if (!checkEmail) { 
        resetError.value = 'Email Incorrect';
        return;
      }
      
      Sending.value = true;
      const formData = new FormData(); 
        formData.append("email", email.value);

      try { 
        isResetSending.value = true;
        const response = await axios.post(`${globalStore.apiHost}/api/forgot-password`,formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }); 

        if (response.data.statut) {
          AuthStore.setDisplayBlock('changepwd',true)
        } else {
          resetError.value = response.data.message ? response.data.message :  "Server Error :)";
        }
        isResetSending.value = false;
      } catch (error) {
        resetError.value = "Vérifier votre connexion";
        console.log(error); 
        isResetSending.value = false;
      } 


    }

    const changePwdError = ref(false);
    const changeSending = ref(false);

    const changepwd = async () => {
      // send axios request to serveur for changing data
      //password confcode
      if (changeSending.value) {
        return;
      }  
      
      if (confcode.value < 100 || password.value.length < 4 ) {
        changePwdError.value = "Code de confirmation ou mot de pass tres court";
        return;
      }
 
      const formData = new FormData(); 
        formData.append("confirmation_code", confcode.value);
        formData.append("new_password", password.value);
        formData.append("email", email.value);

      try { 
        changeSending.value = true;
        const response = await axios.post(`${globalStore.apiHost}/api/reset-password`,formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }); 

        if (response.data.statut) {
            //login user and push to home
            changePwdError.value = false;
            AuthStore.setUserDate({
              "name" : response.data.name,
              "email" : response.data.email,
              "accreditation" : response.data.accreditation,
              "date" : response.data.date,
              "avatar" : response.data.avatar,
              "id" : response.data.id, 
            })

            //rediriger
             
            router.push({ name: 'home' }); 

        } else {
          changePwdError.value = response.data.message ? response.data.message :  "Server Error :)";
        }
        changeSending.value = false;
      } catch (error) {
        changePwdError.value = "Vérifier votre connexion";
        console.log(error); 
        changeSending.value = false;
      } 


    }

   
</script>

<template>
  <HeaderComponent/> 
  <section class="w-full loginSection flex items-center justify-center bg-custom-gradient p-2 sm:p-4 relative">
    <div class="overflow-hidden p-8 rounded-lg w-full max-w-md relative z-10 animate-fade-in">
      
        <transition
            :name="AuthStore.direction === 'right' ? 'slide-right' : 'slide-left'"
            mode="out-in"
        > 
            <form :key="AuthStore.displayLoginBlock"  @submit.prevent="handleSubmit">



              <div v-if="AuthStore.displayLoginBlock === 'login'" > 
                <h2 class="text-2xl font-bold mb-6 text-center text-white">Connexion</h2>
                <div class="mb-4">
                  <label for="email" class="block text-sm font-medium text-white">Email</label>
                  <input type="email" id="email" v-model="email" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none sm:text-sm bg-transparent text-white">
                </div>
                <div class="mb-6">
                  <label for="password" class="block text-sm font-medium text-white">Mot de passe</label>
                  <input type="password" id="password" v-model="password" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none  sm:text-sm bg-transparent text-white">
                </div>
                <div class="sm:flex items-center justify-between mb-6">
                  <div class="flex items-center my-1"> 
                    <router-link :to="{name: 'signin'}" class="ml-2 block text-sm text-white" >Créer un compte</router-link>
                  </div>
                  <div class="text-sm my-1" @click="AuthStore.setDisplayBlock('sendmail',true)" >
                      <a @click.prevent href="#" class="font-medium text-white hover:text-gray-200">Mot de passe oublié?</a>
                  </div>
                </div>
                <div v-if="errors" class=" m-3 text-sm text-red-200 underline lowercase" > {{ errors }} </div>
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">Se connecter</button>
              </div>




                <div v-if="AuthStore.displayLoginBlock === 'sendmail'" >
                    <h2 class="text-2xl font-bold mb-6 text-center text-white">Récuperer son Compte</h2>
                    <div class="mb-6">
                        <span class="block text-sm font-medium text-white mt-5 mb-2"> Nous allons vous aider à recuperer votre compte</span>
                        <label for="email" class="block text-sm font-medium text-white">Entrer votre adress mail</label>
                        <div class="relative">
                          <input type="email" v-model="email" id="email" required class="mt-5 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none  sm:text-sm bg-transparent text-white">
                          <i v-if="resetError !== false"  class="fas fa-triangle-exclamation inline-flex items-center top-0 bottom-0 absolute right-0 text-red-400" style="display: inline-flex;" ></i>
                        </div>
                    </div> 

                    <div v-if="resetError" class=" m-3 text-sm text-red-200 underline lowercase" > {{ resetError }} </div>
                    <div class="flex flex-wrap justify-between" >

                        <button  @click="AuthStore.setDisplayBlock('login',true)" type="submit" class="w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">Retourner</button> 
                        <button  @click.prevent="restorePwd" type="button" class="w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">
                          <span class="inline-flex justify-center items-center" v-if="isResetSending" >
                            <span class="spinner inline-block w-4 h-4 border-2 mr-1 border-white border-b-2 border-b-transparent rounded-full" ></span> Encours...
                          </span> 
                          <span v-else >Envoyer</span> </button>

                    </div>
                </div>



                <div v-if="AuthStore.displayLoginBlock === 'changepwd'" >
                    <h2 class="text-2xl font-bold mb-6 text-center text-white">Récuperer son Compte</h2>
                    <label for="email" class="block text-sm my-5 font-medium text-white">Un code de confirmation a été envoyé à votre adresse e-mail. Veuillez consulter votre boîte de réception principale ou vos spams (messages indésirables) pour trouver ce code. Ensuite, entrez-le dans le champ ci-dessous pour confirmer que c'est votre email.</label>
                    <div class="mb-4">
                        <label for="codeConf" class="block text-sm font-medium text-white">Code de Confirmation</label>
                        <input type="text" id="codeConf" v-model="confcode" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none sm:text-sm bg-transparent text-white">
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium text-white">Nouveaux Mot de passe</label>
                        <input type="text" id="password" v-model="password" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none  sm:text-sm bg-transparent text-white">
                    </div> 
                    <div v-if="changePwdError" class=" m-3 text-sm text-red-200 underline lowercase" > {{ changePwdError }} </div>
                    <button @click.prevent="changepwd" type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">
                      <span class="inline-flex justify-center items-center" v-if="changeSending" >
                        <span class="spinner inline-block w-4 h-4 border-2 mr-1 border-white border-b-2 border-b-transparent rounded-full" ></span> Enregistrement...
                      </span> 
                      <span v-else >Enregistrer</span> 
                    </button>
                </div>
            </form>
        </transition>
    </div>
  </section>
</template>
 

<style scoped>
    /* Animation vers la droite */
    .slide-right-enter-active, .slide-right-leave-active {
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .slide-right-enter-from {
      transform: translateX(100%);
      opacity: 0;
    }

    .slide-right-enter-to {
      transform: translateX(0);
      opacity: 1;
    }

    .slide-right-leave-from {
      transform: translateX(0);
      opacity: 1;
    }

    .slide-right-leave-to {
      transform: translateX(-100%);
      opacity: 0;
    }

    /* Animation vers la gauche */
    .slide-left-enter-active, .slide-left-leave-active {
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .slide-left-enter-from {
      transform: translateX(-100%);
      opacity: 0;
    }

    .slide-left-enter-to {
      transform: translateX(0);
      opacity: 1;
    }

    .slide-left-leave-from {
      transform: translateX(0);
      opacity: 1;
    }

    .slide-left-leave-to {
      transform: translateX(100%);
      opacity: 0;
    } 
    .loginSection {
        min-height: calc(100vh - 80px);
    }
</style>