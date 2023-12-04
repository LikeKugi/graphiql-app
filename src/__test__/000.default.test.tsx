import { afterEach, describe, expect, it } from 'vitest';
import { cleanup } from '@testing-library/react';

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});

describe('JSDOM should work', () => {
  afterEach(() => {
    cleanup();
  });
  it('should be on the page', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });
});
