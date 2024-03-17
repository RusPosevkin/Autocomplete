type APIType = {
  name: {
    common: string;
    official: string
  }
}

export const transformData = (rawData: any) => {
  return rawData.map((item: APIType) => {
    return {
      value: item.name?.common,
      label: item.name.official
    }
  });
}
