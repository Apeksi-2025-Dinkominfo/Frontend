<<<<<<< HEAD
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
=======
const base_url = "https://satupeta.surabaya.go.id/eksternal/open-spatial/apotek";

interface Iposts {
  id: number;
  nama: string;
  alamat: string;
  koordinat: number;
}

const toRadians = (degrees: number) => degrees * Math.PI / 180;

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
   const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

const Galery = async () => {
    const response = await fetch(base_url);
    const apotek: Iposts[] = await response.json();
  
    const baseLat = -7.261879839136867;
    const baseLon = 112.74996198309198;
  
    return (
      <>
        {apotek.map((apotik) => {

          const [apotekLat, apotekLon] = apotik.koordinat.toString().split(',').map(Number);

          if (isNaN(apotekLat) || isNaN(apotekLon)) {
            return <div key={apotik.id}>Invalid coordinates for apotek ID {apotik.id}</div>;
          }
  
          const distance = haversineDistance(baseLat, baseLon, apotekLat, apotekLon);
  
          return (
            <div key={apotik.id}>
              <p>id apotek          : {apotik.id}</p>
              <p>nama apotek        : {apotik.nama}</p>
              <p>alamat apotek      : {apotik.alamat}</p>
              <p>koordinat          : {apotik.koordinat}</p>
              <p>distance from base : {distance.toFixed(2)} km</p>
              <br />
            </div>
          );
        })}
      </>
    );
  };
  

export default Galery;
>>>>>>> 97c78c8350803edf568f493dd8f3da74c0a5bbdf
