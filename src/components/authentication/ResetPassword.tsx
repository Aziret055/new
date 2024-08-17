import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import $api from '../../utils/http/base'

const ResetPassword = () => {
	const [newPassword, setNewPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const handleResetPassword = async () => {
		if (newPassword !== confirmPassword) {
			setError('Passwords do not match')
			return
		}

		if (!newPassword) {
			setError('Password cannot be empty')
			return
		}

		setLoading(true)
		setError(null)
		setMessage(null)

		try {
			const token = searchParams.get('token')
			await $api.patch('/auth/reset-password', { token, newPassword })
			setMessage('Your password has been successfully reset.')
			setTimeout(() => {
				navigate('/signIn')
			}, 2000)
		} catch (error: any) {
			setError('Failed to reset password. Please try again later.')
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>Reset Password</h1>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			{message && <div style={{ color: 'green' }}>{message}</div>}
			<input
				type='password'
				placeholder='Enter new password'
				value={newPassword}
				onChange={e => setNewPassword(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Confirm new password'
				value={confirmPassword}
				onChange={e => setConfirmPassword(e.target.value)}
			/>
			<button onClick={handleResetPassword} disabled={loading}>
				{loading ? 'Resetting...' : 'Reset Password'}
			</button>
		</div>
	)
}

export default ResetPassword
