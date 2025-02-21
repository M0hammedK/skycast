// app/components/icons.tsx
export function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 -4.04 20.088 20.088"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="cloud" transform="translate(-1.912 -5.986)">
        <path
          id="secondary"
          fill="#2ca9bc"
          d="M17,9a4.08,4.08,0,0,0-.93.12,5,5,0,0,0-9,2.09A3,3,0,1,0,6,17H17a4,4,0,0,0,0-8Z"
        />
        <path
          id="primary"
          d="M17,9a4.08,4.08,0,0,0-.93.12,5,5,0,0,0-9,2.09A3,3,0,1,0,6,17H17a4,4,0,0,0,0-8Z"
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
