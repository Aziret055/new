/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import userApi from '../api/user/user-api'

interface IUserContext {
	currentUser: USER.CURRENT_USER | null
	refresh(): Promise<void>
}
const UserContext = React.createContext<IUserContext | undefined>(undefined)

interface IUserProvider {
	children: React.ReactNode
}

export const UserProvider: React.FC<IUserProvider> = ({ children }) => {
	const [currentUser, setCurrentUser] =
		React.useState<USER.CURRENT_USER | null>(null)

	async function getUser() {
		try {
			const response = await userApi.getCurrentUser()
			if (response.data.profile) {
				setCurrentUser(response.data.profile)
			}
		} catch (error) {
			console.log(error, ' getUser')
		}
	}

	React.useEffect(() => {
		getUser()
	}, [])
	const values: IUserContext = {
		currentUser,
		refresh: getUser
	}

	return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

export const useUser = (): IUserContext => {
	const context = React.useContext(UserContext)

	if (!context) {
		throw new Error('useMyContext must be used within a MovieProvider')
	}
	return context
}
