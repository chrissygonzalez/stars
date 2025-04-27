import { parseHTML } from 'linkedom';
import * as db from '$lib/server/database';
import type { Bookmark } from '../types.js';

export function load({ cookies }) {
    let id = cookies.get('userId');
    if (!id) {
        id = crypto.randomUUID();
        cookies.set('userId', id, { path: '/' });
    }

    return {
        bookmarks: db.getBookmarks(id)
    };
}

export const actions = {
    create: async ({ cookies, request }) => {
        const data = await request.formData();
        const url = data.get('url') as string;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        // Fetch the page as text
        const text = await response.text();
        // Get the page head and pull out the necessary info
        const linkData = getLinkData(url, text);

        let id = cookies.get('userId');
        if (!id) {
            id = crypto.randomUUID();
            cookies.set('userId', id, { path: '/' });
        }
        db.createBookmark(id, linkData)
    },
    delete: async ({ cookies, request }) => {
        let id = cookies.get('userId');
        if (id) {
            const data = await request.formData();
            const bookmarkId = data.get('bookmarkId') as string;
            db.deleteBookmark(id, bookmarkId);
        }
    }
}

// TODO: handle missing data, look at other attributes, etc.
// TODO: trim off the start and end of domain
function getLinkData(url: string, text: string): Bookmark {
    const { document } = parseHTML(text);
    const head = document.querySelector('head');
    const title = head?.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? '';
    const description = head?.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    const image = head?.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '';
    const fullDomain = head?.querySelector('meta[property="og:url"]')?.getAttribute('content');
    const domain = getPrettyDomain(fullDomain);
    console.log(fullDomain, domain);

    // bookmarks.push({ url, title, description, image, domain });
    return { url, title, description, image, domain };
}

function getPrettyDomain(domain: string | null | undefined) {
    if (domain) {
        let trimmed = new URL(domain || '').host;
        if (trimmed.startsWith('www.')) return trimmed.slice(4);
        return trimmed;
    }
    return '';
}