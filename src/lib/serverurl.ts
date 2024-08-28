const myURL: URL = new URL('http://192.168.94.212:8080');
export const AiURL: URL = new URL('http://192.168.94.195:2000/predict');

export function addpath(pathname: string, search?: string): URL {
	const url: URL = myURL;
	url.pathname = pathname;
	if (search) url.search = search;
	return url;
}
