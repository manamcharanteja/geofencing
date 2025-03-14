import React from 'react';

export default function useAsyncEffect(fn, deps) {
  React.useEffect(() => {
    fn();
  }, deps);
}
