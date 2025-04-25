<script lang="ts">
    let { data } = $props();

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const form = document.querySelector("form");
        if (form) {
            const url = new FormData(form).get("url");
            console.log("url is:", url);

            const response = await fetch("/bookmark", {
                method: "POST",
                body: JSON.stringify({ url }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const bookmark = await response.json();
            console.log(bookmark);
            const bookmarks = [...data.bookmarks, bookmark];
            data = { ...data, bookmarks };
            // TODO: clear input
        }
    };
</script>

<main>
    <form onsubmit={(e) => handleSubmit(e)}>
        <label for="url">Add a bookmark</label>
        <input id="url" name="url" type="text" required />
        <button>Save</button>
    </form>

    <ul role="list">
        {#each data.bookmarks as { url, title, description, image, domain }}
            <li>
                <div class="list-item">
                    <img class="list-item__image" src={image} alt={title} />
                    <div class="list-item__content">
                        <h4>
                            <a href={url}>{title}</a> | <span>{domain}</span>
                        </h4>
                        <p>{description}</p>
                    </div>
                </div>
            </li>
        {/each}
    </ul>
</main>
