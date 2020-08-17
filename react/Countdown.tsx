import { useCssHandles } from "vtex.css-handles";
//import { FormattedMessage } from 'react-intl';
import React, { useState } from 'react';
import { TimeSplit } from './typings/global';
import { tick } from './utils/time';
import { useQuery } from 'react-apollo';
// @ts-ignore
import useProduct from 'vtex.product-context/useProduct'
import productReleaseDate from './queries/productReleaseDate.graphql';
interface CountdownProps {
  //title: string
  targetDate: string
};
const DEFAULT_TARGET_DATE = (new Date('2020-09-25')).toISOString();
//const CSS_HANDLES = ["container", "countdown", "title"]
const CSS_HANDLES = ['countdown'];
const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  }) => {
  const [
    timeRemaining,
     setTime
    ] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const productContext = useProduct();
  const product = productContext?.product;
  const linkText = product?.linkText;
  const { data, loading, error } = useQuery(productReleaseDate, {
    variables: {
      slug: linkText
    },
    ssr: false,
    skip: !linkText,
  });
  const handles = useCssHandles(CSS_HANDLES);
  tick(data?.product?.releaseDate || DEFAULT_TARGET_DATE, setTime);
  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  };
  if (error) {
    return (
      <div>
        <span>Error!</span>
      </div>
    );
  };
  if (!product) {
  return (
    <div>
      <span>Não há contexto de produto</span>
    </div>
  )
}
  //const titleText = title || <FormattedMessage id="countdown.title" />
  //const handles = useCssHandles(CSS_HANDLES)
  tick(data?.product?.releaseDate || DEFAULT_TARGET_DATE, setTime);
  return (
    //<div className={`${handles.countdown} t-heading-2 fw3 w-100 c-muted-1 db tc`}></div>
    //<div className={`${handles.container} t-heading-2 fw3 w-100 c-muted-1`}>
      //<div className={`${handles.title} db tc`}>
      <div className={`${handles.countdown} t-heading-2 fw3 w-100 c-muted-1 db tc`}>
        {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
      </div>
  );
};
Countdown.schema = {
  título: 'editor.countdown.title',
  descrição: 'editor.countdown.description',
  tipo: 'objeto',
  propriedades: {
    //title: {
     // title: 'I am a title',
    //  type: 'string',
     // default: null,
    //},
    targetDate: {
      title: 'Data final',
      descrição: 'Data final usada na contagem regressiva',
      type: 'string',
      default: null,
    }
  }
};


export default Countdown