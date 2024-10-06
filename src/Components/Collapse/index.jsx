import React, { useEffect, useState } from 'react';

// const iconClass = (isCollapse, size, isHide = false) =>
//   `${isCollapse ? '' : 'rotate-180'} ${size === 'md' ? 'text-3xl' : 'text-xl'} ${isHide && 'invisible'} duration-300 `;

const TITLE_CONTAINER_PADDING = {
  md: 'px-6 py-4',
  sm: 'px-4 py-3',
};

export default function Collapse({
  title,
  children,
  bgWhite,
  value = true,
  className,
  position = 'left',
  setValue,
  onDelete,
  disabled = false,
  description,
  contentClassName,
  subTitle,
  titleContainerClassName,
  size = 'md',
  isChild = false,
  disableToggle = false,
  disableTitleClick = false,
  isHideIcon = false,
}) {
  const [isCollapse, setIsCollapse] = useState(false);

  useEffect(() => {
    setIsCollapse(value);
  }, [value]);

  // const handleOnClose = (event) => {
  //   event.stopPropagation();
  //   onDelete && onDelete();
  // };

  return (
    <div className={className}>
      <div
        className={`flex cursor-pointer items-center justify-between gap-2 leading-[26px] 
          ${TITLE_CONTAINER_PADDING[size]} 
          ${titleContainerClassName}
          ${disableToggle ? 'cursor-default' : 'cursor-pointer'}`}
        onClick={(e) => {
          if (disabled || disableToggle) {
            return;
          }
          setIsCollapse(!isCollapse);
          setValue && setValue(!isCollapse);
        }}
      >
        {position === 'left' && <div>Icon up </div>}
        <div className="flex-1 truncate text-xl font-bold" onClick={(e) => disableTitleClick && e.stopPropagation()}>
          {title}
        </div>
        {description && <p className="w-fit truncate text-[14px]">{description}</p>}
        {position === 'right' && !disabled && <div>Icon down </div>}
        {onDelete && <div>Close icon </div>}
      </div>
      {!!subTitle && <div className="flex-1 truncate px-6 pb-4 text-[18px] font-bold">{subTitle}</div>}
      <div
        className={`
          grid
          transition-all
          duration-500
          ${isCollapse ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
        `}
      >
        {isCollapse ? (
          disabled ? null : (
            <div className="flex flex-col gap-6 overflow-hidden">
              <div className={`px-6 pb-6 ${contentClassName}`}>{children}</div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
