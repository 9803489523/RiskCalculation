export function loaToNubmer(value) {
    if (value) {
        switch (value) {
            case 'Very Low':
                return 0.1
            case 'Low':
                return 0.3
            case 'Medium':
                return 0.5
            case 'High':
                return 0.7
            case 'Very High':
                return 0.9
            default:
                return
        }
    } else {
        return 0.1
    }

}
export function attackVectorToNubmer(value) {
    switch (value) {
        case 'NETWORK':
            return 0.85
        case 'ADJACENT_NETWORK':
            return 0.62
        case 'LOCAL':
            return 0.55
        case 'PHYSICAL':
            return 0.2
        default:
            return
    }
}
export function attackComplexityToNubmer(value) {
    switch (value) {
        case 'LOW':
            return 0.77
        case 'HIGH':
            return 0.44
        default:
            return
    }
}
export function privilegesRequiredToNubmer(value) {
    switch (value) {
        case 'NONE':
            return 0.85
        case 'LOW':
            return 0.62
        case 'HIGH':
            return 0.27
        default:
            return
    }
}
export function userInteractionToNubmer(value) {
    switch (value) {
        case 'NONE':
            return 0.85
        case 'REQUIRED':
            return 0.62
        default:
            return
    }
}
export function confidentialityImpactToNubmer(value) {
    switch (value) {
        case 'NONE':
            return 0
        case 'LOW':
            return 0.22
        case 'HIGH':
            return 0.56
        default:
            return
    }
}
export function integrityImpactToNubmer(value) {
    switch (value) {
        case 'NONE':
            return 0
        case 'LOW':
            return 0.22
        case 'HIGH':
            return 0.56
        default:
            return
    }
}
export function availabilityImpactToNubmer(value) {
    switch (value) {
        case 'NONE':
            return 0
        case 'LOW':
            return 0.22
        case 'HIGH':
            return 0.56
        default:
            return
    }
}
export function confidentialityImpactV2ToNubmer(value) {
    switch (value) {
        case 'NONE':
            return 0
        case 'PARTIAL':
            return 0.275
        case 'COMPLETE':
            return 0.660
        default:
            return
    }
}
export function integrityImpactV2ToNubmer(value) {
    switch (value) {
        case 'NONE':
            return 0
        case 'PARTIAL':
            return 0.275
        case 'COMPLETE':
            return 0.660
        default:
            return
    }
}
export function availabilityImpactV2ToNubmer(value) {
    switch (value) {
        case 'NONE':
            return 0
        case 'PARTIAL':
            return 0.275
        case 'COMPLETE':
            return 0.660
        default:
            return
    }
}
export function accessVectorToNubmer(value) {
    switch (value) {
        case 'NETWORK':
            return 1
        case 'ADJACENT_NETWORK':
            return 0.646
        case 'LOCAL':
            return 0.395
        default:
            return
    }
}
export function accessComplexityToNubmer(value) {
    switch (value) {
        case 'LOW':
            return 0.71
        case 'MEDIUM':
            return 0.61
        case 'HIGH':
            return 0.35
        default:
            return
    }
}
export function authenticationToNubmer(value) {
    switch (value) {
        case 'NONE':
            return 0.704
        case 'SINGLE':
            return 0.56
        case 'MULTIPLE':
            return 0.45
        default:
            return
    }
}
export function riskConf(metrics, loa, conf_number, type_risk_landshaft) {

    if (metrics?.cvssMetricV31 && metrics?.cvssMetricV31[0].source === 'nvd@nist.gov') {
        let aV = attackVectorToNubmer(metrics?.cvssMetricV31[0].cvssData.attackVector)
        let aC = attackComplexityToNubmer(metrics?.cvssMetricV31[0].cvssData.attackComplexity)
        let pR = privilegesRequiredToNubmer(metrics?.cvssMetricV31[0].cvssData.privilegesRequired)
        let uI = userInteractionToNubmer(metrics?.cvssMetricV31[0].cvssData.userInteraction)
        // impact
        let cI = confidentialityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.confidentialityImpact)
        let iI = integrityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.integrityImpact)
        let aI = availabilityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.availabilityImpact)
        let likelihood = loaToNubmer(loa)
        if (typeof conf_number === 'number' && type_risk_landshaft !== 'base') {
            cI = conf_number
        } else if (type_risk_landshaft === 'base') {
            cI = confidentialityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.confidentialityImpact)
        }
        let Risk = aV * aC * pR * uI * likelihood * cI
        return (Math.ceil(Risk * 1000) / 1000).toFixed(4)
        // return [aV, aC, pR, uI, cI, iI, aI]
    }
    else if (metrics?.cvssMetricV30 && metrics?.cvssMetricV30[0].source === 'nvd@nist.gov') {
        let aV = attackVectorToNubmer(metrics?.cvssMetricV30[0].cvssData.attackVector)
        let aC = attackComplexityToNubmer(metrics?.cvssMetricV30[0].cvssData.attackComplexity)
        let pR = privilegesRequiredToNubmer(metrics?.cvssMetricV30[0].cvssData.privilegesRequired)
        let uI = userInteractionToNubmer(metrics?.cvssMetricV30[0].cvssData.userInteraction)
        // impact
        let cI = confidentialityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.confidentialityImpact)
        let iI = integrityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.integrityImpact)
        let aI = availabilityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.availabilityImpact)
        let likelihood = loaToNubmer(loa)
        if (typeof conf_number === 'number' && type_risk_landshaft !== 'base') {
            cI = conf_number
        } else if (type_risk_landshaft === 'base') {
            cI = confidentialityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.confidentialityImpact)
        }
        let Risk = aV * aC * pR * uI * likelihood * cI
        return (Math.ceil(Risk * 1000) / 1000).toFixed(4)
        // return [aV, aC, pR, uI, cI, iI, aI]
    } else if (metrics?.cvssMetricV2 && metrics?.cvssMetricV2[0].source === 'nvd@nist.gov') {
        let aV = accessVectorToNubmer(metrics?.cvssMetricV2[0].cvssData.accessVector)
        let aC = accessComplexityToNubmer(metrics?.cvssMetricV2[0].cvssData.accessComplexity)
        let aU = authenticationToNubmer(metrics?.cvssMetricV2[0].cvssData.authentication)
        // impact
        let cI = confidentialityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.confidentialityImpact)
        let iI = integrityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.integrityImpact)
        let aI = availabilityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.availabilityImpact)
        let likelihood = loaToNubmer(loa)
        if (typeof conf_number === 'number' && type_risk_landshaft !== 'base') {
            cI = conf_number
        } else if (type_risk_landshaft === 'base') {
            cI = confidentialityImpactToNubmer(metrics?.cvssMetricV2[0].cvssData.confidentialityImpact)
        }
        let Risk = aV * aC * aU * likelihood * cI
        return (Math.ceil(Risk * 1000) / 1000).toFixed(4)
    }
    // return metrics
}
export function riskInt(metrics, loa, int_number, type_risk_landshaft) {
    if (metrics?.cvssMetricV31 && metrics?.cvssMetricV31[0].source === 'nvd@nist.gov') {
        let aV = attackVectorToNubmer(metrics?.cvssMetricV31[0].cvssData.attackVector)
        let aC = attackComplexityToNubmer(metrics?.cvssMetricV31[0].cvssData.attackComplexity)
        let pR = privilegesRequiredToNubmer(metrics?.cvssMetricV31[0].cvssData.privilegesRequired)
        let uI = userInteractionToNubmer(metrics?.cvssMetricV31[0].cvssData.userInteraction)
        // impact
        let cI = confidentialityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.confidentialityImpact)
        let iI = integrityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.integrityImpact)
        let aI = availabilityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.availabilityImpact)
        let likelihood = loaToNubmer(loa)
        if (typeof int_number === 'number' && type_risk_landshaft !== 'base') {
            iI = int_number
        } else if (type_risk_landshaft === 'base') {
            iI = integrityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.integrityImpact)
        }
        let Risk = aV * aC * pR * uI * likelihood * iI
        return (Math.ceil(Risk * 1000) / 1000).toFixed(4)
    }
    else if (metrics?.cvssMetricV30 && metrics?.cvssMetricV30[0].source === 'nvd@nist.gov') {
        let aV = attackVectorToNubmer(metrics?.cvssMetricV30[0].cvssData.attackVector)
        let aC = attackComplexityToNubmer(metrics?.cvssMetricV30[0].cvssData.attackComplexity)
        let pR = privilegesRequiredToNubmer(metrics?.cvssMetricV30[0].cvssData.privilegesRequired)
        let uI = userInteractionToNubmer(metrics?.cvssMetricV30[0].cvssData.userInteraction)
        // impact
        let cI = confidentialityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.confidentialityImpact)
        let iI = integrityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.integrityImpact)
        let aI = availabilityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.availabilityImpact)
        let likelihood = loaToNubmer(loa)
        let impact = (1 - (1 - cI) * (1 - iI) * (1 - aI))
        if (typeof int_number === 'number' && type_risk_landshaft !== 'base') {
            iI = int_number
        } else if (type_risk_landshaft === 'base') {
            iI = integrityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.integrityImpact)
        }
        let Risk = aV * aC * pR * uI * likelihood * iI
        return (Math.ceil(Risk * 1000) / 1000).toFixed(4)
        // return [aV, aC, pR, uI, cI, iI, aI]
    } else if (metrics?.cvssMetricV2 && metrics?.cvssMetricV2[0].source === 'nvd@nist.gov') {
        let aV = accessVectorToNubmer(metrics?.cvssMetricV2[0].cvssData.accessVector)
        let aC = accessComplexityToNubmer(metrics?.cvssMetricV2[0].cvssData.accessComplexity)
        let aU = authenticationToNubmer(metrics?.cvssMetricV2[0].cvssData.authentication)
        // impact
        let cI = confidentialityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.confidentialityImpact)
        let iI = integrityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.integrityImpact)
        let aI = availabilityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.availabilityImpact)
        let likelihood = loaToNubmer(loa)
        if (typeof int_number === 'number' && type_risk_landshaft !== 'base') {
            iI = int_number
        } else if (type_risk_landshaft === 'base') {
            iI = integrityImpactToNubmer(metrics?.cvssMetricV2[0].cvssData.integrityImpact)
        }
        let Risk = aV * aC * aU * likelihood * iI
        return (Math.ceil(Risk * 1000) / 1000).toFixed(4)
    }
    // return metrics
}
export function riskAvail(metrics, loa, avail_number, type_risk_landshaft) {
    if (metrics?.cvssMetricV31 && metrics?.cvssMetricV31[0].source === 'nvd@nist.gov') {
        let aV = attackVectorToNubmer(metrics?.cvssMetricV31[0].cvssData.attackVector)
        let aC = attackComplexityToNubmer(metrics?.cvssMetricV31[0].cvssData.attackComplexity)
        let pR = privilegesRequiredToNubmer(metrics?.cvssMetricV31[0].cvssData.privilegesRequired)
        let uI = userInteractionToNubmer(metrics?.cvssMetricV31[0].cvssData.userInteraction)
        // impact
        let cI = confidentialityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.confidentialityImpact)
        let iI = integrityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.integrityImpact)
        let aI = availabilityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.availabilityImpact)
        let likelihood = loaToNubmer(loa)
        if (typeof avail_number === 'number' && type_risk_landshaft !== 'base') {
            aI = avail_number
        } else if (type_risk_landshaft === 'base') {
            aI = availabilityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.availabilityImpact)
        }
        let Risk = aV * aC * pR * uI * likelihood * aI
        return (Math.ceil(Risk * 1000) / 1000).toFixed(4)
        // return [aV, aC, pR, uI, cI, iI, aI]
    }
    else if (metrics?.cvssMetricV30 && metrics?.cvssMetricV30[0].source === 'nvd@nist.gov') {
        let aV = attackVectorToNubmer(metrics?.cvssMetricV30[0].cvssData.attackVector)
        let aC = attackComplexityToNubmer(metrics?.cvssMetricV30[0].cvssData.attackComplexity)
        let pR = privilegesRequiredToNubmer(metrics?.cvssMetricV30[0].cvssData.privilegesRequired)
        let uI = userInteractionToNubmer(metrics?.cvssMetricV30[0].cvssData.userInteraction)
        // impact
        let cI = confidentialityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.confidentialityImpact)
        let iI = integrityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.integrityImpact)
        let aI = availabilityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.availabilityImpact)
        let likelihood = loaToNubmer(loa)
        if (typeof avail_number === 'number' && type_risk_landshaft !== 'base') {
            aI = avail_number
        } else if (type_risk_landshaft === 'base') {
            aI = availabilityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.availabilityImpact)
        }
        let Risk = aV * aC * pR * uI * likelihood * aI
        return (Math.ceil(Risk * 1000) / 1000).toFixed(4)
        // return [aV, aC, pR, uI, cI, iI, aI]
    } else if (metrics?.cvssMetricV2 && metrics?.cvssMetricV2[0].source === 'nvd@nist.gov') {
        let aV = accessVectorToNubmer(metrics?.cvssMetricV2[0].cvssData.accessVector)
        let aC = accessComplexityToNubmer(metrics?.cvssMetricV2[0].cvssData.accessComplexity)
        let aU = authenticationToNubmer(metrics?.cvssMetricV2[0].cvssData.authentication)
        // impact
        let cI = confidentialityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.confidentialityImpact)
        let iI = integrityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.integrityImpact)
        let aI = availabilityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.availabilityImpact)
        let likelihood = loaToNubmer(loa)
        if (typeof avail_number === 'number' && type_risk_landshaft !== 'base') {
            aI = avail_number
        } else if (type_risk_landshaft === 'base') {
            aI = availabilityImpactToNubmer(metrics?.cvssMetricV2[0].cvssData.availabilityImpact)
        }
        let Risk = aV * aC * aU * likelihood * aI
        return (Math.ceil(Risk * 1000) / 1000).toFixed(4)
    }
    // return metrics
}
export function riskTime(metrics, loa, time, worth) {
    let c_time = 1
    let c_worth = 1
    if (typeof time === 'number') {
        c_time = time
    }
    if (typeof worth === 'number') {
        c_worth = worth
    }
    if (metrics?.cvssMetricV31 && metrics?.cvssMetricV31[0].source === 'nvd@nist.gov') {
        let aV = attackVectorToNubmer(metrics?.cvssMetricV31[0].cvssData.attackVector)
        let aC = attackComplexityToNubmer(metrics?.cvssMetricV31[0].cvssData.attackComplexity)
        let pR = privilegesRequiredToNubmer(metrics?.cvssMetricV31[0].cvssData.privilegesRequired)
        let uI = userInteractionToNubmer(metrics?.cvssMetricV31[0].cvssData.userInteraction)
        // impact
        let cI = confidentialityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.confidentialityImpact)
        let iI = integrityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.integrityImpact)
        let aI = availabilityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.availabilityImpact)
        let likelihood = loaToNubmer(loa)
        let impact = (1 - ((1 - cI) * (1 - iI) * (1 - aI)))
        let Risk = aV * aC * pR * uI * likelihood * c_time * c_worth
        return Risk
        // return [aV, aC, pR, uI, cI, iI, aI]
    }
    else if (metrics?.cvssMetricV30 && metrics?.cvssMetricV30[0].source === 'nvd@nist.gov') {
        let aV = attackVectorToNubmer(metrics?.cvssMetricV30[0].cvssData.attackVector)
        let aC = attackComplexityToNubmer(metrics?.cvssMetricV30[0].cvssData.attackComplexity)
        let pR = privilegesRequiredToNubmer(metrics?.cvssMetricV30[0].cvssData.privilegesRequired)
        let uI = userInteractionToNubmer(metrics?.cvssMetricV30[0].cvssData.userInteraction)
        // impact
        let cI = confidentialityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.confidentialityImpact)
        let iI = integrityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.integrityImpact)
        let aI = availabilityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.availabilityImpact)
        let likelihood = loaToNubmer(loa)
        let impact = (1 - (1 - cI) * (1 - iI) * (1 - aI))
        let Risk = aV * aC * pR * uI * likelihood * c_time * c_worth
        return Risk
        // return [aV, aC, pR, uI, cI, iI, aI]
    } else if (metrics?.cvssMetricV2 && metrics?.cvssMetricV2[0].source === 'nvd@nist.gov') {
        let aV = accessVectorToNubmer(metrics?.cvssMetricV2[0].cvssData.accessVector)
        let aC = accessComplexityToNubmer(metrics?.cvssMetricV2[0].cvssData.accessComplexity)
        let aU = authenticationToNubmer(metrics?.cvssMetricV2[0].cvssData.authentication)
        // impact
        let cI = confidentialityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.confidentialityImpact)
        let iI = integrityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.integrityImpact)
        let aI = availabilityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.availabilityImpact)
        let likelihood = loaToNubmer(loa)
        let impact = (1 - (1 - cI) * (1 - iI) * (1 - aI))
        let Risk = aV * aC * aU * likelihood * c_time * c_worth
        return Risk
    }
    // return metrics
}