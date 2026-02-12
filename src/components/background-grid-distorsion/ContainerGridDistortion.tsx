import { arrayCards } from '@/utils/data';
import GridDistortion from './GridDistortion';
import { baseUrl } from '@/utils/functions';

export const ContainerGridDistortion = () => {
  return (
    <>
      {arrayCards.map(({ id, localImage, repo, title }) => (
        <article className='ContainerGridDistortion' key={id}>
          <GridDistortion
            imageSrc={baseUrl(localImage)}
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
