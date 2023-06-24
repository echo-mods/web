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
        <NuxtLink to="/">
            <img src="/favicon.ico" alt="Logo">
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
}

.links {
    display: flex;
    gap: 1rem;
    margin-left: 2rem;
}

.links span {
    font-weight: 300;
    opacity: 0.75;
    transition: all 0.5s;
    position: relative;
    color: white;

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
}
</style>