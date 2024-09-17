<template>
  <div
    class="w-[56px] bg-[#E1E3E5] h-screen flex flex-col justify-between items-center py-2"
  >
    <div class="flex-col justify-between items-center gap-y-2 w-full">
      <!-- logo -->
      <div class="flex justify-center items-center px-[10px] py-[12px]">
        <img
          src="/src/assets/BetterHrLogo.png"
          class="w-[34px] h-[34px]"
          alt="Better Hr Logo"
        />
      </div>

      <!-- First icon navigation group -->
      <IconNavigation url="/about" :iconPath="mdiTelevision" />
      <IconNavigation url="/clock" :iconPath="mdiClockOutline" />
      <IconNavigation url="/clock" :iconPath="mdiBagChecked" />
      <IconNavigation url="/clock" :iconPath="mdiClockPlusOutline" />
      <IconNavigation url="/" :iconPath="mdiAccount" />
      <IconNavigation url="/clock" :iconPath="mdiRepeatVariant" />
      <IconNavigation url="/clock" :iconPath="mdiBellOutline" />
      <IconNavigation url="/clock" :iconPath="mdiCreditCardOutline" />
      <IconNavigation url="/clock" :iconPath="mdiMessageProcessingOutline" />
    </div>
    <div>
      <IconNavigation url="/about" :iconPath="mdiFileDownloadOutline" />
      <IconNavigation url="/about" :iconPath="mdiFileCheckOutline" />
      <!-- Avata -->
      <div
        class="rounded-full w-full flex justify-center items-center cursor-pointer"
      >
        <img
          src="/src/assets/images/profile.png"
          class="size-[40px]"
          alt="profile"
        />
      </div>
    </div>
    <!-- 2 icon and avatar -->
  </div>
</template>

<script setup>
import IconNavigation from "./ui/IconNavigation.vue";

// Icons Import
import { mdiTelevision } from "@mdi/js";
import { mdiAccount } from "@mdi/js";
import { mdiClockPlusOutline } from "@mdi/js";
import { mdiClockOutline } from "@mdi/js";
import { mdiBagChecked } from "@mdi/js";
import { mdiRepeatVariant } from "@mdi/js";
import { mdiBellOutline } from "@mdi/js";
import { mdiCreditCardOutline } from "@mdi/js";
import { mdiMessageProcessingOutline } from "@mdi/js";
import { mdiFileDownloadOutline } from "@mdi/js";
import { mdiFileCheckOutline } from "@mdi/js";
</script>
