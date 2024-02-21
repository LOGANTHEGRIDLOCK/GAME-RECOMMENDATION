import styled from "styled-components";
import { Outlet } from "react-router-dom";
import {
  Banner,
  Title,
  Navbar,
  Footer,
  Preloader,
  ImageSlider,
  Tabs,
} from "../../components/common/index";
import {
  selectAllGames,
  selectAllGamesStatus,
} from "../../redux/store/gameSlice";
import { useEffect } from "react";
import { fetchAsyncGames } from "../../redux/utils/gameUtils";
import { fetchAsyncGenres } from "../../redux/utils/genreUtils";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { STATUS } from "../../utils/status";
import { StoreList } from "../../components/store/index";
import { GameList } from "../../components/game/index";
import { join_image, store_image } from "../../utils/images";
import {
  selectAllGenres,
  selectAllGenresStatus,
} from "../../redux/store/genreSlice";
import {
  selectAllStores,
  selectAllStoresStatus,
} from "../../redux/store/storeSlice";
import { fetchAsyncStores } from "../../redux/utils/storeUtils";

const HomePage = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);
  const gameStatus = useSelector(selectAllGamesStatus);
  const genres = useSelector(selectAllGenres);
  const genresStatus = useSelector(selectAllGenresStatus);
  const stores = useSelector(selectAllStores);
  const storesStatus = useSelector(selectAllStoresStatus);

  useEffect(() => {
    dispatch(fetchAsyncGames());
    dispatch(fetchAsyncGenres());
    dispatch(fetchAsyncStores());
  }, []);

  const renderdPopularGames = (
    <>
      <GameList slicevalue={9} games={games} />
      <div className="d-flex justify-content-center">
        <Link to="/games" className="section-btn">
          see more games
        </Link>
      </div>
    </>
  );

  return (
    <HomeWrapper>
      <Navbar />
      <Banner />
      <section className="section sc-popular">
        <div className="container">
          <Title
            titleName={{ firstText: "top popular", secondText: "games" }}
          />
          {gameStatus === STATUS.LOADING ? (
            <Preloader />
          ) : games?.length > 0 ? (
            renderdPopularGames
          ) : (
            "No games found!"
          )}
        </div>
      </section>
      <ImageSlider />
      <Outlet />
      <section
        className="section sc-join d-flex align-items-center"
        style={{
          background: `
      linear-gradient(0deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32)), 
      linear-gradient(248.75deg, rgba(0, 159, 157, 0.41) 0%, rgba(15, 10, 60, 0.41) 38.46%), 
      url(${join_image}) center/cover no-repeat
      `,
        }}
      >
        <div className="container w-100">
          <div className="join-content text-white mx-auto text-center">
            <h2 className="join-title mb-3">
              JOIN THE <span>COMMUNITY</span>
            </h2>
            <p className="lead-text">
              live gaming with lots of other games. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Sunt inventore, ipsa accusantium
              illo earum explicabo eveniet nihil culpa totam, aliquam cupiditate
              laboriosam vitae, rerum perferendis omnis beatae a. Velit, dolor.
            </p>
            <Link to="https://discord.com/servers/gaming">
              <button type="button" className="section-btn mt-4">
                join discord
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section sc-genres">
        <div className="container">
          <Title
            titleName={{
              firstText: "top",
              secondText: "genres",
            }}
          />
        </div>
        {genresStatus === STATUS.LOADING ? (
          <Preloader />
        ) : genres?.length > 0 ? (
          <Tabs slicevalue={9} data={genres} />
        ) : (
          "No genre found!"
        )}
      </section>

      <section
        className="section sc-stores"
        style={{
          background: `
      linear-gradient(0deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32)), 
      linear-gradient(248.75deg, rgba(0, 159, 157, 0.41) 0%, rgba(15, 10, 60, 0.41) 38.46%), 
      url(${store_image}) center/cover no-repeat`,
        }}
      >
        <div className="container">
           <Title titleName={{
            firstText : 'our',
            secondText: 'store'
           }}/>

           {
            storesStatus === STATUS.LOADING ? <Preloader /> :
            stores?.length > 0 ? 
            <StoreList stores={ stores } /> :
            'store not found!'
           }
        </div>
      </section>
      <Footer />
    </HomeWrapper>
  );
};

export default HomePage;

const HomeWrapper = styled.div`
  .sc-popular {
    background-color: var(--clr-violet-dark-active);
    .section-btn {
      margin-top: 60px;
    }
  }

  .sc-join {
    min-height: 640px;

    .join-content {
      max-width: 600px;
    }

    .join-title {
      text-shadow: 0px 4px 4px 0px #00000040;
      font-size: 44px;
      letter-spacing: 0.09em;

      span {
        color: var(--clr-green-normal);
        font-family: var(--font-family-right);
      }
    }
  } 

  .sc-genres {
    background-color: var(--clr-violet-dark-active);
  }

  .sc-stores {
    min-height: 841px;
  }
`;
