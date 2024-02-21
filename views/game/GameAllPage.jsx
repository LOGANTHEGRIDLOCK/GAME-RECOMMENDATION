import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllGames, selectAllGamesNextPage, selectAllGamesPrevPage, selectAllGamesStatus } from '../../redux/store/gameSlice';
import { useEffect, useState } from 'react';
import { Pagination, Preloader, Title, Navbar } from '../../components/common';
import { STATUS } from '../../utils/status';
import { GameList } from '../../components/game';
import { fetchAsyncGames } from '../../redux/utils/gameUtils';

const GameAllPage = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);
  const gamesStatus = useSelector(selectAllGamesStatus);
  const nextPage = useSelector(selectAllGamesNextPage);
  const prevPage = useSelector(selectAllGamesPrevPage);
  const [page, setpage] = useState(1);

  useEffect(() => {
       dispatch(fetchAsyncGames(page));
  },[page])

   const pageHandler = (pageValue) => setpage(pageValue);

  return (
    <GameAllPageWrapper>
    <Navbar/>
     <div className="sc-games section">
      <div className="container">
        <Title titleName={{
             firstText: "all",
             secondText: "games"
        }} />
        {
          gamesStatus === STATUS.LOADING ? <Preloader /> : games?.
          length > 0 ? <>
            <GameList games = { games } />
            <Pagination pageHandler = { pageHandler } nextPage = {
              nextPage } prevPage = { prevPage } currentPage = {page} />
          </> : "NO GAME AVAILABLE"
        }
      </div>
     </div>
    </GameAllPageWrapper>
  )
}

export default GameAllPage;

const GameAllPageWrapper = styled.div`
  background-color: var(--clr-violet-dark-active);

  .sc-games{
    min-height: 100vh;
    padding-top: 65px;
  }
`;
