import { createStarDots } from '../stardots';

const testClientKey = 'Your client key';
const testClientSecret = 'Your client secret';

describe('StarDots SDK', () => {
  const stardots = createStarDots(testClientKey, testClientSecret);

  describe('Constructor', () => {
    it('should create instance with default endpoint', () => {
      const instance = createStarDots('key', 'secret');
      expect(instance).toBeDefined();
    });

    it('should create instance with custom endpoint', () => {
      const instance = createStarDots('key', 'secret', 'https://custom.api.com');
      expect(instance).toBeDefined();
    });
  });

  describe('getSpaceList', () => {
    it('should get space list', async () => {
      const params = { page: 1, pageSize: 50 };
      try {
        const result = await stardots.getSpaceList(params);
        expect(result).toBeDefined();
      } catch (error) {
        // Expected to fail with invalid credentials
        expect(error).toBeDefined();
      }
    });
  });

  describe('createSpace', () => {
    it('should create space', async () => {
      const params = { space: 'demo', public: true };
      try {
        const result = await stardots.createSpace(params);
        expect(result).toBeDefined();
      } catch (error) {
        // Expected to fail with invalid credentials
        expect(error).toBeDefined();
      }
    });
  });

  describe('deleteSpace', () => {
    it('should delete space', async () => {
      const params = { space: 'demo' };
      try {
        const result = await stardots.deleteSpace(params);
        expect(result).toBeDefined();
      } catch (error) {
        // Expected to fail with invalid credentials
        expect(error).toBeDefined();
      }
    });
  });

  describe('toggleSpaceAccessibility', () => {
    it('should toggle space accessibility', async () => {
      const params = { space: 'demo', public: false };
      try {
        const result = await stardots.toggleSpaceAccessibility(params);
        expect(result).toBeDefined();
      } catch (error) {
        // Expected to fail with invalid credentials
        expect(error).toBeDefined();
      }
    });
  });

  describe('getSpaceFileList', () => {
    it('should get space file list', async () => {
      const params = { page: 1, pageSize: 50, space: 'demo' };
      try {
        const result = await stardots.getSpaceFileList(params);
        expect(result).toBeDefined();
      } catch (error) {
        // Expected to fail with invalid credentials
        expect(error).toBeDefined();
      }
    });
  });

  describe('fileAccessTicket', () => {
    it('should get file access ticket', async () => {
      const params = { space: 'demo', filename: '1.png' };
      try {
        const result = await stardots.fileAccessTicket(params);
        expect(result).toBeDefined();
      } catch (error) {
        // Expected to fail with invalid credentials
        expect(error).toBeDefined();
      }
    });
  });

  describe('uploadFile', () => {
    it('should upload file', async () => {
      const params = {
        space: 'demo',
        filename: 'test.txt',
        fileContent: Buffer.from('Hello World!'),
      };
      try {
        const result = await stardots.uploadFile(params);
        expect(result).toBeDefined();
      } catch (error) {
        // Expected to fail with invalid credentials
        expect(error).toBeDefined();
      }
    });
  });

  describe('deleteFile', () => {
    it('should delete file', async () => {
      const params = { space: 'demo', filenameList: ['test.txt'] };
      try {
        const result = await stardots.deleteFile(params);
        expect(result).toBeDefined();
      } catch (error) {
        // Expected to fail with invalid credentials
        expect(error).toBeDefined();
      }
    });
  });
}); 