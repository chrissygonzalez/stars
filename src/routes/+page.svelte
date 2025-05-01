<script lang="ts">
    let { data } = $props();
    let selected = $state([]);
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
                <div class="tag-badge">{name}</div>
            {/each}
        </div>
    </div>
    <!-- {/if} -->

    <ul role="list">
        {#each data.bookmarks as { id, url, title, description, image, domain }}
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
