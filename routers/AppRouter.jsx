import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home, Error, ViewGameAll, ViewGameDetails, ViewStoreAll, ViewStoreDetails, 
       ViewCreatorAll } from '../views/index';


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path='/' element = { <Home />} />
        <Route path='/error' element = { <Error />} />
        <Route path='/games' element = { <ViewGameAll />} />
        <Route path='/games/:gameId' element = { <ViewGameDetails />} />
        <Route path='/stores'  element = { <ViewStoreAll />} />
        <Route path='/stores/:storeId' element = { <ViewStoreDetails />} />
        <Route path='/creators' element = { <ViewCreatorAll />} />
        <Route path='*' element = { <Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter