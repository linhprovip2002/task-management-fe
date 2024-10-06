import image from './sourceImages/image.png';

export const ImageIcon = ({ width = 24, height = 24, className = {} }) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
      }}
      className={`relative ${className}`}
    >
      <img
        src={image}
        alt="Icon"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};
