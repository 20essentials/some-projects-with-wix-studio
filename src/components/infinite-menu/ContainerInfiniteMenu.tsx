import { baseUrl } from '@/utils/functions';
import InfiniteMenu from './InfiniteMenu';
import { arrayCards } from '@/utils/data';

export const ContainerInfiniteMenu = () => {
  return (
    <InfiniteMenu
      items={arrayCards.map(({ id, localImage, repo, title }, i) => ({
        image: baseUrl(localImage),
        title: `Project ${i + 1}`,
        link: repo,
        description: title
      }))}
    />
  );
};
