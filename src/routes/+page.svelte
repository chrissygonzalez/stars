<script lang="ts">
    import type { Bookmark, Tag } from "../types.js";
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

<main>
    <form method="POST" action="?/create">
        <label for="url">Add a bookmark</label>
        <input id="url" name="url" type="text" required />
        <button>Save</button>
    </form>

    <!-- {#if selected.length > 0} -->
    <div class="tags__container">
        <form method="POST" action="?/createTag">
            <label for="tagName">Add Tags:</label>
            <input type="text" name="tagName" id="tagName" />
            <button>Add</button>
        </form>
        <div class="tag-badge__container">
            {#each data.tags as { id, name }}
                <button
                    onclick={() => addTags(id)}
                    disabled={selected.length === 0}
                    class="tag-button"
                >
                    {name}
                </button>
            {/each}
        </div>
    </div>
    <!-- {/if} -->

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
                        <img class="list-item__image" src={image} alt={title} />
                        <div class="list-item__content">
                            <a href={url} target="_blank">
                                <h4>
                                    {title} | <span>{domain}</span>
                                </h4>
                            </a>
                            <p>{description}</p>
                            <div class="tag-badge__container">
                                {#each tags as tagId}
                                    <div class="tag-badge">
                                        {data.tags.find(
                                            (item: Tag) => item.id === tagId,
                                        )?.name}
                                        <button
                                            onclick={() => removeTag(tagId, id)}
                                            class="tag-badge__button"
                                        >
                                            x
                                        </button>
                                    </div>
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
