import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Button({
  to,
  style,
  href,
  onClick,
  large = false,
  leftIcon = false,
  outline = false,
  color = false,
  text = false,
  disabled = false,
  circle = false,
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
    large,
    outline,
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
  shadow: PropTypes.bool,
  small: PropTypes.bool,
  marginLeft: PropTypes.bool,
  circle: PropTypes.bool,
  large: PropTypes.bool,
  outline: PropTypes.bool,
  color: PropTypes.bool,
  danger: PropTypes.bool,
  info: PropTypes.bool,
  text: PropTypes.bool,
  success: PropTypes.bool,
  login: PropTypes.bool,
  round: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node,
};

export default Button;
