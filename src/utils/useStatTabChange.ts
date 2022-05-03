import { useState } from 'react'

export const useStatTabChange = () => {
    const [groupByDimensions, setGroupByDimensions] = useState({
        groupByBidder: { value: true },
        groupBySite: { value: true },
        groupByAdUnit: { value: false },
        // groupBySize: { value: false },
        groupByDevice: { value: false },
        groupByCountry: { value: false }
    })

    const setStatTab = (key: string) => {
        switch (key) {
            case 'bidders':
                setGroupByDimensions({
                    groupByBidder: { value: true },
                    groupBySite: { value: false },
                    groupByAdUnit: { value: false },
                    // groupBySize: { value: false },
                    groupByDevice: { value: false },
                    groupByCountry: { value: false }
                })
                break
            case 'sites':
                setGroupByDimensions({
                    groupByBidder: { value: false },
                    groupBySite: { value: true },
                    groupByAdUnit: { value: false },
                    // groupBySize: { value: false },
                    groupByDevice: { value: false },
                    groupByCountry: { value: false }
                })
                break
            case 'adUnits':
                setGroupByDimensions({
                    groupByBidder: { value: false },
                    groupBySite: { value: false },
                    groupByAdUnit: { value: true },
                    // groupBySize: { value: false },
                    groupByDevice: { value: false },
                    groupByCountry: { value: false }
                })
                break
            case 'sizes':
                setGroupByDimensions({
                    groupByBidder: { value: false },
                    groupBySite: { value: false },
                    groupByAdUnit: { value: false },
                    // groupBySize: { value: true },
                    groupByDevice: { value: false },
                    groupByCountry: { value: false }
                })
                break
            case 'devices':
                setGroupByDimensions({
                    groupByBidder: { value: false },
                    groupBySite: { value: false },
                    groupByAdUnit: { value: false },
                    // groupBySize: { value: false },
                    groupByDevice: { value: true },
                    groupByCountry: { value: false }
                })
                break
            case 'countries':
                setGroupByDimensions({
                    groupByBidder: { value: false },
                    groupBySite: { value: false },
                    groupByAdUnit: { value: false },
                    // groupBySize: { value: false },
                    groupByDevice: { value: false },
                    groupByCountry: { value: true }
                })
                break
        }
    }

    return { groupByDimensions, setStatTab }
}
