type APIType = {
  name: {
    common: string;
    official: string
  }
}

/**
* Function for transforming response of API restcountries.com
* @param rawData - API response
*/

export const transformData = (rawData: any) => {
  return rawData.map((item: APIType) => {
    return {
      value: item.name?.common,
      label: item.name.official
    }
  });
}
