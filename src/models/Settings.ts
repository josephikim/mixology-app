export interface ISettings {
  projectName: string;
  description: string;
  apiBaseUrl: string;
  authBaseUrl: string;
}

const createSettings = (): ISettings => {
  const authUrl = 'localhost:8080/api/login';
  const baseUrl = '';
  return <ISettings>{
    projectName: 'drink-cellar-app',
    description: '',
    apiBaseUrl: baseUrl,
    authBaseUrl: authUrl,
  };
};

const settings = createSettings();

export default settings;
