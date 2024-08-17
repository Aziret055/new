import { Route, Routes } from 'react-router-dom'
import ForgotPassword from './components/authentication/ForgotPassword'
import Header from './components/authentication/Header/Header'
import Refresh from './components/authentication/Refresh'
import ResetPassword from './components/authentication/ResetPassword'
import SignIn from './components/authentication/SignIn'
import SignUp from './components/authentication/SignUp'
import Home from './components/Home/Home'

function App() {
	return (
		<div className=''>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/signUp' element={<SignUp />} />
				<Route path='/signIn' element={<SignIn />} />
				<Route path='/forgot' element={<ForgotPassword />} />
				<Route path={'/auth/reset-password'} element={<ResetPassword />} />
			</Routes>
		</div>
	)
}

export default App
