<script setup lang="ts">
import { Platforms } from "@/composables/useDatabase";
import type { Mod, ModBuild } from "~/types/database";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

const supabase = useSupabaseClient();

// Page setup finished
const route = useRoute();
const {
    params: { id },
} = route;
const mod_id = parseInt(id as string);

const { data } = await supabase
    .from("mods")
    .select("*, mod-builds(*)")
    .eq("mod_id", id)
    .single();

const mod = ref(data as unknown as Mod);

if (!mod.value) {
    throw createError({
        statusCode: 404,
        message: "Мод не существует",
        fatal: true,
    });
}

const setHead = (name?: string) => {
    useHead({
        title: name,
        titleTemplate: "%s | EchoMods",
    });
};

const handle_postgres_changes = (
    payload: RealtimePostgresChangesPayload<{ [key: string]: any }>
) => {
    if (payload.table === "mods") {
        if (payload.eventType === "UPDATE") {
            const updatedArticle = payload.new as Mod;
            if (updatedArticle.mod_id === mod_id) {
                const builds_preserve = mod.value["mod-builds"];
                mod.value = updatedArticle;
                mod.value["mod-builds"] = builds_preserve;
            }
        } else if (payload.eventType === "DELETE") {
            const deletedArticle = payload.old as Mod;
            if (deletedArticle.mod_id === mod_id) {
                window.location.reload();
            }
        }
    } else if (payload.table === "mod-builds") {
        const build =
            payload.eventType !== "DELETE"
                ? (payload.new as ModBuild)
                : (payload.old as ModBuild);
        switch (payload.eventType) {
            case "INSERT":
                if (build.mod_id === mod_id) {
                    mod.value["mod-builds"]?.push(build);
                }
                break;
            case "UPDATE":
                mod.value["mod-builds"].forEach(
                    (build_checking: ModBuild, index: number) => {
                        if (build_checking.mod_id === mod_id) {
                            mod.value["mod-builds"][index] = build;
                        }
                    }
                );
                break;
            case "DELETE":
                mod.value["mod-builds"].forEach(
                    (build_checking: ModBuild, index: number) => {
                        if (build_checking.mod_id === mod_id) {
                            mod.value["mod-builds"].splice(index, 1);
                        }
                    }
                );
                break;
        }
    }
};

const listener = supabase
    .channel("custom-all-channel")
    .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mods" },
        handle_postgres_changes
    )
    .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mod-builds" },
        handle_postgres_changes
    )
    .subscribe();

watchEffect(() => {
    setHead(mod.value.name);
});

const linkHost = (link: string) => {
    try {
        const url = new URL(link);
        const host = url.host;
        return host;
    } catch {
        return link;
    }
};

const getIconForHost = (host: string) => {
    let retval = "material-symbols:link";
    if (host.includes("vk.com")) {
        retval = "mdi:vk";
    } else if (host.includes("youtube.com")) {
        retval = "mdi:youtube";
    } else if (host.includes("boosty.to")) {
        retval = "simple-icons:boosty";
    } else if (host.includes("t.me")) {
        retval = "simple-icons:telegram";
    } else if (host.includes("discord.gg")) {
        retval = "simple-icons:discord";
    }
    return retval;
};
</script>

<template>
    <div class="__mod-details">
        <div class="main-info">
            <ContentSlideshow :content="mod.content_urls || []" />
            <div class="data-container">
                <img class="background" :src="mod.thumbnail_url" />
                <h1 v-once>{{ mod.name }}</h1>
                <div class="socials">
                    <UTooltip
                        v-for="link in mod.social_urls"
                        :text="linkHost(link)"
                    >
                        <UButton :to="link" target="_blank" variant="soft">
                            <Icon :name="getIconForHost(linkHost(link))" />
                        </UButton>
                    </UTooltip>
                </div>
                <hr />
                <p v-once>{{ mod.description }}</p>
                <hr />
                <!-- <p> Ratings will be added later
					<Icon
						name="streamline:interface-favorite-star-reward-rating-rate-social-star-media-favorite-like-stars"
					/>
					<span>{{ 5 }} / 10</span>
            	</p> -->
                <p>
                    <Icon name="iconoir:radiation" />
                    <span>{{ Platforms[mod.platform] }}</span>
                </p>
                <p v-if="!mod.standalone">
                    <Icon name="mdi:exclamation" />
                    <span>{{ $t("req_true") }}</span>
                </p>
                <p v-else>
                    <Icon name="carbon:thumbs-up" />
                    <span>{{ $t("req_false") }}</span>
                </p>
                <hr />
                <UButton
                    variant="soft"
                    :to="`echomods://?action=openmod&id=${mod.mod_id}`"
                >
                    <Icon name="ph:desktop-thin" />
                    {{ $t("open_in_desktop") }}
                </UButton>
            </div>
        </div>
        <div class="builds">
            <div class="build" v-for="build in mod['mod-builds']">
                <MarkdownForamatter>
                    <div>
                        <h1>
                            {{ build.version.startsWith("v") ? "" : "v"
                            }}{{ build.version }}
                        </h1>
                        <hr />
                    </div>
                    <Mdc :value="build.changes" tag="div" />
                </MarkdownForamatter>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.__mod-details {
    margin: 0.75rem;
    width: calc(100% - 1.5rem);
    .main-info {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        .data-container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            border-radius: 8px;
            border: 1px rgba(255, 255, 255, 0.3) solid;
            width: calc(30% - 1rem);
            padding: 1rem;
            position: relative;
            overflow-x: hidden;
            overflow-y: auto;
            max-height: 80vh;

            h1 {
                width: 100%;
                text-align: center;
                font-size: 2rem;
                font-weight: 600;
            }

            p {
                font-weight: 200;
            }

            hr {
                margin: 0.5rem 0;
                opacity: 0.5;
            }

            span {
                margin-left: 0.5rem;
            }

            .logo {
                width: 5rem;
                aspect-ratio: 1;
            }
            .socials {
                display: flex;
                gap: 0.5rem;
            }
            .background {
                position: fixed;
                inset: 0;
                z-index: -1;
                opacity: 0.3;
                filter: blur(0.5rem);
                object-fit: cover;
                object-position: center;
                height: 100%;
				width: 100%;
            }
        }
    }
    .builds {
        padding: 1rem 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .build {
            padding: 1rem;
            border-radius: 0.5rem;
            border: 1px solid rgb(var(--color-primary-500) / 0.9);
        }
    }
}

@media (max-width: 600px) {
    .__mod-details .data-container {
        width: 100%;
    }
}
</style>
