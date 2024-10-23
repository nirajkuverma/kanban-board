import style from "./card.module.css";

const Card = ({ detail, type, status, priority, user }) => {
  return (
    <div className={style.box}>
      <div>
        <p>{detail.id}</p>
        <div className={style.flex}>
          {type !== "Status" && <img src={status} alt={status} />}
          <p className={style.title}>
            {" "}
            {detail.title.length > 40
              ? detail.title.substring(0, 40) + "..."
              : detail.title}
          </p>
        </div>
        <div className={style.bottom}>
        { type !== "Priority" && <img src={priority} className={style.priority} alt={priority} />}
          {detail.tag.map((data, index) => {
            return (
              <div className={style.dis_flex}>
                <div className={style.dot}></div>
                <p>{data}</p>
              </div>
            );
          })}
        </div>
      </div>
      { type !== "User" && 
      <div>
        <div
          className={style.name}
          style={{
            background: `rgb(${parseInt(Math.random() * 255)} ${parseInt(
              Math.random() * 255
            )} ${parseInt(Math.random() * 255)})`,
          }}
        >
          {user.name.split(" ").map((data) => data[0].toUpperCase())}
        </div>
        <div className={user.available ? style.active : style.inactive}></div>
      </div>
}
    </div>
  );
};

export default Card;
