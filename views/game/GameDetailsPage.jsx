import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectSingleGame, selectSingleGameStatus } from '../../redux/store/gameSlice';
import { useEffect } from 'react';
import { fetchAsyncGamesDetails } from '../../redux/utils/gameUtils';
import { game_details_image } from '../../utils/images';
import { Breadcrumb, Preloader } from '../../components/common';
import { STATUS } from '../../utils/status';
import { GameDetails } from '../../components/game';

const GameDetailsPage = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const singleGameData = useSelector(selectSingleGame);
  const singleGameStatus = useSelector(selectSingleGameStatus);

  useEffect(() => {
        dispatch(fetchAsyncGamesDetails(gameId));
  },[ gameId ]);
   
  const gameNameById = {
    [singleGameData.id] : singleGameData.name
  }

  return (
    <GameDetailsPageWrapper>
    <div className="sc-details" style={
      {
        background: `
      linear-gradient(0deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32)), 
      linear-gradient(248.75deg, rgba(0, 159, 157, 0.41) 0%, rgba(15, 10, 60, 0.41) 38.46%), 
      url(${game_details_image}) center/cover no-repeat
      `
      }
    }>
       <Breadcrumb dataNameById = { gameNameById } />
       {
        singleGameStatus === STATUS.LOADING ? <Preloader /> :
        <GameDetails gameData = { singleGameData } />
       }
    </div>
    </GameDetailsPageWrapper>
  )
}

export default GameDetailsPage;
 

const GameDetailsPageWrapper = styled.div`
  .sc-details{
    min-height: 100vh;
    padding-top: 65px;
    padding-bottom: 65px;
  }
`;
