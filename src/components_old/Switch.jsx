import { Switch, Route, Redirect  } from 'react-router-dom';

const MySwitch = (props) => {
    const { routes, redirect } = props;

    return (
        <Switch>
            {routes && routes.map(item => (
                <Route
                    key={item.to}
                    exact
                    path={item.to}
                    component={item.component}>
                </Route>))}
             <Route render={() => <Redirect to={{pathname: redirect}} />} />
        </Switch>
    );
};

export default MySwitch;

