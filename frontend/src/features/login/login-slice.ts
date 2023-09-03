import { createSlice} from '@reduxjs/toolkit'

interface LoginState {
    value: boolean
}

const initialState: LoginState = {
    value: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login(state) {
            state.value = true
        },
        logout(state){
            state.value = false
        }
    }
})

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer