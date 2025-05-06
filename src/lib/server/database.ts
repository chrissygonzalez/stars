import { SvelteMap } from "svelte/reactivity";
import type { Bookmark, Tag } from "../../types";

let bookmarkData = new SvelteMap<string, Bookmark[]>();
const tagData = new SvelteMap<string, Tag[]>();

export function getBookmarks(userId: string) {
    if (!bookmarkData.get(userId)) {
        bookmarkData.set(userId, []);
    }

    return bookmarkData.get(userId) ?? [];
}

export function createBookmark(userId: string, bookmark: Bookmark) {
    const bookmarks = bookmarkData.get(userId);

    bookmarks?.push({
        ...bookmark,
        id: crypto.randomUUID(),
        tags: []
    });
}

export function deleteBookmark(userId: string, bookmarkId: string) {
    const bookmarks = bookmarkData.get(userId);
    if (bookmarks) {
        const updated = bookmarks.filter((bookmark: Bookmark) => bookmark.id !== bookmarkId);
        bookmarkData.set(userId, updated);
    }
}

export function addTagToBookmark(userId: string, bookmarkId: string, tagId: string) {
    const bookmarks = bookmarkData.get(userId);
    if (bookmarks) {
        let bookmark = bookmarks.find(item => item.id === bookmarkId);
        if (bookmark) {
            bookmark.tags?.push(tagId);
            // getBookmarks(userId);
            // const copy = [...bookmarks];
            // bookmarkData.set(userId, copy);
            // bookmarkData = bookmarkData;
        }
    }
}

export function getTags(userId: string) {
    if (!tagData.get(userId)) {
        tagData.set(userId, []);
    }

    return tagData.get(userId) ?? [];
}

export function createTag(userId: string, tag: string) {
    const currTags = tagData.get(userId);
    currTags?.push({
        name: tag,
        value: tag.toLowerCase(),
        id: crypto.randomUUID(),
    });
}