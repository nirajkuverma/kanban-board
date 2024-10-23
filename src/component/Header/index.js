import { useEffect, useState } from "react";
import filter from "../../icon/Display.svg";
import down from "../../icon/down.svg";
import style from "./header.module.css";

const Header = ({ parameter }) => {
  const [filteri, setFilter] = useState(0);
  const [value, setValue] = useState({});
  const filterData = [
    { title: "Grouping", item: ["Status", "User", "Priority"] },
    { title: "Ordering", item: ["Priority", "Title"] },
  ];

  const filterShow = ["filter_none", "filter_display"];

  useEffect(() => {
    const jsonData = {};
    filterData?.forEach((data) => {
      const storedValue = localStorage.getItem(data.title);
      jsonData[data.title] = storedValue ? storedValue : data.item[0];
    });
    setValue(jsonData);
  }, []);

  useEffect(() => {
    if (parameter && value) {
      Object.keys(value).forEach((data) => {
        localStorage.setItem(data, value?.[data]);
        if (
          typeof parameter[`set${data.substring(0, 5)}`] === "function"
        ) {
          parameter?.[`set${data.substring(0, 5)}`](value?.[data]);
        }
      });
    }
    
  }, [parameter, value]);

  const handleSelectChange = (dataTitle, selectedValue) => {
    const updatedValue = { ...value, [dataTitle]: selectedValue };
    setValue(updatedValue);
    localStorage.setItem(dataTitle, selectedValue);
    if (parameter && typeof parameter[`set${dataTitle.substring(0, 5)}`] === "function") {
      parameter[`set${dataTitle.substring(0, 5)}`](selectedValue);
    }
  };
  return (
    <div className={style.filter_bar}>
      <div
        className={style.filter_btn}
        onClick={() => (filteri === 0 ? setFilter(1) : setFilter(0))}
      >
        <img src={filter} className="filter" alt="logo" />
        <p>Display</p>
        <img src={down} className="filter" alt="logo" />
      </div>
      <div className={`${style.filter_box} ${style?.[filterShow[filteri]]}`}>
        {filterData.map((data, index) => {
          return (
            <div className={style.filter_list} key={index}>
              <p>{data.title}</p>
              <select
                onChange={(e) =>
                  handleSelectChange(data.title, e.target.value )
                }
                value={value?.[data.title]}
              >
                {data.item.map((list, i) => (
                  <option key={i}>{list}</option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
