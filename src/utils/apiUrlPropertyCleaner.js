export default function apiUrlPropertyCleaner(property) {
    return property.match(/.+?(?=_)/)[0];
    // return string.replace(/.+/, (...items) => {
    //     return items[2].match(new RegExp(`${desired}`))[0].match(new RegExp(`.+(?=${excluded})`));
    // });
}