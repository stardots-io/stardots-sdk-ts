import { createHash } from 'crypto';
import { SDK_VERSION, DEFAULT_REQUEST_TIMEOUT } from './constants';

/**
 * Generate request url.
 */
export function requestUrl(endpoint: string, path: string): string {
  return `${endpoint}${path}`;
}

/**
 * Generate authentication request header.
 */
export function makeHeaders(clientKey: string, clientSecret: string): Record<string, string> {
  const ts = Math.floor(Date.now() / 1000).toString();
  const nonce = `${Date.now()}${10000 + Math.floor(Math.random() * 10000)}`;
  const needSignStr = `${ts}|${clientSecret}|${nonce}`;
  
  const instance = createHash('md5');
  instance.update(needSignStr);
  const sign = instance.digest('hex').toUpperCase();

  const extraInfo = JSON.stringify({
    sdk: 'true',
    language: 'typescript',
    version: SDK_VERSION,
    os: process.platform,
    arch: process.arch,
  });

  return {
    'x-stardots-timestamp': ts,
    'x-stardots-nonce': nonce,
    'x-stardots-key': clientKey,
    'x-stardots-sign': sign,
    'x-stardots-extra': extraInfo,
  };
}

/**
 * Send Request
 */
export async function sendRequest(
  method: string,
  url: string,
  jsonPayload?: Buffer | Uint8Array,
  headers: Record<string, string> = {},
  timeout: number = DEFAULT_REQUEST_TIMEOUT
): Promise<{ response: Buffer; statusCode: number }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...headers,
      },
      signal: controller.signal,
    };

    if (jsonPayload) {
      fetchOptions.body = jsonPayload;
    }

    const response = await fetch(url, fetchOptions);
    const responseBuffer = Buffer.from(await response.arrayBuffer());

    clearTimeout(timeoutId);

    return {
      response: responseBuffer,
      statusCode: response.status,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
} 