<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
const { locale } = useI18n();
const route = useRoute();
const router = useRouter();

const links = [
    {
        text: "Home",
        ru_text: "Домашняя",
        route: "/",
    },
    {
        text: "News",
        ru_text: "Новости",
        route: "/news",
    },
    {
        text: "Roadmap",
        ru_text: "Планы",
        route: "/roadmap",
    },
    {
        text: "Explore",
        ru_text: "Моды",
        route: "/explore",
    },
];

let profile_text = ref("");
let login_text = ref("");
let logout_text = ref("");

let option_b = ref();

const profile_menu = ref();
const toast = useToast();

const user = useSupabaseUser();
const { auth } = useSupabaseClient();

watchEffect(() => {
    profile_text.value = locale.value === "en" ? "Profile" : "Профиль";
    login_text.value = locale.value === "en" ? "Log in" : "Войти";
    logout_text.value = locale.value === "en" ? "Log out" : "Выйти";
    option_b.value = !user.value
        ? {
              label: login_text,
              icon: "i-heroicons-arrow-left-on-rectangle",
              to: "/auth/login",
          }
        : {
              label: logout_text,
              icon: "i-heroicons-arrow-right-on-rectangle",
              click: async () => {
                  await auth.signOut();
                  toast.add({
                      title:
                          locale.value === "en"
                              ? "Logged out"
                              : "Вы успешно вышли",
                  });
              },
          };
    profile_menu.value = [
        [
            {
                label: user.value
                    ? locale.value === "en"
                        ? "You are logged in:"
                        : "Вы авторизованы:"
                    : locale.value === "en"
                    ? "You are not logged in"
                    : "Вы не авторизованы",
                slot: "account",
                disabled: true,
            },
        ],
    ];
	if (user.value) {
		profile_menu.value.push([
			{
				label: profile_text,
				to: `/profile/${useUsername(user.value)}`,
			},
		]);
	}
    profile_menu.value.push([option_b.value]);
});
const show_profile_dropdown = true;

const animating = useState("translation-animating");
const animating_to_lang: Ref<string> = useState("translation-animating-target");

watchEffect(() => {
    if (animating.value === true) {
        setTimeout(() => {
            mhOpen.value = false;
        }, 500);
        setTimeout(() => {
            animating.value = false;
        }, 1500);
    }
});
const isMobile = process.client ? useMediaQuery("(max-width: 750px)") : true;
const mhOpen = useState("mobile_header_open", () => false);

router.afterEach(() => (mhOpen.value = false));
</script>

<template>
    <header class="fake-header"></header>
    <Transition name="mobile-header">
        <header v-show="isMobile && mhOpen" class="__global-mobile-header">
            <div class="links">
                <NuxtLink v-for="link in links" :to="link.route">
                    <span :class="{ current: route.path === link.route }">{{
                        locale === "en" ? link.text : link.ru_text
                    }}</span>
                </NuxtLink>
            </div>
            <div class="right">
                <a download="" class="download_btn" href="/" target="_blank">
                    <UButton>{{ $t("call_to_download") }}</UButton>
                </a>
                <div class="divider" />
                <LangSwitcher />
                <div class="divider" />
                <UDropdown
                    v-if="show_profile_dropdown"
                    :items="profile_menu"
                    :popper="{ placement: 'bottom-start' }"
                >
                    <UAvatar
                        icon="i-heroicons-user-20-solid"
                        :style="{
                            border: user
                                ? `unset`
                                : `1px solid rgba(255, 255, 255, 0.5)`,
                        }"
                        :src="user ? user.user_metadata.avatar_url : undefined"
                    />
                    <template #account="{ item }">
                        <div class="text-left">
                            <p v-if="!user">
                                {{ item.label }}
                            </p>
                            <p
                                class="w-44 text-xs text-ellipsis overflow-hidden whitespace-nowrap font-medium text-gray-900 dark:text-white"
                            >
                                {{ useUsername(user) }}
                            </p>
                        </div>
                    </template>
                </UDropdown>
            </div>
        </header>
    </Transition>
    <header :class="{ mobile: isMobile }">
        <NuxtLink to="/" class="home">
            <img class="primary" src="/logo.png" />
            <img class="shadow" src="/logo.png" />
            <img class="shadow" src="/logo.png" />
            <img class="shadow" src="/logo.png" />
            <img class="shadow" src="/logo.png" />
        </NuxtLink>
        <template v-if="!isMobile">
            <div class="links">
                <NuxtLink v-for="link in links" :to="link.route">
                    <span :class="{ current: route.path === link.route }">{{
                        locale === "en" ? link.text : link.ru_text
                    }}</span>
                </NuxtLink>
            </div>
            <div class="right">
                <a download="" class="download_btn" href="/" target="_blank">
                    <UButton>{{ $t("call_to_download") }}</UButton>
                </a>
                <div class="divider" />
                <LangSwitcher />
                <div class="divider" />
                <UDropdown
                    v-if="show_profile_dropdown"
                    :items="profile_menu"
                    :popper="{ placement: 'bottom-start' }"
                >
                    <UAvatar
                        icon="i-heroicons-user-20-solid"
                        :style="{
                            border: user
                                ? `unset`
                                : `1px solid rgba(255, 255, 255, 0.5)`,
                        }"
                        :src="user ? user.user_metadata.avatar_url : undefined"
                    />
                    <template #account="{ item }">
                        <div class="text-left">
                            <p v-if="!user">
                                {{ item.label }}
                            </p>
                            <p
                                class="w-44 text-xs text-ellipsis overflow-hidden whitespace-nowrap font-medium text-gray-900 dark:text-white"
                            >
                                {{ useUsername(user) }}
                            </p>
                        </div>
                    </template>
                </UDropdown>
            </div>
        </template>
        <UButton
            icon="i-heroicons-bars-4-20-solid"
            variant="link"
            v-if="isMobile"
            size="xl"
            style="margin-left: auto"
            @click="mhOpen = !mhOpen"
        />
    </header>
    <ClientOnly>
        <div
            v-if="
                !(
                    route.path.startsWith('/news/ru') ||
                    route.path.startsWith('/news/en')
                )
            "
            class="translation-effect"
            :class="{ slide: animating }"
        ></div>
        <TransitionGroup name="lang_indicator">
            <div
                class="target ru"
                v-if="animating_to_lang === 'ru' && animating"
            >
                <Icon name="circle-flags:us" />
                <Icon name="line-md:arrow-left" style="rotate: 180deg" />
                <Icon name="circle-flags:ru" />
            </div>
            <div class="target en" v-else-if="animating">
                <Icon name="circle-flags:ru" />
                <Icon name="line-md:arrow-left" style="rotate: 180deg" />
                <Icon name="circle-flags:us" />
            </div>
        </TransitionGroup>
    </ClientOnly>
</template>

<style scoped lang="scss">
@keyframes slide {
    33% {
        width: 100%;
        left: 0;
    }
    100% {
        width: 0;
        left: 100%;
    }
}

.translation-effect {
    position: absolute;
    left: -100%;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(15, 15, 15, 0.1);
    backdrop-filter: blur(3rem);
    transition: none;
    z-index: 100;

    &.slide {
        animation: slide 1.5s ease-in-out;
    }
}

.target {
    pointer-events: none;
    position: absolute;
    bottom: 2vw;
    left: 2vw;
    translate: 0 -25%;
    display: flex;
    gap: 1rem;
    z-index: 101;
    border-radius: 0.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.8rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(1px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.8);

    > svg {
        font-size: 1.5rem;
    }
}

.__global-mobile-header {
    position: fixed;
    inset: 0;
    height: unset;
    flex-direction: column;
    border-top: none;
    gap: 1rem;
    padding: 1rem 2rem;
    padding-top: 5rem;
    z-index: 2 !important;
    .links {
        margin-top: auto;
        flex-direction: column;
        align-items: center;
    }
    .right {
        margin-left: unset;
        margin-top: auto;
        justify-content: space-between;
        width: 100%;
        .download_btn,
        .divider {
            display: none;
        }
    }
}

header {
    height: 4rem;
    margin: 0.75rem;
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(1rem) brightness(0.5);
    border-radius: 8px;
    border: 1px rgba(255, 255, 255, 0.3) solid;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.8);
    padding: 0 1rem;
    display: flex;
    align-items: center;
    //
    z-index: 3;
    position: fixed;
    inset: 0;
    bottom: unset;

    .home {
        position: relative;
        width: 2.8rem;
        aspect-ratio: 1;
        transition: all 0.3s;
    }

    .home:hover {
        transform: translateY(0.2rem);
        transition: all 0.6s;
    }

    .primary {
        position: absolute;
        aspect-ratio: 1;
        transform: none;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        z-index: 2;
        width: 100%;
    }

    .primary:hover {
        transform: rotate3d(1, -1, 0.5, 25deg);
        transition: all 0.3s ease-in-out;
    }

    .shadow {
        position: absolute;
        transform: none;
        transition: all 1s;
        pointer-events: none;
        opacity: 0;
        aspect-ratio: 1;
        pointer-events: none;
        width: 100%;
    }

    .home:has(.primary:hover) .shadow:nth-child(2) {
        transition-delay: 50ms;
        transform: rotate3d(1, -1, 0.5, 25deg) translate(-8%, -8%);
        opacity: 0.4;
    }

    .home:has(.primary:hover) .shadow:nth-child(3) {
        transition-delay: 100ms;
        transform: rotate3d(1, -1, 0.5, 25deg) translate(-16%, -16%);
        opacity: 0.3;
    }

    .home:has(.primary:hover) .shadow:nth-child(4) {
        transition-delay: 150ms;
        transform: rotate3d(1, -1, 0.5, 25deg) translate(-24%, -24%);
        opacity: 0.2;
    }

    .home:has(.primary:hover) .shadow:nth-child(5) {
        transition-delay: 200ms;
        transform: rotate3d(1, -1, 0.5, 25deg) translate(-32%, -32%);
        opacity: 0.1;
    }
}

.links {
    display: flex;
    gap: 1rem;
    margin-left: 2rem;
}

.links span {
    font-weight: 500;
    opacity: 0.75;
    transition: all 0.5s;
    position: relative;
    color: white;
    text-transform: uppercase;

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 0.5px;
        bottom: 0;
        left: 0;
        background-color: rgb(var(--color-primary-500) / 0.4);
        visibility: hidden;
        -webkit-transform: scaleX(0) translateY(0.3rem);
        transform: scaleX(0) translateY(0.3rem);
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
    }
}

.links span.current {
    opacity: 1;

    &::before {
        visibility: visible;
        -webkit-transform: scaleX(1) translateY(0.3rem);
        transform: scaleX(1) translateY(0.3rem);
    }
}

.right {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-left: auto;

    .divider {
        width: 1px;
        height: 2rem;
        background-color: rgba(255, 255, 255, 0.5);
    }
}

.lang_indicator-enter-active,
.lang_indicator-leave-active {
    transition: all 0.5s;
}

.lang_indicator-enter-from,
.lang_indicator-leave-to {
    opacity: 0;
    translate: 0 25%;
}

//
.mobile-header-enter-active,
.mobile-header-leave-active {
    transition: all 0.5s;
}

.mobile-header-enter-from,
.mobile-header-leave-to {
    opacity: 0;
    scale: 0.9;
}

.fake-header {
    position: unset;
    opacity: 0;
}
</style>
