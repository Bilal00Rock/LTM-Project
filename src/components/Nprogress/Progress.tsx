import { useNProgress } from '@tanem/react-nprogress';
import { NContainer } from './Container.tsx';
import { Bar } from './Bar.tsx';
import { NSpinner } from './Spinner.tsx';

type Props = {
  isAnimating?: boolean;
};

export const NProgress = ({ isAnimating }: Props) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <NContainer animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
      <NSpinner />
    </NContainer>
  );
};
