const SearchByCity = ({
  city,
  setCity,
  handleSearch,
}: {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => Promise<void>;
}) => {
  return (
    <div className="container">
      {" "}
      <h1>Weather Forecast</h1>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchByCity;
