/* eslint-disable @typescript-eslint/no-non-null-assertion */
export function getSearchParamPage(
  urlParams: string,
  defaultVal: number
): number {
  const searchParams = new URLSearchParams(urlParams);
  if (
    searchParams.get('page') &&
    Number.isInteger(parseInt(searchParams.get('page')!, 10))
  ) {
    return parseInt(searchParams.get('page')!, 10);
  }
  return defaultVal;
}

export function getSearchParamSearch(
  urlParams: string,
  defaultVal: string
): string {
  const searchParams = new URLSearchParams(urlParams);
  if (searchParams.get('search')) {
    return searchParams.get('search')!;
  }
  return defaultVal;
}
