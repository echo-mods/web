import { serverSupabaseServiceRole } from '#supabase/server'
import { useUsername } from '~/composables/useUsername'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)
	const { username } = getQuery(event)

	const { data: { users } } = await supabase.auth.admin.listUsers()
	let user_filtered
	users.forEach((user) => {
		if (useUsername(user) === username) user_filtered = user
	})
	if (!user_filtered) throw createError({
		statusCode: 400,
		statusMessage: 'User does not exist',
	})
	return user_filtered
})