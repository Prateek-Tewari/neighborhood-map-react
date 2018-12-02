/*
 To connect Foursquare with the app - Foursquare API Developer docs(@ https://developer.foursquare.com/docs/api/) and app for integrating 3rd Party API.
*/
class Reuse {
  static baseURL() {
    return "https://api.foursquare.com/v2/"; //reusable code
  }
  static auth() {
    const keys = {
      client_id: "5USGS1RXTVATAPJYFDV2LYRB024NJX2JLCZ2QFPWQCIR4DLA",
      client_secret: "RC2BTGDFAJITR3DG40CJGYC2HJBGKJMEHLBSBLHUMOXX2UDR",
      v: "20181202" //version as of developing date
    };
    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join("&");
  }
  static urlBuilder(params) {
    if (!params) {
      return "";
    }
    return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join("&");
  }
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  static fetchHeaders(endPoint, method, params) {
    let request = {
      method,
      headers: Reuse.headers()
    };
    return fetch(
      `${Reuse.baseURL()}${endPoint}?${Reuse.auth()}&${Reuse.urlBuilder(
        params
      )}`,
      request
    ).then(response => response.json());
  }
}

export default class fourSquare {
  static search(params) {
    return Reuse.fetchHeaders("venues/search", "GET", params);
  }
  static getVenue(VENUE_ID) {
    return Reuse.fetchHeaders(`venues/${VENUE_ID}`, "GET");
  }
  static getPhotos(VENUE_ID) {
    return Reuse.fetchHeaders(`venues/${VENUE_ID}/photos`, "GET");
  }
}
