<script lang="ts">
    let { data } = $props();

    // const handleSubmit = async (e: SubmitEvent) => {
    //     e.preventDefault();
    //     const form = document.querySelector("form");
    //     if (form) {
    //         const url = new FormData(form).get("url");
    //         const input: HTMLInputElement | null =
    //             document.querySelector("#url");
    //         const response = await fetch("/bookmark", {
    //             method: "POST",
    //             body: JSON.stringify({ url }),
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         const bookmark = await response.json();
    //         const bookmarks = [...data.bookmarks, bookmark];
    //         data = { ...data, bookmarks };
    //         if (input) input.value = "";
    //     }
    // };

    // const handleDelete = async (e) => {
    //     const id =
    //     const response = await fetch("/bookmark", {
    //             method: "DELETE",
    //             body: JSON.stringify({ url }),
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    // }
</script>

<main>
    <form method="POST" action="?/create">
        <label for="url">Add a bookmark</label>
        <input id="url" name="url" type="text" required />
        <button>Save</button>
    </form>

    <ul role="list">
        {#each data.bookmarks as { id, url, title, description, image, domain }}
            <li>
                <div class="list-item">
                    <img class="list-item__image" src={image} alt={title} />
                    <div class="list-item__content">
                        <h4>
                            <a href={url}>{title}</a> | <span>{domain}</span>
                        </h4>
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
            </li>
        {/each}
    </ul>
</main>
