/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'

export const API_URL = `https://api-instagram.elcho.dev/api/v1`

const $api = axios.create({
	baseURL: API_URL
})

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
	return config
})

$api.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		const _isRetry = localStorage.getItem('_isRetry')
		alert('REFRESH')
		if (error.response.status === 401 && error.config && _isRetry !== 'true') {
			originalRequest._isRetry = true
			localStorage.setItem('_isRetry', 'true')
			try {
				const response = await axios.patch(`${API_URL}/auth/refresh`, {
					body: {
						refreshToken: localStorage.getItem('refreshToken')
					}
				})
				if (response.data.accessToken) {
					localStorage.set('token', response.data.accessToken)
					localStorage.remove('_isRetry')
				}
				return $api.request(originalRequest)
			} catch (e) {
				console.log('НЕ АВТОРИЗОВАН')
			}
		}

		throw error
	}
)

export default $api
