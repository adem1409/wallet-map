export function RingLoader({ className, ...props }) {
  return <div className={`ring-loader ${className}`} {...props}></div>;
}

export function CubeLoader({ className, ...props }) {
  return (
    <div className={`cube ${className}`} {...props}>
      <div className="cube_item cube_x"></div>
      <div className="cube_item cube_y"></div>
      <div className="cube_item cube_y"></div>
      <div className="cube_item cube_x"></div>
    </div>
  );
}
