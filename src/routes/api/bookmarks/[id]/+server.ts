import * as db from '$lib/server/database';

export async function PUT({ params, request, cookies }) {
    const { tagId, action } = await request.json();
    const userId = cookies.get('userId');
    if (userId) {
        if (action === 'addTag') {
            db.addTagToBookmark(userId, params.id, tagId);
        } else if (action === 'removeTag') {
            db.removeTagFromBookmark(userId, params.id, tagId);
        }
    }

    return new Response(null, { status: 204 });
}