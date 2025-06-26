import { createStarDots } from '../src';

// Initialize the SDK
const clientKey = 'Your client key';
const clientSecret = 'Your client secret';
const stardots = createStarDots(clientKey, clientSecret);

async function main() {
  try {
    // Get space list
    console.log('Getting space list...');
    const spaceList = await stardots.getSpaceList({ page: 1, pageSize: 20 });
    console.log('Space list:', spaceList);

    // Create a new space
    console.log('Creating new space...');
    const createResult = await stardots.createSpace({
      space: 'my-demo-space',
      public: true,
    });
    console.log('Create result:', createResult);

    // Upload a file
    console.log('Uploading file...');
    const uploadResult = await stardots.uploadFile({
      space: 'my-demo-space',
      filename: 'example.txt',
      fileContent: Buffer.from('Hello World! This is a test file.'),
    });
    console.log('Upload result:', uploadResult);

    // Get file list
    console.log('Getting file list...');
    const fileList = await stardots.getSpaceFileList({
      space: 'my-demo-space',
      page: 1,
      pageSize: 10,
    });
    console.log('File list:', fileList);

    // Get file access ticket
    console.log('Getting file access ticket...');
    const ticketResult = await stardots.fileAccessTicket({
      space: 'my-demo-space',
      filename: 'example.txt',
    });
    console.log('Ticket result:', ticketResult);

    // Delete file
    console.log('Deleting file...');
    const deleteResult = await stardots.deleteFile({
      space: 'my-demo-space',
      filenameList: ['example.txt'],
    });
    console.log('Delete result:', deleteResult);

    // Delete space
    console.log('Deleting space...');
    const deleteSpaceResult = await stardots.deleteSpace({
      space: 'my-demo-space',
    });
    console.log('Delete space result:', deleteSpaceResult);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
if (require.main === module) {
  main();
} 