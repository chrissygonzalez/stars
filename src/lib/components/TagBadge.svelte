<script lang="ts">
    import type { Tag } from "../../types";
    let { tags, tagId, removeTag, id } = $props();
    let tag = $derived(tags.find((item: Tag) => item.id === tagId));
</script>

<div class="tag-badge" style="--color: {tag.color}">
    {tag.name}
    <button onclick={() => removeTag(tagId, id)} class="tag-badge__button">
        x
    </button>
</div>

<style>
    .tag-badge {
        background-color: var(--color, green);
    }
</style>
