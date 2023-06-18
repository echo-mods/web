<script setup lang="ts">
definePageMeta({
    name: 'Login',
    ru_name: 'Войти'
})

const { locale } = useI18n()
const { api_endpoint } = useAppConfig()
const code = ref("")

const submitted = ref(false)
const toast = useToast()
const SessionCookie = useCookie("SESSION_KEY")

const router = useRouter()

const authenticate = async () => {
    submitted.value = true
    const { data, error } = await useFetch(`${api_endpoint}login`, {
        method: "POST",
        query: {
            code: code.value
        }
    })
    const { session, user } = data.value
    SessionCookie.value = session
    toast.add({ title: `${locale.value === "en" ? "Welcome" : "Добро пожаловать"} ${user.first_name} ${user.last_name}!` })
    router.push("/dashboard")
}

defineShortcuts({
    enter: {
        usingInput: true,
        handler: () => {
            if (code.value.length >= 6) { authenticate() }
        }
    }
})
</script>

<template>
    <div class="form">
        <h1>{{ $t('login_heading') }}</h1>
        <hr>
        <h2>{{ $t("step_1") }}</h2>
        <a href="tg://resolve?domain=echomods_bot">
            <UButton color="white">
                <Icon name="jam:telegram" />{{ $t("start_bot") }}
            </UButton>
        </a>
        <hr>
        <h2>{{ $t("step_2") }}</h2>
        <UFormGroup :label="$t('code')">
            <UInput :disabled="submitted" type="number" icon="i-heroicons-key" v-model="code" />
        </UFormGroup>
        <UButton color="white" :icon="submitted ? '' : `i-heroicons-arrow-right-on-rectangle`" @click="authenticate" :loading="submitted"
            :disabled="code.length < 6" :label="submitted ? $t('logging_in') : $t('login')"></UButton>
    </div>
</template>

<style lang="scss" scoped>
.form {
    width: 50%;
    margin: 1rem 25%;
    padding: 3rem 5rem;
    border-radius: 8px;
    backdrop-filter: blur(1px);
    border: 1px rgba(255, 255, 255, 0.3) solid;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    h1 {
        font-size: 2rem;
        font-weight: 200;
        text-align: center;
    }

    h2 {
        align-self: flex-start;
        font-weight: 200;
    }

    hr {
        width: 100%;
        opacity: 0.3;
    }
}

@media (max-width: 600px) {
    .form {
        width: calc(100% - 2rem);
        margin: 1rem;
        padding: 1rem;
    }
}</style>