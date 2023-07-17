import '../styles/global.scss';
import { Provider } from "react-redux";
import {wrapper} from '../store/index';
import type { AppProps } from 'next/app';
import { Player } from '@/components/Player/Player';

function MyApp({ Component, pageProps, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return <Provider store={store}>
      <Component {...pageProps} />
      <Player />
    </ Provider>
}

export default wrapper.withRedux(MyApp);