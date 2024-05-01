import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';

const Icon = ({ children, nonactive = false, active = false, hidden = false, size = "w-[44px] h-[44px]"}) => {
  const childrenWithClassName = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      className: `${child.props.className} h-full w-full`,
    });
  });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsHovered(active);
  }, [active]);

  const hoverHandler = () => {
    if (!active && !nonactive) {
      setIsHovered(!isHovered);
    }
  };

  const iconColor = isHovered ? '#886345' : '#BBBBBB';
  const isHidden = hidden ? 'hidden' : '';

  return (
    <IconContext.Provider value={{ color: iconColor }}>
      <span  className={`${size} ${isHidden} block`} onMouseEnter={hoverHandler} onMouseLeave={hoverHandler} >
        {childrenWithClassName}
      </span>
    </IconContext.Provider>
  );
};

export default Icon;