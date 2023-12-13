import { JSX } from 'react';
import PlayGround from '@/components/PlayGround/PlayGround';

const MainPage = (): JSX.Element => {
  return (
    <div>
      <h1>Main Page</h1>
      <div>
        <div>
          <button>go</button>
          <button>pretty</button>
          <label htmlFor="uri">URI:</label>
          <input id={'uri'} type="text" />
        </div>
      </div>
      <PlayGround />
    </div>
  );
};
export default MainPage;
