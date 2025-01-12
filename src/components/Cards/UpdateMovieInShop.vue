<script setup>
    
</script>

<template>
    <div class="shopCard w-full overflow-hidden md:w-[47%] m-1 h-28 rounded flex" >
        <div class=" w-28 h-28 min-w-28 flex items-center justify-center shopMinia" >
            <img src="/src/assets/img/user.jpg" class="w-full h-full object-contain" alt="">
        </div>
        <div class="flex flex-col ml-1 py-2 overflow-hidden" >
            <h4 class="mb-auto font-semibold text-lg sm:text-sm  titleShop" ><strong>Bukavu : </strong>Wolf Services </h4>  
            <div class="mx-1" >
                <input class="w-full text-sm outline-none rounded-sm sm:text-xs py-[2px] px-1 border border-[#fdae5c] inpPath" type="text">
                <button class=" py-1 px-3 text-sm text-white bg-blue-500 rounded-sm sm:px-1 hover:opacity-85 transition-opacity duration-300 sm:text-xs mr-1 mt-1 saveUpBtn"> Enregistrer</button>
            </div>
        </div>
    </div>
</template>

<style scoped >
    @media screen and (max-width: 400px) {
        .saveUpBtn {
            padding: 1px 5px;
            font-size: 12px;
        }
        .inpPath {
            padding: 1px 5px;
            font-size: 12px;
        }
        .titleShop {
            font-size: 12px;
            line-height: 12px;
        }
    }
</style>