import { arrayCards } from '@/utils/data';
import GridDistortion from './GridDistortion';
import { baseUrl } from '@/utils/functions';

export const ContainerGridDistortion = () => {
  return (
    <>
      {arrayCards.map(() => (
        <article className='ContainerGridDistortion'>
          <GridDistortion
            imageSrc={baseUrl('/assets/wix-ia-site-chat.avif')}
            grid={10}
            mouse={0.1}
            strength={0.15}
            relaxation={0.9}
            className='custom-class'
          />
        </article>
      ))}
    </>
  );
};
