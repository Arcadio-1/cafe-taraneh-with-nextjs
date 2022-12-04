const ArrowsIcon = (props) => {
  const arrowType = props.arrowType;
  let arrowIcon;

  switch (arrowType) {
    case "up":
      arrowIcon = (
        <svg className="arrowIcon" viewBox="0 0 96 96">
          <path d="M82.6074,62.1072,52.6057,26.1052a6.2028,6.2028,0,0,0-9.2114,0L13.3926,62.1072a5.999,5.999,0,1,0,9.2114,7.6879L48,39.3246,73.396,69.7951a5.999,5.999,0,1,0,9.2114-7.6879Z" />
        </svg>
      );
      break;
    case "down":
      arrowIcon = (
        <svg className="arrowIcon" viewBox="0 0 96 96">
          <path d="M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z" />
        </svg>
      );
      break;
    case "right":
      arrowIcon = (
        <svg className="arrowIcon" viewBox="0 0 96 96">
          <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
        </svg>
      );
      break;
    case "left":
      arrowIcon = (
        <svg className="arrowIcon" viewBox="0 0 96 96">
          <path d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z" />
        </svg>
      );
      break;

    default:
      arrowIcon = (
        <svg className="arrowIcon" viewBox="0 0 96 96">
          <path d="M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z" />
        </svg>
      );
  }

  return <div className="arrowIcon">{arrowIcon}</div>;
};
export default ArrowsIcon;
