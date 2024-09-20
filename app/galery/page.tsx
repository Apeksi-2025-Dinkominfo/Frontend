const base_url = "https://satupeta.surabaya.go.id/eksternal/open-spatial/apotek"
interface Iposts{
  id : number;
  nama: string;
  alamat : string;
}


const Galery = async() => {
  const response = await fetch(base_url)
  const apotek:Iposts[] = await response.json()
  return (
    <>
      {apotek.map((apotik) => (
        <div key={apotik.id}>
          <p>id apotek      : {apotik.id}</p>
          <p>nama apotek    : {apotik.nama}</p>
          <p>alamat apotek  :{apotik.alamat}</p>
          <br />
        </div>
      ))}
    </>
  );
};

export default Galery