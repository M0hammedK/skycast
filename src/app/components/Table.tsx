import WeatherSchema from "@/src/models/Weather";

interface Props {
  Heads: string[];
}

export default function Table({ Heads }: Props) {
  return (
    <table className="w-full border border-gray-300 text-left">
      <tbody>
        {Heads.map((data: string) => (
          <tr key={data} className="hover:bg-gray-100">
            <td className="px-4 py-2 border-b">{data}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
