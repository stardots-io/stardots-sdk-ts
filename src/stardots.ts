import { requestUrl, makeHeaders, sendRequest } from './helper';
import { ENDPOINT } from './constants';
import {
  SpaceListReq,
  SpaceListResp,
  CreateSpaceReq,
  CreateSpaceResp,
  DeleteSpaceReq,
  DeleteSpaceResp,
  ToggleSpaceAccessibilityReq,
  ToggleSpaceAccessibilityResp,
  SpaceFileListReq,
  SpaceFileListResp,
  FileAccessTicketReq,
  FileAccessTicketResp,
  UploadFileReq,
  UploadFileResp,
  DeleteFileReq,
  DeleteFileResp,
} from './types';

/**
 * StarDots SDK interface
 */
export interface IStarDots {
  /**
   * Get space list data.
   */
  getSpaceList(params: SpaceListReq): Promise<SpaceListResp>;
  
  /**
   * Create a new space.
   */
  createSpace(params: CreateSpaceReq): Promise<CreateSpaceResp>;
  
  /**
   * Delete an existing space. Note that you must ensure that there are no files in this space, otherwise the deletion will fail.
   */
  deleteSpace(params: DeleteSpaceReq): Promise<DeleteSpaceResp>;
  
  /**
   * Toggle the accessibility of a space.
   */
  toggleSpaceAccessibility(params: ToggleSpaceAccessibilityReq): Promise<ToggleSpaceAccessibilityResp>;
  
  /**
   * Get the list of files in the space. The list is sorted in descending order by file upload time.
   */
  getSpaceFileList(params: SpaceFileListReq): Promise<SpaceFileListResp>;
  
  /**
   * Get the access ticket for the file. When the accessibility of the space is private, you need to bring the access ticket to access the files under the space, otherwise the request will be rejected.
   */
  fileAccessTicket(params: FileAccessTicketReq): Promise<FileAccessTicketResp>;
  
  /**
   * Upload the file to the space. Note that this request requires you to initiate the request in the form of a form.
   */
  uploadFile(params: UploadFileReq): Promise<UploadFileResp>;
  
  /**
   * Delete files in the space. This interface supports batch operations.
   */
  deleteFile(params: DeleteFileReq): Promise<DeleteFileResp>;
}

/**
 * StarDots SDK implementation
 */
export class StarDotsImpl implements IStarDots {
  private endpoint: string;
  private clientKey: string;
  private clientSecret: string;

  constructor(clientKey: string, clientSecret: string, endpoint?: string) {
    this.endpoint = endpoint || ENDPOINT;
    this.clientKey = clientKey;
    this.clientSecret = clientSecret;
  }

  async getSpaceList(params: SpaceListReq): Promise<SpaceListResp> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.pageSize) searchParams.append('pageSize', params.pageSize.toString());
    
    const url = requestUrl(this.endpoint, `/openapi/space/list?${searchParams.toString()}`);
    const { response } = await sendRequest('GET', url, undefined, makeHeaders(this.clientKey, this.clientSecret));
    
    return JSON.parse(response.toString());
  }

  async createSpace(params: CreateSpaceReq): Promise<CreateSpaceResp> {
    const url = requestUrl(this.endpoint, '/openapi/space/create');
    const payload = Buffer.from(JSON.stringify(params));
    const { response } = await sendRequest('PUT', url, payload, makeHeaders(this.clientKey, this.clientSecret));
    
    return JSON.parse(response.toString());
  }

  async deleteSpace(params: DeleteSpaceReq): Promise<DeleteSpaceResp> {
    const url = requestUrl(this.endpoint, '/openapi/space/delete');
    const payload = Buffer.from(JSON.stringify(params));
    const { response } = await sendRequest('DELETE', url, payload, makeHeaders(this.clientKey, this.clientSecret));
    
    return JSON.parse(response.toString());
  }

  async toggleSpaceAccessibility(params: ToggleSpaceAccessibilityReq): Promise<ToggleSpaceAccessibilityResp> {
    const url = requestUrl(this.endpoint, '/openapi/space/accessibility/toggle');
    const payload = Buffer.from(JSON.stringify(params));
    const { response } = await sendRequest('POST', url, payload, makeHeaders(this.clientKey, this.clientSecret));
    
    return JSON.parse(response.toString());
  }

  async getSpaceFileList(params: SpaceFileListReq): Promise<SpaceFileListResp> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.pageSize) searchParams.append('pageSize', params.pageSize.toString());
    searchParams.append('space', params.space);
    
    const url = requestUrl(this.endpoint, `/openapi/file/list?${searchParams.toString()}`);
    const { response } = await sendRequest('GET', url, undefined, makeHeaders(this.clientKey, this.clientSecret));
    
    return JSON.parse(response.toString());
  }

  async fileAccessTicket(params: FileAccessTicketReq): Promise<FileAccessTicketResp> {
    const url = requestUrl(this.endpoint, '/openapi/file/ticket');
    const payload = Buffer.from(JSON.stringify(params));
    const { response } = await sendRequest('POST', url, payload, makeHeaders(this.clientKey, this.clientSecret));
    
    return JSON.parse(response.toString());
  }

  async uploadFile(params: UploadFileReq): Promise<UploadFileResp> {
    const url = requestUrl(this.endpoint, '/openapi/file/upload');
    
    // Create FormData for file upload
    const formData = new FormData();
    const blob = new Blob([params.fileContent]);
    formData.append('file', blob, params.filename);
    formData.append('space', params.space);
    
    const headers = makeHeaders(this.clientKey, this.clientSecret);
    // Remove Content-Type header to let browser set it with boundary
    delete headers['Content-Type'];
    
    const { response } = await sendRequest('PUT', url, undefined, headers);
    
    return JSON.parse(response.toString());
  }

  async deleteFile(params: DeleteFileReq): Promise<DeleteFileResp> {
    const url = requestUrl(this.endpoint, '/openapi/file/delete');
    const payload = Buffer.from(JSON.stringify(params));
    const { response } = await sendRequest('DELETE', url, payload, makeHeaders(this.clientKey, this.clientSecret));
    
    return JSON.parse(response.toString());
  }
}

/**
 * Create a new StarDots SDK instance
 */
export function createStarDots(clientKey: string, clientSecret: string, endpoint?: string): IStarDots {
  return new StarDotsImpl(clientKey, clientSecret, endpoint);
}

// Export default function for backward compatibility
export const New = createStarDots; 