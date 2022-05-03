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
yarn add ssh://git@github.com:staceyviolet/statistics-lib.git
```

The installation process could take some time, don't be afraid, it is normal

* To update the library run
```sh
yarn remove statistics-lib
yarn add ssh://git@github.com:staceyviolet/statistics-lib.git
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
    token="TjBuTjZZYVhSL2p1eGVUZ2tEejN3QT09OjRLSUhGQkhGZDNwczF1UEJrTEZZU0E9PQ"
    apiUrl="http://localhost:8080"
    onAccessError={() => console.log('error here')}
/>
```
report:
```sh
<Report
    token="TjBuTjZZYVhSL2p1eGVUZ2tEejN3QT09OjRLSUhGQkhGZDNwczF1UEJrTEZZU0E9PQ"
    apiUrl="http://localhost:8080"
    onAccessError={() => console.log('error here')}
/>
```
