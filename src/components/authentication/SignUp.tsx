import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const api = 'https://api-instagram.elcho.dev/api/v1/auth/sign-up'

const SignUp = () => {
	const [username, setUserName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [photo, setPhoto] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const nav = useNavigate()

	async function postReq() {
		if (!username || !email || !password || !photo) {
			setError('All fields are required')
			return
		}
		setLoading(true)
		setError(null)

		try {
			const newData = {
				email,
				password,
				username,
				photo
			}
			const { data } = await axios.post(api, newData)
			localStorage.setItem('accessToken', data.accessToken)
			localStorage.setItem('accessTokenExpiration', data.accessTokenExpiration)
			localStorage.setItem('refreshToken', data.refreshToken)
			nav('/')
		} catch (error: any) {
			setError('Registration failed. Please try again.')
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<input
				value={username}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setUserName(e.target.value)
				}
				type='text'
				placeholder='Username'
			/>
			<input
				value={email}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setEmail(e.target.value)
				}
				type='email'
				placeholder='Email'
			/>
			<input
				value={password}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
				type='password'
				placeholder='Password'
			/>
			<input
				value={photo}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setPhoto(e.target.value)
				}
				type='text'
				placeholder='Photo URL'
			/>
			<button onClick={postReq} disabled={loading}>
				{loading ? 'Submitting...' : 'Submit'}
			</button>
		</div>
	)
}

export default SignUp
