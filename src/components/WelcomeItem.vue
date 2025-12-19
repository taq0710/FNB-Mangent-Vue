<template>
  <div class="mt-8 flex relative lg:mt-0 lg:py-2 lg:pb-4 lg:pl-20">
    <i class="flex items-center justify-center w-8 h-8 text-gray-800 lg:absolute lg:top-1/2 lg:-top-[25px] lg:-left-[26px] lg:border lg:border-gray-200 lg:bg-white lg:rounded-lg lg:w-[50px] lg:h-[50px]">
      <slot name="icon"></slot>
    </i>
    <div class="flex-1 ml-4">
      <h3 class="text-xl font-medium mb-1.5 text-gray-800">
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .lg\:pl-20::before {
    content: ' ';
    border-left: 1px solid rgb(229, 231, 235);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .lg\:pl-20::after {
    content: ' ';
    border-left: 1px solid rgb(229, 231, 235);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .lg\:pl-20:first-of-type::before {
    display: none;
  }

  .lg\:pl-20:last-of-type::after {
    display: none;
  }
}
</style>
