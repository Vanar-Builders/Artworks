import { configureStore } from '@reduxjs/toolkit'
import authreducer from '../features/authentication'

export const store = configureStore({
    reducer: {
        auth: authreducer
    },
})