export async function createHeaders(): Promise<any> {
  const headers = <any>{};
  headers['Content-Type'] = 'application/json; charset=utf-8';
  headers['Access-Control-Allow-Headers'] = 'x-access-token, Origin, Content-Type, Accept';

  return headers;
}
