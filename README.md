# Statistics UI Library

## Getting Started

### Prerequisites

You need to have package ```highcharts``` in your project:
```sh
yarn add highcharts
```

### Installation

* To install the library run
```sh
yarn add https://github.com/staceyviolet/statistics-lib.git
```

The installation process could take some time, don't be afraid, it is normal

* To update the library run
```sh
yarn remove statistics-lib
yarn add https://github.com/staceyviolet/statistics-lib.git
```

## Usage

Import components and their styles:
for dashboard:
```sh
import { TotalDashboard } from 'statistics-lib'
import 'statistics-lib/dist/index.css'
```
for report:
```sh
import { Report } from 'statistics-lib'
import 'statistics-lib/dist/index.css'
```
Mount the components:
dashboard:
```sh
<TotalDashboard
            token={token}
            apiUrl={apiUrl}
            onAccessError={() => console.log('error here')}
            profileCurrency={"USD"}
          />
```
bidders:
```sh
<BiddersComponent
              token={token}
              apiUrl={apiUrl}
              onAccessError={() => console.log('error here')}
              profileCurrency={"USD"}
            />
```
sites:
```sh
<SitesComponent
              token={token}
              apiUrl={apiUrl}
              onAccessError={() => console.log('error here')}
              profileCurrency={"USD"}
            />
```
auctions report:
```sh
<AuctionsReportScreen
              token={token}
              apiUrl={apiUrl}
              onAccessError={() => console.log('error here')}
              profileCurrency={"USD"}
            />
```
revenue report:
```sh
<RevenueReportScreen
              token={token}
              apiUrl={apiUrl}
              onAccessError={() => console.log('error here')}
              profileCurrency={"USD"}
            />
```
