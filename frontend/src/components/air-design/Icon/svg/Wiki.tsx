export default (props: IconProps) => {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_iconCarrier">
        <path
          d="M3 8C3 5.17157 3 3.75736 3.87868 2.87868C4.75736 2 6.17157 2 9 2H15C17.8284 2 19.2426 2 20.1213 2.87868C21 3.75736 21 5.17157 21 8V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H9C6.17157 22 4.75736 22 3.87868 21.1213C3 20.2426 3 18.8284 3 16V8Z"
          stroke={props.color} strokeWidth={props.thickness}></path>
        <path d="M8 2.5V22" stroke={props.color} strokeWidth={props.thickness} strokeLinecap="round"></path>
        <path d="M2 12H4" stroke={props.color} strokeWidth={props.thickness} strokeLinecap="round"></path>
        <path d="M2 16H4" stroke={props.color} strokeWidth={props.thickness} strokeLinecap="round"></path>
        <path d="M2 8H4" stroke={props.color} strokeWidth={props.thickness} strokeLinecap="round"></path>
        <path d="M11.5 6.5H16.5" stroke={props.color} strokeWidth={props.thickness} strokeLinecap="round"></path>
        <path d="M11.5 10H16.5" stroke={props.color} strokeWidth={props.thickness} strokeLinecap="round"></path>
      </g>
    </svg>
  );
}