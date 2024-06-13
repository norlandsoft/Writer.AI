export default (props: IconProps) => {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_iconCarrier">
        <circle cx="12" cy="12" r="10" stroke={props.color} strokeWidth={props.thickness}></circle>
        <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke={props.color} strokeWidth={props.thickness}
              strokeLinecap="round"></path>
      </g>
    </svg>
  );
}