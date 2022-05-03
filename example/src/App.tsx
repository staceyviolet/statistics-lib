import React                                                                      from 'react'
import { Route, Router, Switch, Redirect }                                        from "react-router-dom";
import { createBrowserHistory }                                                   from "history";
import { BiddersComponent, SitesComponent, TotalDashboard, AuctionsReportScreen, RevenueReportScreen } from "statistics-lib";

import 'statistics-lib/dist/index.css'

export const history = createBrowserHistory();

const App = () => {
    const token = 'NnFsZzkzSnA4QmgwRUV3UVhxMm5aUT09OllWdWtxaEFPUVhJMlErbXFaQUNybXc9PQ'
    const apiUrl = 'http://localhost:8080'

    return (
      <Router history={history}>
        <Switch>
          <Route path="/dashboard" render={() => <TotalDashboard
            token={token}
            apiUrl={apiUrl}
            onAccessError={() => console.log('error here')}
            profileCurrency={"USD"}
          />}/>
          <Route path="/bidders" render={() =>
            <BiddersComponent
              token={token}
              apiUrl={apiUrl}
              onAccessError={() => console.log('error here')}
              profileCurrency={"USD"}
            />}/>
          <Route path="/sites" render={() =>
            <SitesComponent
              token={token}
              apiUrl={apiUrl}
              onAccessError={() => console.log('error here')}
              profileCurrency={"USD"}
            />}/>
          <Route path="/auctions" render={() =>
            <AuctionsReportScreen
              token={token}
              apiUrl={apiUrl}
              onAccessError={() => console.log('error here')}
              profileCurrency={"USD"}
            />}/>
          <Route path="/revenue" render={() =>
            <RevenueReportScreen
              token={token}
              apiUrl={apiUrl}
              onAccessError={() => console.log('error here')}
              profileCurrency={"USD"}
            />}/>
          <Redirect from="/" to="/dashboard"/>
        </Switch>
      </Router>
    )
}

export default App
