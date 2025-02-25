// app/components/icons.tsx
export function WindIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="#000000"
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      id="wind"
      data-name="Flat Color"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-color"
    >
      <path
        id="secondary"
        d="M10,8H3A1,1,0,0,1,3,6h7a1,1,0,0,0,0-2,1,1,0,0,1,0-2,3,3,0,0,1,0,6ZM20,18a4,4,0,0,0-4-4H3a1,1,0,0,0,0,2H16a2,2,0,0,1,0,4,1,1,0,0,0,0,2A4,4,0,0,0,20,18Z"
        style={{fill: 'rgb(44, 169, 188)'}}
      ></path>
      <path
        id="primary"
        d="M10,20H3a1,1,0,0,1,0-2h7a1,1,0,0,1,0,2ZM22,7.5A4.51,4.51,0,0,0,17.5,3a1,1,0,0,0,0,2,2.5,2.5,0,0,1,0,5H3a1,1,0,0,0,0,2H17.5A4.51,4.51,0,0,0,22,7.5Z"
        style={{fill: 'rgb(0, 0, 0)'}}
      ></path>
    </svg>
  );
}
