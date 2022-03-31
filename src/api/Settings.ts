export interface IApiSettings {
  baseUrl: string;
  authUrl: string;
}

const createSettings = (): IApiSettings => {
  const baseUrl = `${process.env.API_URL}`;
  const authUrl = baseUrl + '/auth';

  return <IApiSettings>{
    baseUrl,
    authUrl
  };
};

const settings = createSettings();

export default settings;
