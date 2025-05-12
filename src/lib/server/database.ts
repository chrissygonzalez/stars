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
        }
    }
}

export function removeTagFromBookmark(userId: string, bookmarkId: string, tagId: string) {
    const bookmarks = bookmarkData.get(userId);
    if (bookmarks) {
        let bookmark = bookmarks.find(item => item.id === bookmarkId);
        if (bookmark) {
            const filtered = bookmark.tags.filter(item => item !== tagId)
            bookmark.tags = filtered;
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
        color: getRandomHexColor(),
    });
}

export function deleteTag(userId: string, tagId: string) {
    let tags = tagData.get(userId);
    const bookmarks = bookmarkData.get(userId);
    if (tags && bookmarks) {
        const tagged = bookmarks.filter(item => item.tags.includes(tagId));
        for (let bookmark of tagged) {
            bookmark.tags = bookmark.tags.filter(id => id !== tagId);
        }
        tags = tags.filter(tag => tag.id !== tagId);
    }
}

// TODO: move this wherever helper functions go
function getRandomHexColor() {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');

    return `#${red}${green}${blue}`;
}