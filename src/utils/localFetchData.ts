import { optionsList } from './optionsList';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sleepError(ms: number) {
  return new Promise((_, reject) => setTimeout(reject, ms));
}

export const localFetchData = async () => {
  await sleep(1000);

  return optionsList;
}

export const localFailedFetchData = async () => {
  try {
    await sleepError(2500);
    return optionsList
  } catch (e) {
    throw new Error('Error message example');
  }
}
