const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <span className="font-bold text-lg">StudentMS</span>
      <div>
        <button className="px-3 py-1 bg-blue-600 rounded">Profile</button>
      </div>
    </nav>
  );
};

export default Navbar;
