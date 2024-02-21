import styled from 'styled-components';
import GameItem from './GameItem';
import PropTypes from 'prop-types'

const GameList = ({ games, slicevalue = games.length}) => {
  return (
    <GameListWrapper>
    <div className="card-list">
      {
        games?.slice(0, slicevalue).map(item => (
            <GameItem key = {item.id} gameItem = { item } />
        ))
      }
    </div>
    </GameListWrapper>
  )
}

export default GameList;

GameList.propTypes = {
  games: PropTypes.array,
  slicevalue: PropTypes.number
}

const GameListWrapper = styled.div`
  
`;
