<template>
  <section class="absolute inset-0 top-10 flex justify-center items-center m-10 rounded-3xl bg-notFound bg-cover bg-no-repeat bg-center">
    <div class="flex flex-col justify-evenly items-center bg-white rounded-2xl overflow-hidden w-1/3 h-1/2">
      <span class="font-bold text-5xl">404</span>
      <span class="font-bold text-5xl">잘못된 페이지 입니다.</span>
      <button
        class="border-2 border-solid outline-none p-3 rounded-md bg-blue-400 text-white font-bold"
        @click="$router.push('/')">
        홈으로
      </button>
    </div>
  </section>
</template>


