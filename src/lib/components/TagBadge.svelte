<script lang="ts">
    const { tag, removeTag, bookmarkId } = $props();
    const { name, color, id: tagId } = $derived(tag);
</script>

<div class="tag-badge" style="--color: {color}">
    <span>{name}</span>
    <button
        aria-label="Remove tag"
        onclick={() => removeTag(tagId, bookmarkId)}
        class="tag-badge__button"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#000"
            viewBox="0 -960 960 960"
            ><path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
            /></svg
        >
    </button>
</div>

<style>
    .tag-badge {
        background-color: var(--color, green);
    }
</style>
