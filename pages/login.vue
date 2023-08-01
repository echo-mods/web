<script setup lang="ts">
definePageMeta({
    name: 'Login',
    ru_name: 'Войти'
})

const { locale } = useI18n()
const { api_endpoint } = useAppConfig()
const input = reactive({
    login: "",
    password: ""
})

const submitted = ref(false)
const toast = useToast()
const SessionCookie = useCookie("SESSION_KEY")

const router = useRouter()

const login_error = ref("")

const authenticate = async () => {
    submitted.value = true
    const { data, error } = await useFetch(`${api_endpoint}login`, {
        method: "POST",
        body: {
            login: input.login,
            password: input.password
        }
    })
    if (error.value) {
        login_error.value = "login_error"
        submitted.value = false
        return
    }
    const { session, user } = data.value
    SessionCookie.value = session
    toast.add({ title: `${locale.value === "en" ? "Welcome" : "Добро пожаловать"} ${user.first_name} ${user.last_name}!` })
    router.push("/dashboard")
}

defineShortcuts({
    enter: {
        usingInput: true,
        handler: () => {
            if (input.password.length >= 8) { authenticate() }
        }
    }
})
</script>

<template>
    <div class="form">
        <h1>{{ $t('login_heading') }}</h1>
        <hr>
        <UFormGroup :label="$t('login_word')">
            <UInput :disabled="submitted" type="email" icon="i-heroicons-user-circle" v-model="input.login" />
        </UFormGroup>
        <UFormGroup :label="$t('password_word')" :error="$t(login_error)">
            <UInput :disabled="submitted" type="password" icon="i-heroicons-key" v-model="input.password" />
        </UFormGroup>
        <UButton color="white" :icon="submitted ? '' : `i-heroicons-arrow-right-on-rectangle`" @click="authenticate"
            :loading="submitted" :disabled="input.password.length < 8" :label="submitted ? $t('logging_in') : $t('login')">
        </UButton>
        <div class="switch-auth-mode">
            <p>
                {{ $t("switch_auth_mod_l") }}
            </p>
            <NuxtLink href="/signup">
                <UButton size="xs" variant="soft">
                    {{ $t("signup") }}
                </UButton>
            </NuxtLink>
        </div>
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

    p {
        user-select: none;
        font-size: 0.8rem;
    }
    .switch-auth-mode {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
}

@media (max-width: 600px) {
    .form {
        width: calc(100% - 2rem);
        margin: 1rem;
        padding: 1rem;
    }
}</style>