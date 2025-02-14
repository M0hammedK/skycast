import Table from "./components/Table";

export default function Home() {
  
  return (
    <section className="flex flex-col mt-5">
      <div>
        <h1 className="text-[1.5em]">
          welcome to our weather page
        </h1>
      </div>
      <div className="mt-8 w-full">
        <Table Heads={[[0,'name'], [1,'age'], [2,'country']]} Data={[[[0],['mohammed', 22, 'UK']],[[1],['ahmed', 25, 'USA']],[[2],['Ali', 30, 'FR']]]}/>
      </div>
    </section>
  )
}
