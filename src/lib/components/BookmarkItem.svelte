<script lang="ts">
    import { getFormattedDate } from "$lib/helpers/helpers.js";
    import TagBadge from "./TagBadge.svelte";
    let { bookmark, selected = $bindable(), getTagData, removeTag } = $props();
    const {
        id: bookmarkId,
        url,
        title,
        description,
        image,
        domain,
        tags,
        date,
    } = bookmark;
</script>

<li>
    <label for={`checkbox-${bookmarkId}`}>
        <div class="list-item">
            <input
                type="checkbox"
                id={`checkbox-${bookmarkId}`}
                value={bookmarkId}
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
                <p>Added {getFormattedDate(date)}</p>
                <div class="tag-badge__container">
                    {#each tags as tagId}
                        <TagBadge
                            tag={getTagData(tagId)}
                            {removeTag}
                            {bookmarkId}
                        />
                    {/each}
                </div>
            </div>
            <form method="POST" action="?/delete">
                <input
                    type="hidden"
                    id="bookmarkId"
                    name="bookmarkId"
                    value={bookmarkId}
                />
                <button>Delete</button>
            </form>
        </div>
    </label>
</li>
