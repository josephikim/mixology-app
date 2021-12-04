export interface ISettings {
  apiBaseUrl: string;
  apiAuthUrl: string;
}

const createSettings = (): ISettings => {
  const baseUrl = 'localhost:3000/api';
  const authUrl = baseUrl + '/auth';
  return <ISettings>{
    apiBaseUrl: baseUrl,
    apiAuthUrl: authUrl
  };
};

const settings = createSettings();

export default settings;
