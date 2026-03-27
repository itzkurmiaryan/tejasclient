import { useEffect, useState } from "react";
import API from "../config/api";

export default function VacancyList({ reload }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API}/vacancies/all`)
      .then(res => res.json())
      .then(setData);
  }, [reload]);

  const deleteVacancy = async (id) => {
    await fetch(`${API}/vacancies/${id}`, {
      method: "DELETE"
    });
    reload();
  };

  return (
    <div className="p-6 bg-white/5 rounded-2xl">

      <h2 className="text-xl mb-4 text-orange-400">
        All Vacancies
      </h2>

      {data.map(v => (
        <div key={v._id} className="p-4 border-b border-white/10">

          <h3>{v.club}</h3>
          <p>{v.post}</p>

          <p>{v.filled}/{v.seats}</p>

          <p className={v.isActive ? "text-green-400" : "text-red-400"}>
            {v.isActive ? "Open" : "Closed"}
          </p>

          <button
            onClick={() => deleteVacancy(v._id)}
            className="bg-red-500 px-3 py-1 rounded mt-2"
          >
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}