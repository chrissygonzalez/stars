import { bookmarks } from "$lib/data";

export function load() {
    return { bookmarks };
}

// export const actions = {
//     default: async ({ request }) => {
//         const data = await request.formData();
//         const url = data.get('url') as string;
//         getDocument(url);
//     }
// }

// const getDocument = async (url: string) => {
//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error(`Failed to fetch: ${response.status}`);
//     }

//     return await response.text();
// };