import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const api = 'https://api-instagram.elcho.dev/api/v1/auth/sign-in'

const SignIn = () => {
	const nav = useNavigate()
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	async function signInFunction() {
		if (!email || !password) {
			setError('Email and password are required')
			return
		}
		setLoading(true)
		setError(null)
		try {
			const newData = {
				email,
				password
			}
			const { data } = await axios.post(api, newData)
			localStorage.setItem('accessToken', data.accessToken)
			localStorage.setItem('refreshToken', data.refreshToken)
			nav('/')
		} catch (error: any) {
			setError('Sign in failed. Please check your credentials and try again.')
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<input
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setEmail(e.target.value)
				}
				type='text'
				placeholder='Email'
			/>
			<input
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
				type='password'
				placeholder='Password'
			/>
			<button onClick={signInFunction} disabled={loading}>
				{loading ? 'Signing in...' : 'Sign In'}
			</button>
		</div>
	)
}

export default SignIn
