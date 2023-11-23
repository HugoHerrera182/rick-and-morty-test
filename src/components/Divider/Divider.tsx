import type { DividerProps } from './Divider.props';
import './Divider.styles.scss';

const Divider = ({
  children,
  title
}: DividerProps) => {

  return <div className='Divider'>
    <div className='Divider__container'>
      <span className='Divider__title'>{title}</span>
    </div>
    <div className='Divider__content'>{children}</div>
  </div>
}

export default Divider;

