import { useNavigate } from 'react-router-dom'

const LogOut = () => {
	const nav = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		nav('/signUp')
	}

	return (
		<div>
			<button onClick={handleLogout}>Log Out</button>
		</div>
	)
}

export default LogOut
