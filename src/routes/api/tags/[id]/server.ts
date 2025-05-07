import * as db from '$lib/server/database';

export async function DELETE({ params, request, cookies }) {
    // const { tagId, action } = await request.json();
    const userId = cookies.get('userId');
    // console.log("in server.ts", tagId, params, userId);
    if (userId) {
        db.deleteTag(userId, params.id);
    }
    // await database.toggleTodo({ userid, id: params.id, done });
    return new Response(null, { status: 204 });
}