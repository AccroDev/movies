<script setup>
    import { useAuthStore } from '@/stores/AuthStore'; 
    import ContainerMovies from '../principal/ContainerMovies.vue';

    const authStore = useAuthStore();
</script>

<template>
    <div class="w-full flex flex-wrap  min-h-full" > 
        <div  v-if="!authStore.userData.id"  class="w-full bg-white overflow-hidden min-h-full flex flex-col justify-between">
            <!-- Header -->
            <div class="bg-red-500 text-white text-center py-6">
                <h2 class="text-2xl font-bold">Oops !</h2>
                <p class="mt-1 text-sm">Connectez-vous ou inscrivez-vous pour continuer</p>
            </div>
    
            <!-- Content -->
            <div class="p-6">
                <p class="text-gray-700 mb-4 text-sm leading-6">
                    Pour télécharger cette série ou ce film, veuillez vous connecter ou vous inscrire si vous n’avez pas encore de compte. 
                    C’est facile et rapide !
                </p>
                <p class="text-gray-700 mb-4 text-sm leading-6">
                    Créez votre compte en entrant juste votre email, votre nom et un mot de passe sécurisé.
                </p>
                <ul class="text-gray-700 mb-4 space-y-2 pl-4 list-disc"> 
                    <li>Recommandez vos séries ou films préférés.</li>
                    <li>Accédez à votre historique de visionnage.</li>
                    <li>Télécharger tout les films et Series</li>
                    <li>Gagnez de l'argent avec une Boutique de transfert gratuitement crée</li>
                    <li>Et Profitez de nombreux autres avantages!</li>
                </ul>
            
                <!-- Buttons -->
                <div class="flex space-x-4">
                    <router-link :to="{ name : 'login'}" class="w-1/2 bg-blue-500 text-white text-center font-semibold py-2 rounded hover:bg-blue-600">
                    Se connecter
                    </router-link>
                    <router-link :to="{ name : 'signin'}" class="w-1/2 bg-green-500 text-white text-center font-semibold py-2 rounded hover:bg-green-600">
                    S'inscrire
                    </router-link>
                </div>
            </div>
    
            <!-- Footer -->
            <div class="bg-gray-50 p-4 text-center text-sm text-gray-500">
                Pas de spam, juste une expérience utilisateur exceptionnelle. 🌟
            </div>
        </div> 
        <div v-else-if="authStore.userData.id && authStore.userData.accreditation && authStore.userData.accreditation < 2" class="w-full bg-white shadow-lg overflow-hidden min-h-full flex flex-col justify-between ">
            <!-- Header -->
            <div class="bg-yellow-500 text-white text-center py-6">
                <h2 class="text-2xl font-bold">Compte Premium Requis !</h2>
                <p class="mt-1 text-sm">Débloquez l'accès complet à toutes nos séries et films</p>
            </div>

            <!-- Content -->
            <div class="p-6">
                <p class="text-gray-700 mb-4 text-sm leading-6">
                    Pour télécharger des séries ou des films, vous devez posséder un compte <span class="font-semibold text-yellow-600">Premium</span>. 
                    Bonne nouvelle, ce compte ne coûte que <span class="font-semibold text-yellow-600">1 $/mois</span> ! Voici comment l'obtenir :
                </p>
                <ul class="text-gray-700 mb-6 space-y-2 pl-4 list-disc">
                    <li>Envoyez-nous un message sur WhatsApp au <span class="font-semibold">+257 664 782 79</span>.</li>
                    <li>Contactez-nous sur notre page Facebook nommée <span class="font-semibold">Accrodev</span>.</li>
                </ul>

            <div class="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p class="font-semibold text-gray-800">Avec un compte Premium, vous bénéficiez de :</p>
                <ul class="text-gray-700 mt-2 space-y-1 pl-4 list-disc">
                <li>Téléchargement illimité de toutes les séries et films.</li>
                <li>Accès Premium à nos autres applications :
                    <span class="font-semibold">Accrodev</span>, <span class="font-semibold">Accrodev Market</span> et <span class="font-semibold">Accrodev Money</span>.
                </li>
                <li>Streaming de séries directement sur notre site.</li>
                <li>Possibilité de gagner de l'argent en créant une boutique de transfert gratuitement sur notre plateforme.</li>
                </ul>
            </div>
            </div>

            <!-- Footer -->
            <div class="p-6 bg-gray-100 text-center text-sm text-gray-600">
                <p>Abonnez-vous dès aujourd'hui et profitez d'une expérience complète et enrichissante !</p>
            </div>
        </div>  
        <ContainerMovies v-else />  
    </div>
            
</template>

<style>
    
</style>