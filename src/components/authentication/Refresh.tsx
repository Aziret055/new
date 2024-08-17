import axios from 'axios'

export const API_URL = 'https://api-instagram.elcho.dev/api/v1/'

const $api = axios.create({
	baseURL: API_URL
})

$api.interceptors.request.use(config => {
	config.headers.Authorization = 'Bearer' + localStorage.getItem('token')
	return config
})

$api.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		const _isRetry = localStorage.getItem('_isRetry')
		if (error.response.status === 401 && error.config && _isRetry !== 'true') {
			originalRequest._isRetry = true
			localStorage.setItem('_isRetry', 'true')
			try {
				const response = await axios.get(API_URL, {
					withCredentials: true
				})
				if (response.data.accessToken) {
					localStorage.removeItem('_isRetry')
				}
				localStorage.setItem('token', response.data.accessToken)
				return $api.request(originalRequest)
			} catch (e) {
				console.log('НЕ АВТОРИЗОВАН')
			}
		}

		throw error
	}
)

export default $api
