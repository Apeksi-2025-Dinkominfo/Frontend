export default function Navbar() {
    return (
      <nav className="sticky top-0 bg-white z-50 shadow-md">
        <div className="container mx-auto flex justify-center items-center py-4">
          <div className="flex space-x-4">
            <img
              src="/sby.png"
              alt="Gambar 1"
              className="h-13 w-12"
            />
            <img
              src="/apeksi.png"
              alt="Gambar 2"
              className="h-12 w-15"
            />
          </div>
        </div>
      </nav>
    );
  }
  