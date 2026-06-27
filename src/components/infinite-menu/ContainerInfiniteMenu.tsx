import { baseUrl } from '@/utils/functions';
import InfiniteMenu from './InfiniteMenu';
import { arrayCards } from '@/utils/data';

export const ContainerInfiniteMenu = () => {
  return (
    <InfiniteMenu
      items={arrayCards
        .toSorted(() => Math.random() - 0.5)
        .map(({ id, localImage, repo, title }, i) => ({
          image: baseUrl(localImage),
          title: `Project ${i + 1}`,
          link: repo,
          description: title
        }))}
    />
  );
};
