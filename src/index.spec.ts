import { helloWorld } from './index';

describe('helloWorld', () => {
  it('should return "Hello, World!"', () => {
    expect(helloWorld()).toBe('Hello, World!');
  });
});
