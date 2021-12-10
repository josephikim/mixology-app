export interface IApiSettings {
  baseUrl: string;
  authUrl: string;
}

const createSettings = (): IApiSettings => {
  const baseUrl = 'http://localhost:3000/api';
  const authUrl = baseUrl + '/auth';

  return <IApiSettings>{
    baseUrl,
    authUrl
  };
};

const settings = createSettings();

export default settings;
