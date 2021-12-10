import { Switch, Route, Redirect  } from 'react-router-dom';

const MySwitch = (props) => {
    const { navItems, otherRoutes, redirect } = props;

    return (
        <Switch>
            {navItems && navItems.map(item => (
                <Route
                    key={item.to}
                    exact
                    path={item.to}
                    component={item.component}>
                </Route>))}

            {otherRoutes && otherRoutes.map(item => (
                <Route
                    key={item.to}
                    exact
                    path={item.to}
                    component={item.component}>
                </Route>))}

             <Route render={() => <Redirect to={{pathname: redirect}} />} />
        </Switch>
    );
    // return (
    //     <Switch>
    //         {otherRoutes && otherRoutes.map(item => (
    //             <Route
    //                 key={item.to}
    //                 exact
    //                 path={item.to}
    //                 component={item.component}>
    //             </Route>))}
    //          <Route render={() => <Redirect to={{pathname: redirect}} />} />
    //     </Switch>
    // );
};

export default MySwitch;

