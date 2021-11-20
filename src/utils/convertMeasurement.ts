export const convertMeasurement = (distance: number, measurement: string = 'km'): number => {
    let rawValue: string = '';
    switch (measurement.toLowerCase()) {
        case 'mi' :
            rawValue = (distance * 0.62137).toFixed(1);
            break;
        case 'km' :
            rawValue = distance.toFixed(1);
            break;
        case 'm' :
            rawValue = (distance * 1000).toFixed();
            break;
        default :
            rawValue = distance.toFixed(1);
    }
    return parseFloat(rawValue);
}