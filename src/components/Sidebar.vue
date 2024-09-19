<template>
  <div
    class="sidebar w-[56px] bg-[#E1E3E5] h-screen flex flex-col justify-between items-center py-2"
  >
    <div>
      <!-- Logo -->
      <div class="logo flex justify-center items-center px-[10px] py-[12px]">
        <img
          src="/src/assets/BetterHrLogo.png"
          class="w-[34px] h-[34px]"
          alt="Better Hr Logo"
        />
      </div>

      <!-- Navigation -->
      <div class="flex-col justify-between items-center gap-y-2 w-full">
        <IconNavigation
          v-for="(icon, index) in routes"
          :key="index"
          :url="icon.url"
          :iconPath="icon.path"
        />

        <IconButton :iconPath="mdiDotsHorizontal" />
      </div>
    </div>

    <!-- Footer -->
    <div>
      <div>
        <IconButton
          v-for="(icon, index) in buttonsArr"
          :key="index"
          :iconPath="icon.path"
          :onClick="icon.onClick"
        />
      </div>

      <div
        class="avatar rounded-full w-full flex justify-center items-center cursor-pointer"
      >
        <img
          src="/src/assets/images/profile.png"
          class="w-[40px] h-[40px]"
          alt="profile"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import IconNavigation from "./ui/IconNavigation.vue";
import IconButton from "./ui/IconButton.vue";

import {
  mdiTelevision,
  mdiAccount,
  mdiClockPlusOutline,
  mdiClockOutline,
  mdiBagChecked,
  mdiRepeatVariant,
  mdiBellOutline,
  mdiCreditCardOutline,
  mdiMessageProcessingOutline,
  mdiFileDownloadOutline,
  mdiFileCheckOutline,
  mdiDotsHorizontal,
} from "@mdi/js";

const routes = [
  { url: "/tv", path: mdiTelevision },
  { url: "/clock", path: mdiClockOutline },
  { url: "/bag-check", path: mdiBagChecked },
  { url: "/clock-plus", path: mdiClockPlusOutline },
  { url: "/employee", path: mdiAccount },
  { url: "/repeat", path: mdiRepeatVariant },
  { url: "/bell", path: mdiBellOutline },
  { url: "/credit-card", path: mdiCreditCardOutline },
  { url: "/message", path: mdiMessageProcessingOutline },
];

const handleDownload = () => {
  console.log("downloaded");
};

const handleFile = () => {
  console.log("file handle");
};

const buttonsArr = [
  { onClick: handleDownload, path: mdiFileDownloadOutline },
  { onClick: handleFile, path: mdiFileCheckOutline },
];
</script>
