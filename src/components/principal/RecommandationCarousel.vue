<script setup>
    import CarouselCard from "@/components/Cards/CarouselCard.vue";
    import Carousel from "@/assets/script/carouselle";
    import { onMounted } from "vue";

    
    onMounted(() => {
        console.log(document.getElementById("recommandation"));
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
    <div class="w-full mx-auto sm:w-[620px] md:w-[684px]" id="recommandation">
        <CarouselCard />
        <CarouselCard />
        <CarouselCard />
    </div>
</template>

<style>
    
</style>