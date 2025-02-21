// app/components/icons.tsx
export function ThermometerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="-3 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="thermometer" transform="translate(-5 -2)">
        <path
          id="secondary"
          fill="#2ca9bc"
          d="M17,3H7A1,1,0,0,0,6,4V20a1,1,0,0,0,1,1H17a1,1,0,0,0,1-1V4A1,1,0,0,0,17,3ZM12,17a2,2,0,1,1,2-2A2,2,0,0,1,12,17Z"
        />
        <path
          id="primary"
          d="M12,7v6m2,2a2,2,0,1,0-2,2A2,2,0,0,0,14,15Zm4,5V4a1,1,0,0,0-1-1H7A1,1,0,0,0,6,4V20a1,1,0,0,0,1,1H17A1,1,0,0,0,18,20Z"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
