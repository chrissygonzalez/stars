import type { Bookmark } from "../../types";

const bookmarkData = new Map();
const tagData = new Map();

export function getBookmarks(userId: string) {
    if (!bookmarkData.get(userId)) {
        bookmarkData.set(userId, []);
    }

    return bookmarkData.get(userId);
}

export function createBookmark(userId: string, bookmark: Bookmark) {
    const bookmarks = bookmarkData.get(userId);

    bookmarks.push({
        ...bookmark,
        id: crypto.randomUUID(),
    });
}

export function deleteBookmark(userId: string, bookmarkId: string) {
    let bookmarks = bookmarkData.get(userId);
    const updated = bookmarks.filter((bookmark: Bookmark) => bookmark.id !== bookmarkId);
    bookmarkData.set(userId, updated);
}

export function getTags(userId: string) {
    if (!tagData.get(userId)) {
        tagData.set(userId, []);
    }

    return tagData.get(userId);
}

export function createTag(userId: string, tag: string) {
    const currTags = tagData.get(userId);
    currTags.push({
        name: tag,
        value: tag.toLowerCase(),
        id: crypto.randomUUID(),
    });
    console.log(currTags);
}