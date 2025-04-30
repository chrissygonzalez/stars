import type { Bookmark } from "../../types";

const db = new Map();
const tags = new Map();

export function getBookmarks(userId: string) {
    if (!db.get(userId)) {
        db.set(userId, []);
    }

    return db.get(userId);
}

export function createBookmark(userId: string, bookmark: Bookmark) {
    const bookmarks = db.get(userId);

    bookmarks.push({
        ...bookmark,
        id: crypto.randomUUID(),
    });
}

export function deleteBookmark(userId: string, bookmarkId: string) {
    let bookmarks = db.get(userId);
    const updated = bookmarks.filter((bookmark: Bookmark) => bookmark.id !== bookmarkId);
    db.set(userId, updated);
}

export function getTags(userId: string) {
    if (!tags.get(userId)) {
        tags.set(userId, new Set());
    }

    return tags.get(userId);
}

export function createTag(userId: string, tag: string) {
    const currTags = tags.get(userId);
    currTags.add(tag);
}