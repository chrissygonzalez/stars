import { parseHTML } from 'linkedom';
// import { bookmarks } from "$lib/data";
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { url } = await request.json();
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    const text = await response.text();

    console.log(getLinkData(url, text));

    return json(getLinkData(url, text));
}

// TODO: handle missing data, look at other attributes, etc.
// TODO: trim off the start and end of domain
function getLinkData(url: string, text: string) {
    const { document } = parseHTML(text);
    const head = document.querySelector('head');
    const title = head?.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? '';
    const description = head?.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    const image = head?.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '';
    const domain = head?.querySelector('meta[property="og:url"]')?.getAttribute('content') ?? '';

    // bookmarks.push({ url, title, description, image, domain });
    return { url, title, description, image, domain };
}

