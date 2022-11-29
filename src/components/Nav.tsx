import { useState, useEffect, useContext } from "react";
import { dataContext } from "../context";
import dataset from "../dataset";

const Nav = () => {
  const { columns, setColumns } = useContext(dataContext);

  const [title, setTitle] = useState(() => {
    const items = localStorage.getItem("title") || "title";
    return items;
  });
  const [desc, setDesc] = useState(() => {
    const items = localStorage.getItem("desc") || "description";
    return items;
  });

  useEffect(() => {
    localStorage.setItem("title", title);
    localStorage.setItem("desc", desc);
  }, [handleChange]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === "title") setTitle(event.target.value);
    if (event.target.name === "desc") setDesc(event.target.value);
  }

  const clearAll = () => {
    setColumns(dataset.columns);
    setTitle("title");
    setDesc("description");
  };

  return (
    <nav className=" h-32 lg:h-24 flex justify-between items-center w-full mb-10 lg:mb-5">
      <div className="flex flex-col w-full">
        <input
          name="title"
          type="text"
          //placeholder="Title"
          className="text-5xl focus:outline-none focus:shadow-none focus:border-transparent hover:bg-[lightgray] w-full lg:text-3xl"
          value={title}
          onChange={handleChange}
        />
        <input
          name="desc"
          type="text"
          //placeholder="Description"
          className="text-3xl focus:outline-none focus:shadow-none focus:border-transparent hover:bg-[lightgray] w-full lg:text-xl"
          value={desc}
          onChange={handleChange}
        />
      </div>
      <button className="text-3xl hover:text-gray-400 lg:text-2xl" onClick={clearAll}>
        Clear all
      </button>
    </nav>
  );
};

export default Nav;
