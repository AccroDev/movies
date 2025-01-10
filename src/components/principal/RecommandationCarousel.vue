<script setup>
    import CarouselCard from "@/components/Cards/CarouselCard.vue";
    import Carousel from "@/assets/script/carouselle";
    import { onMounted } from "vue";

    
    onMounted(() => { 
        new Carousel(document.getElementById("recommandation"),{
            slidesToScroll : 1,
            slidesVisible : 1,
            pagination : true,
            showOthers : false,
            infinite : false,
            touch : true
        });
    });
</script>

<template>
    <!-- sm:w-[620px] md:max-w-[701px] md:w-[684px] -->
    <div class="w-full mx-auto sm:w-[95%] sm:max-w-[95%] md:max-w-[701px] md:w-[701px]" id="recommandation">
        <CarouselCard />
        <CarouselCard />
        <CarouselCard />
    </div>
</template>

<style>
    
</style>