import add from "../../icon/add.svg";
import dot from "../../icon/3 dot menu.svg";
import style from "./title.module.css";

const Title = (props) => {
  return (
    <div className={style.box}>
      <div className={style.content}>
        {props.icon ? (
          <img src={props.icon} className="icon" alt={props.name} />
        ) : (
          
          <div>
        <div className={style.name} style={{background: `rgb(${parseInt(Math.random()*255)} ${parseInt(Math.random()*255)} ${parseInt(Math.random()*255)})`}}>
            {props.name.split(' ').map((data) => data[0].toUpperCase())}
        </div>
        </div>

        )}

        <b>{props.name}</b>
        <p>{props.count}</p>
      </div>
      <div className={style.content}>
        <img src={add} className="icon" alt="add" />
        <img src={dot} className="icon" alt="dot" />
      </div>
    </div>
  );
};

export default Title;
