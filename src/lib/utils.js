// @flow

/* eslint-disable import/prefer-default-export */
export const isEmptyObject = (obj: Object) => (
  Object.keys(obj).length === 0 && obj.constructor === Object
)
/* eslint-enable import/prefer-default-export */
