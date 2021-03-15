import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import MyNavbar from './routes/MyNavbar';
import Admin from './routes/Admin';

function App() {
  let navItems = [
    { title:'Admin', to:'/', component:Admin}
  ] // Array of objects with -> path & type 

  return (
    <BrowserRouter>
      <MyNavbar 
        brandItem={{ title:'Kompostmacher', to:'/'}}
        navItems={navItems}
      >
      </MyNavbar>
      <main>
        <Switch>
          {navItems.map((navItem) => {
            return (<Route key={navItem.to} exact path={navItem.to} component={navItem.component}></Route>)
          })}
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
