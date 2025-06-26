<div align="center">
    <h1><img src="logo.png" alt="logo.png" title="logo.png" width="300" /></h1>
</div> 

# StarDots-SDK-TypeScript  

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  

### Introduction  
This project is used to help developers quickly access the StarDots platform and is written in TypeScript.  

### Requirement  
> Node.js version >= 16.0.0  

### Installation  
```bash  
npm install stardots-sdk-ts
```  

### Example  
```typescript 
import { createStarDots } from 'stardots-sdk-ts';

const clientKey = "Your client key";  
const clientSecret = "Your client secret";  
const stardots = createStarDots(clientKey, clientSecret);

// Get space list
const spaceList = await stardots.getSpaceList({ page: 1, pageSize: 20 });

// Create a new space
const createResult = await stardots.createSpace({ 
  space: "my-space", 
  public: true 
});

// Upload a file
const uploadResult = await stardots.uploadFile({
  space: "my-space",
  filename: "example.txt",
  fileContent: Buffer.from("Hello World!")
});
```  

### API Reference

#### Constructor
```typescript
createStarDots(clientKey: string, clientSecret: string, endpoint?: string): IStarDots
```

#### Methods
- `getSpaceList(params: SpaceListReq): Promise<SpaceListResp>` - Get space list data
- `createSpace(params: CreateSpaceReq): Promise<CreateSpaceResp>` - Create a new space
- `deleteSpace(params: DeleteSpaceReq): Promise<DeleteSpaceResp>` - Delete an existing space
- `toggleSpaceAccessibility(params: ToggleSpaceAccessibilityReq): Promise<ToggleSpaceAccessibilityResp>` - Toggle space accessibility
- `getSpaceFileList(params: SpaceFileListReq): Promise<SpaceFileListResp>` - Get space file list
- `fileAccessTicket(params: FileAccessTicketReq): Promise<FileAccessTicketResp>` - Get file access ticket
- `uploadFile(params: UploadFileReq): Promise<UploadFileResp>` - Upload file to space
- `deleteFile(params: DeleteFileReq): Promise<DeleteFileResp>` - Delete files from space

### Documentation  
[https://stardots.io/en/documentation/openapi](https://stardots.io/en/documentation/openapi)  

### Homepage  
[https://stardots.io](https://stardots.io) 