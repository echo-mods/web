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
            const updatedID = updatedArticle.mod_id;
            if (updatedID === mod_id) {
            }
        }
    } else if (payload.table === "mod-builds") {
        const build = payload.new
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
</script>

<template>
    <div class="__mod-details">
        <div class="main-info">
            <ContentSlideshow :content="mod.content_urls || []" />
            <div class="data-container">
                <img class="background" :src="mod.thumbnail_url" />
                <h1 v-once>{{ mod.name }}</h1>
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
            </div>
        </div>
        <div class="builds">
            <div class="build" v-for="build in mod['mod-builds']">
				<MarkdownForamatter>
					<div>
						<h1>{{ build.version.startsWith("v") ? "" : "v" }}{{ build.version }}</h1>
						<hr>
					</div>
					<Mdc :value="build.changes" tag="div"/>
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
    }
}

.data-container {
    border-radius: 8px;
    border: 1px rgba(255, 255, 255, 0.3) solid;
    width: calc(30% - 1rem);
    padding: 1rem;
    position: relative;
    overflow: hidden;

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

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.3;
        filter: blur(0.5rem);
        object-fit: cover;
        object-position: center;
    }

    button {
        font-weight: 100;
        transition: all 0.3s;
        border-radius: 8px;
        padding: 1px;
        margin-top: 1rem;

        div {
            padding: 0.5rem 1.5rem;
            background-color: rgb(10, 10, 10);
            border-radius: 8px;
            transition: all 0.3s;
        }

        background: linear-gradient(
            55deg,
            rgb(255, 81, 0) 0%,
            rgb(255, 136, 0) 100%
        );
    }

    button:hover {
        background: linear-gradient(
            -30deg,
            rgb(255, 81, 0) 0%,
            rgb(255, 136, 0) 100%
        );
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

@media (max-width: 600px) {
    .data-container {
        width: 100%;
    }
}
</style>
