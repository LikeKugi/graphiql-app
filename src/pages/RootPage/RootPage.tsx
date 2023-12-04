import { JSX } from 'react';
import { Outlet } from 'react-router-dom';

const RootPage = (): JSX.Element => {
  return (
    <div>
      <header>header</header>
      <div>
        <p>content</p>
        <Outlet />
      </div>
      <footer>footer</footer>
    </div>
  );
};
export default RootPage;
