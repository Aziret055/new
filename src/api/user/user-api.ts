import $api from '../../utils/http/base'

class UserApi {
	async getCurrentUser() {
		const response = $api.get('/auth/user')
		return response
	}
}

export default new UserApi()
