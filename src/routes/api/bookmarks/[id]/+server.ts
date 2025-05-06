import * as db from '$lib/server/database';
import type { Bookmark } from '../../../../types';

export async function PUT({ params, request, cookies }) {
    const { tagId } = await request.json();
    const userId = cookies.get('userId');
    // console.log("in server.ts", tagId, params, userId);
    if (userId) {
        db.addTagToBookmark(userId, params.id, tagId);
    }
    // await database.toggleTodo({ userid, id: params.id, done });
    return new Response(null, { status: 204 });
}