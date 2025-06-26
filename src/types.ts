/**
 * Common HTTP response body
 * All interface responses maintain a unified data structure
 */
export interface CommonResponse {
  /** Service response code. */
  code: number;
  /** Message prompt of the operation result. */
  message: string;
  /** A unique number for the request, which can be used for troubleshooting. */
  requestId: string;
  /** Indicates whether the business operation is successful. */
  success: boolean;
  /** Server millisecond timestamp. */
  ts: number;
  /** Business data field. This field can be of any data type. For specific data types, please refer to the corresponding interface. */
  data: any;
}

/**
 * Paginator request parameters
 */
export interface PaginationReq {
  /** Page number, default value is 1. */
  page?: number;
  /** The number of entries per page ranges from 1 to 100, and the default value is 20. */
  pageSize?: number;
}

/**
 * Paginator response data structure
 */
export interface PaginationResp {
  /** Page number, default value is 1. */
  page: number;
  /** The number of entries per page ranges from 1 to 100, and the default value is 20. */
  pageSize: number;
  /** The total number of entries. */
  totalCount: number;
}

/**
 * Get space list request parameters
 */
export interface SpaceListReq extends PaginationReq {}

/**
 * Get space list response data structure
 */
export interface SpaceListResp extends CommonResponse {
  data: SpaceInfo[];
}

/**
 * Space information data structure
 */
export interface SpaceInfo {
  /** The name of the space. */
  name: string;
  /** Whether the accessibility of the space is false. */
  public: boolean;
  /** The system timestamp in seconds when the space was created. The time zone is UTC+8. */
  createdAt: number;
  /** The number of files in this space. */
  fileCount: number;
}

/**
 * Create space request parameters
 */
export interface CreateSpaceReq {
  /** The name of the space. It can only be a combination of letters or numbers, and the length is 4 to 15 characters. */
  space: string;
  /** Specifies whether the space is publicly accessible. The default value is false. */
  public?: boolean;
}

/**
 * Create space response data structure
 */
export interface CreateSpaceResp extends CommonResponse {}

/**
 * Delete space request parameters
 */
export interface DeleteSpaceReq {
  /** The name of the space. It can only be a combination of letters or numbers, and the length is 4 to 15 characters. */
  space: string;
}

/**
 * Delete space response data structure
 */
export interface DeleteSpaceResp extends CommonResponse {}

/**
 * ToggleSpaceAccessibility space request parameters
 */
export interface ToggleSpaceAccessibilityReq {
  /** The name of the space. It can only be a combination of letters or numbers, and the length is 4 to 15 characters. */
  space: string;
  /** Specifies whether the space is publicly accessible. The default value is false. */
  public: boolean;
}

/**
 * ToggleSpaceAccessibility space response data structure
 */
export interface ToggleSpaceAccessibilityResp extends CommonResponse {}

/**
 * Get space file list request parameters
 */
export interface SpaceFileListReq extends PaginationReq {
  /** The name of the space. It can only be a combination of letters or numbers, and the length is 4 to 15 characters. */
  space: string;
}

/**
 * Get space file list response data structure
 */
export interface SpaceFileListResp extends CommonResponse {
  data: {
    list: FileInfo[];
  };
}

/**
 * File information data structure
 */
export interface FileInfo {
  /** The name of the file. */
  name: string;
  /** The size of the file in bytes. */
  byteSize: number;
  /** File size, formatted for readability. */
  size: string;
  /** The timestamp of the file upload in seconds. The time zone is UTC+8. */
  uploadedAt: number;
  /** The access address of the file. Note that if the accessibility of the space is private, this field value will carry the access ticket, which is valid for 20 seconds. */
  url: string;
}

/**
 * Get file access ticket request parameters
 */
export interface FileAccessTicketReq {
  /** The name of the file. */
  filename: string;
  /** The name of the space. It can only be a combination of letters or numbers, and the length is 4 to 15 characters. */
  space: string;
}

/**
 * Get file access ticket response data structure
 */
export interface FileAccessTicketResp extends CommonResponse {
  data: {
    ticket: string;
  };
}

/**
 * Upload file request parameters
 */
export interface UploadFileReq {
  /** The name of the file. */
  filename: string;
  /** The name of the space. It can only be a combination of letters or numbers, and the length is 4 to 15 characters. */
  space: string;
  /** The file bytes content */
  fileContent: Buffer | Uint8Array;
}

/**
 * Upload file response data structure
 */
export interface UploadFileResp extends CommonResponse {
  data: {
    /** The name of the space. It can only be a combination of letters or numbers, and the length is 4 to 15 characters. */
    space: string;
    /** The name of the file. */
    filename: string;
    /** The access address of the file. Note that if the accessibility of the space is private, this field value will carry the access ticket, which is valid for 20 seconds. */
    url: string;
  };
}

/**
 * Delete file request parameters
 */
export interface DeleteFileReq {
  /** The name of the space. It can only be a combination of letters or numbers, and the length is 4 to 15 characters. */
  filenameList: string[];
  /** The name of the space. It can only be a combination of letters or numbers, and the length is 4 to 15 characters. */
  space: string;
}

/**
 * Delete file response data structure
 */
export interface DeleteFileResp extends CommonResponse {} 