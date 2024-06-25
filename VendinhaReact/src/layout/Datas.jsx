import React from "react";

function Datas(d) {
  const data = new Date(d.date);

  const day = String(data.getDate()).padStart(2, "0");
  const month = String(data.getMonth() + 1).padStart(2, "0");
  const year = data.getFullYear();

  return (
    <>
      {day}/{month}/{year}
    </>
  );
}

export default Datas;
