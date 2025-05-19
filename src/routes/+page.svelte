<script lang="ts">
    import type { Tag } from "../types.js";
    import BookmarkItem from "$lib/components/BookmarkItem.svelte";
    let { data } = $props();
    let selected = $state([]);
    let showTagInput = $state(false);
    let bookmarks = $derived(data.bookmarks);

    const addTags = async (tagId: string) => {
        for (let bookmarkId of selected) {
            await fetch(`/api/bookmarks/${bookmarkId}`, {
                method: "PUT",
                body: JSON.stringify({ tagId, action: "addTag" }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // optimistic update to trigger reactivity
            let bookmark = bookmarks.find((item) => item.id === bookmarkId);
            if (bookmark) {
                bookmark.tags.push(tagId);
                bookmarks = bookmarks;
            }
        }
    };

    const removeTag = async (tagId: string, bookmarkId: string) => {
        await fetch(`/api/bookmarks/${bookmarkId}`, {
            method: "PUT",
            body: JSON.stringify({ tagId, action: "removeTag" }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // optimistic update to trigger reactivity
        let bookmark = bookmarks.find((item) => item.id === bookmarkId);
        if (bookmark) {
            bookmark.tags = bookmark.tags.filter((item) => item !== tagId);
            bookmarks = bookmarks;
        }
    };

    const getTagData = (tagId: string) => {
        return data.tags.find((item: Tag) => item.id === tagId);
    };
</script>

<!-- TODO: break tags and bookmarks into components, figure out who fetches the data and from where -->
<div class="content">
    <aside>
        <div>
            <h3>Tags</h3>
            <div class="tags__container">
                <div class="tag-badge__container">
                    {#each data.tags as { id, name, color }}
                        <button
                            onclick={() => addTags(id)}
                            class="tag-button"
                            style="--color: {color}"
                        >
                            {name}
                        </button>
                    {/each}
                </div>
                <div class="tag-badge__add">
                    <button onclick={() => (showTagInput = !showTagInput)}>
                        + New tag
                    </button>

                    {#if showTagInput}
                        <form method="POST" action="?/createTag">
                            <input
                                aria-label="new tag name text"
                                type="text"
                                name="tagName"
                                id="tagName"
                                placeholder="Tag name"
                            />
                        </form>
                    {/if}
                </div>
            </div>
        </div>

        <div>
            <h3>Folders</h3>
        </div>
    </aside>

    <main>
        <header>
            <form method="POST" action="?/create">
                <label for="url">Enter a URL</label>
                <input id="url" name="url" type="text" required />
                <button>Save as bookmark</button>
            </form>
        </header>

        <div class="list-area">
            <ul role="list">
                {#each bookmarks as bookmark}
                    <BookmarkItem
                        {bookmark}
                        bind:selected
                        {getTagData}
                        {removeTag}
                    />
                {/each}
            </ul>
        </div>
    </main>
</div>

<style>
    .tag-button {
        background-color: var(--color, green);
    }
</style>
