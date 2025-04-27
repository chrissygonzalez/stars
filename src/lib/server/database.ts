import type { Bookmark } from "../../types";

const db = new Map();

export function getBookmarks(userId: string) {
    console.log('getting bookmarks');
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