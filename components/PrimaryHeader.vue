<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()

const links = [
    {
        text: "Home",
        ru_text: "Домашняя",
        route: "/"
    },
    /*{
        text: "News",
        ru_text: "Новости",
        route: "/news"
    },*/
    {
        text: "Roadmap",
        ru_text: "Планы",
        route: "/roadmap"
    },
    {
        text: "Explore",
        ru_text: "Моды",
        route: "/explore"
    }
]

const SessionCookie = useCookie("SESSION_KEY")

let dashboard_text = ref("")
let login_text = ref("")
let logout_text = ref("")

let option_b = ref()

const profile_menu = ref()

watchEffect(() => {
    dashboard_text.value = locale.value === "en" ? "Dashboard" : "Личный кабинет"
    login_text.value = locale.value === "en" ? "Log in" : "Войти"
    logout_text.value = locale.value === "en" ? "Log out" : "Выйти"
    option_b.value = !SessionCookie.value ? {
        label: login_text,
        icon: "i-heroicons-arrow-right-on-rectangle",
        to: "/login"
    } : {
        label: logout_text,
        icon: "i-heroicons-arrow-right-on-rectangle",
        click: () => {
            SessionCookie.value = undefined
            window.location.reload()
        }
    }
    profile_menu.value = [
        [
            {
                label: dashboard_text.value,
                to: "/dashboard"
            }
        ],
        [
            option_b.value
        ]
    ]
})
// !!!
const show_profile_dropdown = true
</script>

<template>
    <header>
        <NuxtLink to="/" class="home">
            <img class="primary" src="/logo.png">
            <img class="shadow" src="/logo.png">
            <img class="shadow" src="/logo.png">
            <img class="shadow" src="/logo.png">
            <img class="shadow" src="/logo.png">
        </NuxtLink>
        <div class="links">
            <NuxtLink v-for="link in links" :to="link.route">
                <span :class="{ current: route.fullPath === link.route }">{{ locale === "en" ? link.text : link.ru_text
                }}</span>
            </NuxtLink>
        </div>
        <div class="right">
            <LangSwitcher />
            <UDropdown v-if="show_profile_dropdown" :items="profile_menu" :popper="{ placement: 'bottom-start' }">
                <UAvatar class="profile-btn" alt="Benjamin Canac" />
            </UDropdown>
        </div>
    </header>
</template>

<style scoped lang="scss">
header {
    height: 4rem;
    margin: 0.75rem;
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(1px);
    border-radius: 8px;
    border: 1px rgba(255, 255, 255, 0.3) solid;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.8);
    padding: 0 1rem;
    display: flex;
    align-items: center;
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
        background-color: rgba(255, 255, 255, 0.5);
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
}

.profile-btn {
    border: 1px rgba(255, 255, 255, 0.3) solid;
}</style>