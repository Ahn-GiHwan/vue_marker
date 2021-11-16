<template>
  <h2 class="text-2xl p-5">
    내 정보 수정
  </h2>
  <section class="w-full">
    <div class="sticky top-24 left-0 right-0 flex justify-evenly items-center w-full h-12 bg-blue-100">
      <RouterLink
        to="displayname"
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400">
        닉네임
      </RouterLink>
      <RouterLink
        to="password"
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400">
        비밀번호 변경
      </RouterLink>
      <RouterLink
        to="profileimg"
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400">
        이미지 변경
      </RouterLink>
    </div>
    <RouterView />
  </section>
</template>
