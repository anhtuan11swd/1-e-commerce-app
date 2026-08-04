import { assets } from "../assets/assets";
import useShop from "../context/useShop";

const SearchBar = () => {
  const { search, setSearch, setShowSearch } = useShop();

  return (
    <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
      <div className="flex items-center gap-4 rounded-md border border-gray-300 px-4 py-2">
        <img alt="Search" className="w-4" src={assets.search_icon} />
        <input
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          type="text"
          value={search}
        />
        <img
          alt="Close"
          className="w-4 cursor-pointer"
          onClick={() => {
            setSearch("");
            setShowSearch(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearch("");
              setShowSearch(false);
            }
          }}
          src={assets.cross_icon}
        />
      </div>
    </div>
  );
};

export default SearchBar;
