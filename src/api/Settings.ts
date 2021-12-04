export interface ISettings {
  apiBaseUrl: string;
  apiTestUrl: string;
  apiAuthUrl: string;
}

const createSettings = (): ISettings => {
  const baseUrl = 'localhost:3000/api';
  const testUrl = baseUrl + '/test';
  const authUrl = baseUrl + '/auth';
  return <ISettings>{
    apiBaseUrl: baseUrl,
    apiTestUrl: testUrl,
    apiAuthUrl: authUrl
  };
};

const settings = createSettings();

export default settings;
