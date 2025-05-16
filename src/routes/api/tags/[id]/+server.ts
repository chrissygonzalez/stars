import * as db from '$lib/server/database';

export async function DELETE({ params, request, cookies }) {
    const userId = cookies.get('userId');
    if (userId) {
        db.deleteTag(userId, params.id);
    }
    return new Response(null, { status: 204 });
}