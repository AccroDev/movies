<script setup>
    import HeaderComponent from '@/components/principal/HeaderComponent.vue';
    import MyShops from '@/components/ProfilComponents/MyShops.vue';
    import HistoryComponent from '@/components/ProfilComponents/HistoryComponent.vue';
    import { useAuthStore } from '@/stores/AuthStore';
    import { useRouter } from 'vue-router'; 
    import { ref } from 'vue';
    import axios from 'axios';
    import { useGlobalStore } from '@/stores/GlobalStore';

    const AuthStore = useAuthStore(); 
    const GlobalStore = useGlobalStore();
    const Routeur = useRouter(); 
    const newAvatar = ref(null);
    const showSaveButton = ref(false);

    function logout() {
        AuthStore.logout();
        Routeur.push({ name : "home"});
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                AuthStore.userData.avatar = e.target.result;
                AuthStore.userData.avatarUpdate = true;
                newAvatar.value = file;
                showSaveButton.value = true;
            };
            reader.readAsDataURL(file);
        }
    }

    async function saveAvatar() {
        if (!newAvatar.value) return;

        const formData = new FormData();
        formData.append('avatar', newAvatar.value);

        try {
            const response = await axios.post(`${GlobalStore.apiHost}/api/update-avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.statut) { 
                showSaveButton.value = false;
                AuthStore.userData.avatar = response.data.path;
                AuthStore.userData.avatarUpdate = false;
                sessionStorage.setItem('userData', JSON.stringify(AuthStore.userData));
            } else {
                alert('Échec de la mise à jour de l\'avatar.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'avatar :', error);
            alert('Erreur lors de la mise à jour de l\'avatar.');
        }
    }
</script>

<template>
    <HeaderComponent />
    <section class="hero-profil max-w-3xl mx-auto" >
        <div class="bg-custom-gradient h-28  flex justify-center items-center relative   before:absolute before:top-0 before:right-0 before:bg-black/25 before:w-full before:h-full" > 
            <h3 class="text-white font-semibold text-3xl whitespace-nowrap w-full text-center overflow-hidden text-ellipsis relative" > {{ AuthStore.userData.name }} </h3>
        </div>
        <div class="flex justify-start items-end ml-5 -translate-y-8 AboutHero" >
            <div class="w-32 h-32 rounded-lg overflow-hidden relative" >
                <img :src="AuthStore.userData.avatarUpdate ? AuthStore.userData.avatar : GlobalStore.apiHost + AuthStore.userData.avatar" class="w-full" alt="">
                <input type="file" class="hidden" id="avatarInput" @change="handleFileChange">
                <label for="avatarInput" class="absolute bottom-1 left-1 bg-blue-500 text-white text-xs rounded-sm cursor-pointer px-1 opacity-85 "> <i class="fas fa-upload" ></i> </label>
                <button v-if="showSaveButton" @click="saveAvatar" class="absolute bottom-1 right-1 bg-green-500 text-white text-xs rounded-sm px-1 opacity-85 ">Save</button>
            </div>
            <div class="ml-2" > 
                <h4 class="text-sm sm:text-base my-1" ><span class="sm:hidden inline-block text-inherit" >Insc : </span><span class="hidden sm:inline-block text-inherit" >Inscription : </span> <strong class="bg-[#3b2b9f] text-white px-1 rounded text-sm sm:text-base" > {{ AuthStore.userData.date }} </strong> </h4>
                <h4 class="text-sm sm:text-base my-1" >Compte :  <strong class="bg-[#3b2b9f] text-white px-1 rounded text-sm sm:text-base"  >Standar</strong> </h4>
                <button @click.prevent="logout" class=" my-1 text-red-900 underline rounded text-sm sm:text-base" >Déconnexion</button>
            </div>
        </div>
    </section>  
    <MyShops />
    <HistoryComponent />
    <router-view ></router-view>
</template>

<style>
    @media screen and (max-width: 250px) {
        .AboutHero {
            flex-direction: column;
            margin: 0;
            align-items: center;
        }
    }
</style>