import "./App.css";

export default function Card({ title, value }) {
  return (
    <div className="card text-center m-1">
      <div className="card-body">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

