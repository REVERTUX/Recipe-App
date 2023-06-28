import { describe, expect } from 'vitest';
import { getSearchParamPage, getSearchParamSearch } from './pagination';

describe('pagination.ts', () => {
  describe('when calling getSearchParamPage function', () => {
    describe('and valid url is provided', () => {
      it('should return 4', () => {
        expect(getSearchParamPage('?page=4', 1)).toBe(4);
      });

      it('should return 2', () => {
        expect(getSearchParamPage('?count=1&page=2', 1)).toBe(2);
      });
    });

    describe('and invalid url is provided', () => {
      it('should return default value 1', () => {
        expect(getSearchParamPage('?pag=4&count=3', 1)).toBe(1);
      });

      it('should return default value 2', () => {
        expect(getSearchParamPage('', 2)).toBe(2);
      });
    });
  });

  describe('when calling getSearchParamSearch function', () => {
    describe('and valid url is provided', () => {
      it('should return pizza', () => {
        expect(getSearchParamSearch('?search=pizza', '')).toBe('pizza');
      });

      it('should return meat', () => {
        expect(getSearchParamSearch('?page=2&search=meat', '')).toBe('meat');
      });
    });

    describe('and invalid url is provided', () => {
      it('should return deafult value pizza', () => {
        expect(getSearchParamSearch('?sear=meat&page=2', 'pizza')).toBe(
          'pizza'
        );
      });

      it('should return deafult value casserole', () => {
        expect(getSearchParamSearch('', 'casserole')).toBe('casserole');
      });
    });
  });
});
