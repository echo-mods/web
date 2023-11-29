<script setup lang="ts">
definePageMeta({
    name: "Login",
    ru_name: "Войти",
});

const { locale } = useI18n();
const input = reactive({
    login: "",
    password: "",
});

const submitted = ref(false);
const toast = useToast();

const router = useRouter();
const { query: { redirect_to: redirect } } = useRoute();

const login_error = ref("");

const { auth } = useSupabaseClient();
const user = useSupabaseUser();

const authenticate = async () => {
    submitted.value = true;
    const { error } = await auth.signInWithPassword({
        email: input.login,
        password: input.password,
    });
    if (error) {
        login_error.value = "login_error";
        submitted.value = false;
        return;
    }
    if (user.value)
        toast.add({
            title: `${locale.value === "en" ? "Welcome" : "Добро пожаловать"} ${
                user.value.user_metadata.user_name
            }!`,
        });
    router.push((redirect as string | undefined) || "/");
};

defineShortcuts({
    enter: {
        usingInput: true,
        handler: () => {
            if (input.password.length >= 8) {
                authenticate();
            }
        },
    },
});
</script>

<template>
    <div class="__login">
        <div class="form">
            <h1>{{ $t("login_heading") }}</h1>
            <hr />
            <UFormGroup :label="$t('login_word')">
                <UInput
                    :disabled="submitted"
                    type="email"
                    icon="i-heroicons-user-circle"
                    v-model="input.login"
                />
            </UFormGroup>
            <UFormGroup :label="$t('password_word')" :error="$t(login_error)">
                <UInput
                    :disabled="submitted"
                    type="password"
                    icon="i-heroicons-key"
                    v-model="input.password"
                />
            </UFormGroup>
            <UButton
                color="white"
                :icon="submitted ? '' : `i-heroicons-arrow-right-on-rectangle`"
                @click="authenticate"
                :loading="submitted"
                :disabled="input.password.length < 8"
                :label="submitted ? $t('logging_in') : $t('login')"
            >
            </UButton>
            <hr />
            <OAuthProviders :redirect="(redirect as string)" />
            <hr />
            <div class="switch-auth-mode">
                <p>
                    {{ $t("switch_auth_mod_l") }}
                </p>
                <NuxtLink href="/auth/signup">
                    <UButton size="xs" variant="soft">
                        {{ $t("signup") }}
                    </UButton>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form {
    width: 50%;
    margin: 1rem 25%;
    padding: 3rem 5rem;
    border-radius: 1rem;
    border: 1px rgb(var(--color-primary-DEFAULT) / 0.7) solid;
    backdrop-filter: blur(1px);
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
}
</style>
