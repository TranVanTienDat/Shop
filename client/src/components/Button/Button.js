import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  onClick,
  large = false,
  leftIcon = false,
  outline = false,
  color = false,
  text = false,
  disabled = false,
  circle = false,
  onChange = false,
  btnSidebar = false,
  icon,
  children,
  className,
  ...passProps
}) {
  const props = {
    onClick: disabled ? null : onClick,
    ...passProps,
  };

  let Component = 'button';
  if (to) {
    props.to = to;
    Component = Link;
  } else if (href) {
    props.href = href;
    Component = 'a';
  }

  const classes = cx('wrapper', {
    [className]: className,
    leftIcon,
    btnSidebar,
    large,
    outline,
    onChange,
    color,
    text,
    circle,
    disabled,
  });

  return (
    <Component className={classes} {...props}>
      {icon && <span className={cx('icon')}>{icon}</span>}
      <span className={cx('title')}>{children}</span>
    </Component>
  );
}

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  circle: PropTypes.bool,
  large: PropTypes.bool,
  outline: PropTypes.bool,
  color: PropTypes.bool,
  text: PropTypes.bool,
  onChange: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node,
};

export default Button;
