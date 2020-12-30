import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const Swipeable: React.FC = ({ children }) => {
  const [{ x }, set] = useSpring(() => ({ x: 0 }));
  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    // console.log(down, [mx, my]);
    set({ x: down ? mx : 0 });
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
