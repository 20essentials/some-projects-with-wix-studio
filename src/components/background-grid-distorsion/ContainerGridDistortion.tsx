import { arrayCards } from '@/utils/data';
import GridDistortion from './GridDistortion';
import { baseUrl } from '@/utils/functions';

export const ContainerGridDistortion = () => {
  return (
    <>
      <section className='am-container-cards'>
        {arrayCards.map(({ id, localImage, repo, title }) => (
          <a className='ContainerGridDistortion' key={id} href={repo} target='_blank'>
            <GridDistortion
              imageSrc={baseUrl(localImage)}
              grid={10}
              mouse={0.1}
              strength={0.15}
              relaxation={0.9}
              className='custom-class'
            />
          </a>
        ))}
      </section>
    </>
  );
};
