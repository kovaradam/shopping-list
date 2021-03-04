import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const accelerate = 2;
const triggerLimit = 100;
const reactLimit = 10;

type Props = { onSwipeStart?: () => void; onSwipeEnd?: () => void } & (
  | {
      onSwipeLeft?: () => void;
      onSwipeRight: () => void;
    }
  | {
      onSwipeLeft: () => void;
      onSwipeRight?: () => void;
    }
);

const Swipeable: React.FC<Props> = (props) => {
  const { children } = props;
  const [{ x }, set] = useSpring(() => ({
    x: 0,
    onRest: (): void => props.onSwipeEnd && props.onSwipeEnd(),
  }));
  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx] }) => {
    if (Math.abs(mx) > reactLimit) props.onSwipeStart && props.onSwipeStart();
    if (props.onSwipeRight && mx > triggerLimit) props.onSwipeRight();
    if (props.onSwipeLeft && mx < -triggerLimit) props.onSwipeLeft();
    set({
      x: down
        ? mx *
          accelerate *
          +(
            +(props.onSwipeLeft !== undefined) * mx < 0 ||
            +(props.onSwipeRight !== undefined) * mx > 0
          )
        : 0,
    });
  });
  // Bind it to a component
  return (
    <animated.div
      {...bind()}
      style={{
        transform: x.interpolate((x) => `translate3d(${x}px, 0, 0)`),
      }}
    >
      {children}
    </animated.div>
  );
};

export default Swipeable;
