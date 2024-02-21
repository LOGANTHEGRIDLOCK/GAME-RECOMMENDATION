import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status"
import { fetchAsyncGames, fetchAsyncGamesDetails } from "../utils/gameUtils";

const initialState = {
    games: [],
    gamesStatus: STATUS.IDLE,
    gamesSingle: {},
    gameSingleStatus: STATUS.IDLE,
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncGames.pending, (state) => {
            state.gamesStatus = STATUS.LOADING
        })

        builder.addCase(fetchAsyncGames.fulfilled, (state, action) =>{
            state.games = action.payload;
            state.gamesStatus = STATUS.SUCCEEDED;
        })

        builder.addCase(fetchAsyncGames.rejected, (state) => {
            state.gamesStatus = STATUS.FAILED;
        })

        builder.addCase(fetchAsyncGamesDetails.pending, (state) => {
            state.gameSingleStatus = STATUS.LOADING;
        })

        builder.addCase(fetchAsyncGamesDetails.fulfilled, (state, action) => {
            state.gamesSingle = action.payload;
            state.gameSingleStatus = STATUS.SUCCEEDED;
        })

        builder.addCase(fetchAsyncGamesDetails.rejected, (state) => {
            state.gameSingleStatus = STATUS.FAILED;
        })
    },
    reducers: {}
});

export const selectAllGames = (state) => state.game.games.results;
export const selectAllGamesStatus = (state) => state.game.gamesStatus;
export const selectAllGamesNextPage = (state) => state.game.next;
export const selectAllGamesPrevPage = (state) => state.game.previous;
export const selectSingleGame = (state) => state.game.gamesSingle;
export const selectSingleGameStatus = (state) => state.game.gameSingleStatus;


export default gameSlice.reducer;