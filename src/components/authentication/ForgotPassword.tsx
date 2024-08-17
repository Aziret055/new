import axios from 'axios'
import { useState } from 'react'

const api = 'https://api-instagram.elcho.dev/api/v1/auth/forgot' // Замените на ваш реальный API

const ForgotPassword = () => {
	const [email, setEmail] = useState<string>('')
	const [message, setMessage] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const handleForgotPassword = async () => {
		if (!email) {
			setError('Please enter your email')
			return
		}

		setLoading(true)
		setError(null)
		setMessage(null)

		try {
			const frontEndUrl = `${window.location.origin}/reset-password`
			const response = await axios.post(api, { email, frontEndUrl })
			setMessage('A password reset link has been sent to your email.')
		} catch (error: any) {
			setError('Failed to send password reset link. Please try again later.')
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>Forgot Password</h1>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			{message && <div style={{ color: 'green' }}>{message}</div>}
			<input
				type='email'
				placeholder='Enter your email'
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<button onClick={handleForgotPassword} disabled={loading}>
				{loading ? 'Sending...' : 'Send Reset Link'}
			</button>
		</div>
	)
}

export default ForgotPassword
