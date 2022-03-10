import React, { lazy, Suspense } from 'react';

const LazyLoginAndRegister = lazy(() => import('./LoginAndRegister'));

const LoginAndRegister = props => (
  <Suspense fallback={null}>
    <LazyLoginAndRegister {...props} />
  </Suspense>
);

export default LoginAndRegister;
