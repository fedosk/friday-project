const initialState = {}

type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    return state
}

// thunks

// types
type ActionsType = any