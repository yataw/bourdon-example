// import React, { Suspense } from 'react';
import * as React from 'react';
import {Helmet} from 'react-helmet-async';
import {Route, Switch} from 'react-router-dom';
import favicon from '../shared/assets/favicon.png';
import {Client} from 'pages/Client';
import {Teacher} from 'pages/Teacher';
import routes from './routes';
import css from './App.module.css';
import {birds, BirdsProvider} from 'shared/components/Birds';

// Does not yet work with server side rendering:
// const Home = React.lazy(() => import('./pages/Home'));
// const Page1 = React.lazy(() => import('./pages/Page-1'));
// const Page2 = React.lazy(() => import('./pages/Page-2'));

const App: React.FC<any> = () => {
    return (
        // <Suspense fallback={<div>Loading</div>}>
        <div className={css.wrapper}>
            <Helmet
                defaultTitle="React SSR Starter – TypeScript Edition"
                titleTemplate="%s – React SSR Starter – TypeScript Edition"
                link={[{rel: 'icon', type: 'image/png', href: favicon}]}
            />

            <BirdsProvider value={birds}>
                <Switch>
                    <Route exact path={routes.client} component={Client}/>
                    <Route exact path={routes.teacher} component={Teacher}/>
                    <Route render={() => '404!'}/>
                </Switch>
            </BirdsProvider>

            {/*            <ul>
                <li>
                    <Link to="/">{t('nav.home')}</Link>
                </li>
                <li>
                    <Link to="/page-1">{t('nav.page-1')}</Link>
                </li>
                <li>
                    <Link to="/page-2">{t('nav.page-2')}</Link>
                </li>
            </ul>*/}
        </div>
        // </Suspense>
    );
};

export default App;
