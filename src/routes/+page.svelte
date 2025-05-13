<script lang="ts">
    import type { Bookmark, Tag } from "../types.js";
    import TagBadge from "$lib/components/TagBadge.svelte";
    let { data } = $props();
    let selected = $state([]);
    let bookmarks = $derived(data.bookmarks);

    // console.log("all bookmarks:", data.bookmarks);
    // console.log("all tags:", data.tags);

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
</script>

<header>
    <form method="POST" action="?/create">
        <label for="url">Add a bookmark</label>
        <input id="url" name="url" type="text" required />
        <button>Save</button>
    </form>
</header>

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
                    <button>+ New tag</button>
                </div>

                <form method="POST" action="?/createTag">
                    <!-- <label for="tagName">Add a tag:</label> -->
                    <input
                        aria-label="new tag name text"
                        type="text"
                        name="tagName"
                        id="tagName"
                        placeholder="Tag name"
                    />
                    <!-- <button>Add</button> -->
                </form>
            </div>
        </div>

        <div>
            <h3>Folders</h3>
        </div>
    </aside>

    <main>
        <h1>Bookmarks</h1>

        <ul role="list">
            {#each bookmarks as { id, url, title, description, image, domain, tags }}
                <li>
                    <label for={`checkbox-${id}`}>
                        <div class="list-item">
                            <input
                                type="checkbox"
                                id={`checkbox-${id}`}
                                value={id}
                                bind:group={selected}
                            />
                            <img
                                class="list-item__image"
                                src={image}
                                alt={title}
                            />
                            <div class="list-item__content">
                                <a href={url} target="_blank">
                                    <h4>
                                        {title} | <span>{domain}</span>
                                    </h4>
                                </a>
                                <p>{description}</p>
                                <div class="tag-badge__container">
                                    {#each tags as tagId}
                                        <TagBadge
                                            tags={data.tags}
                                            {tagId}
                                            {removeTag}
                                            {id}
                                        />
                                    {/each}
                                </div>
                            </div>
                            <form method="POST" action="?/delete">
                                <input
                                    type="hidden"
                                    id="bookmarkId"
                                    name="bookmarkId"
                                    value={id}
                                />
                                <button>Delete</button>
                            </form>
                        </div>
                    </label>
                </li>
            {/each}
        </ul>
    </main>
</div>

<style>
    .tag-button {
        background-color: var(--color, green);
    }
</style>
