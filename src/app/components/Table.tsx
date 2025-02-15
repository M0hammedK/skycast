interface Props {
  Heads: any[][];
  Data: any[][][];
}

export default function Table({ Heads, Data }: Props) {
  return (
    <table className="w-full border border-gray-300 text-left">
      <thead className="bg-gray-200">
        <tr>
          {Heads.map((head: any[]) => (
            <th key={head[0]} className="px-4 py-2 border">{head[1]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Data.map((data:any[][]) => (
          <tr key={data[0][0]} className="hover:bg-gray-100">
            {data[1].map((d:any) => (
              <td className="px-4 py-2 border-b">{d}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
