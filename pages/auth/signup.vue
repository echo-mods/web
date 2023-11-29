<script setup lang="ts">
definePageMeta({
    name: "Sign up",
    ru_name: "Регистрация",
});

const { locale } = useI18n();
const input = reactive({
    username: "",
    email: "",
    password: "",
});

const submitted = ref(false);
const toast = useToast();

const router = useRouter();

const signup_error = ref("");

const { auth } = useSupabaseClient();

const register = async () => {
    submitted.value = true;
    const { data, error } = await auth.signUp({
        email: input.email,
        password: input.password,
        options: {
            data: {
                user_name: input.username,
            },
        },
    });
    if (error) {
        signup_error.value = "login_error";
        submitted.value = false;
        return;
    }
	router.push("/auth/sent")
};

const password_valid = computed(() => {
    const pass = input.password;
    return pass.length >= 8;
});

defineShortcuts({
    enter: {
        usingInput: true,
        handler: () => {
            if (password_valid.value) {
                register();
            }
        },
    },
});
</script>

<template>
    <div class="__signup">
        <div class="form">
            <h1>{{ $t("signup_heading") }}</h1>
            <hr />
            <div class="fields">
                <UFormGroup :label="$t('username_word')">
                    <UInput
                        :disabled="submitted"
                        type="text"
                        v-model="input.username"
                    />
                </UFormGroup>
                <UFormGroup :label="$t('login_word')">
                    <UInput
                        :disabled="submitted"
                        type="email"
                        icon="i-heroicons-user-circle"
                        v-model="input.email"
                    />
                </UFormGroup>
                <UFormGroup
                    :label="$t('password_word')"
                    :error="$t(signup_error)"
                >
                    <UInput
                        :disabled="submitted"
                        type="password"
                        icon="i-heroicons-key"
                        v-model="input.password"
                    />
                </UFormGroup>
            </div>
            <UButton
                color="white"
                :icon="
                    submitted
                        ? undefined
                        : `i-heroicons-arrow-right-on-rectangle`
                "
                @click="register"
                :loading="submitted"
                :disabled="!password_valid"
                :label="submitted ? $t('signingup') : $t('signup')"
            ></UButton>

            <hr />
            <OAuthProviders />
            <hr />
            <div class="switch-auth-mode">
                <p>
                    {{ $t("switch_auth_mod_s") }}
                </p>
                <NuxtLink href="/auth/login">
                    <UButton size="xs" variant="soft">
                        {{ $t("login") }}
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
    padding: 3rem 3rem;
    border-radius: 8px;
    backdrop-filter: blur(1px);
    border: 1px rgba(255, 255, 255, 0.3) solid;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    .fields {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

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
