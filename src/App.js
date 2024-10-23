import backlog from "./icon/Backlog.svg";
import todo from "./icon/To-do.svg";
import progress from "./icon/in-progress.svg";
import done from "./icon/Done.svg";
import cancel from "./icon/Cancelled.svg";
import urgent from "./icon/SVG - Urgent Priority grey.svg";
import high from "./icon/Img - High Priority.svg";
import medium from "./icon/Img - Medium Priority.svg";
import low from "./icon/Img - Low Priority.svg";
import noPriority from "./icon/No-priority.svg";
import "./App.css";
import Header from "./component/Header";
import { useEffect, useState } from "react";
import Title from "./component/Title";
import Card from "./component/Card";

function App() {
  const status = [
    { icon: backlog, name: "Backlog" },
    { icon: todo, name: "Todo" },
    { icon: progress, name: "In progress" },
    { icon: done, name: "Done" },
    { icon: cancel, name: "Canceled" },
  ];
  const priority = [
    { id: 0, icon: noPriority, name: "No priority" },
    { id: 1, icon: low, name: "Low" },
    { id: 2, icon: medium, name: "Medium" },
    { id: 3, icon: high, name: "High" },
    { id: 4, icon: urgent, name: "Urgent" },
  ];



  const [ticket, setTicket] = useState({});
  const [grouping, setGrouping] = useState({});

  const fetchApi = async () => {
    await fetch(`https://api.quicksell.co/v1/internal/frontend-assignment`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTicket(json.tickets.sort((a, b) => b.priority - a.priority));
        setGrouping({ status, priority, user: json.users });
      });
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const [group, setGroup] = useState("Status");
  const [order, setOrder] = useState("Priority");


  const sortTickets = (ticketsArray, sortOrder) => {
    if (sortOrder === "Priority") {
      return ticketsArray.sort((a, b) => b.priority - a.priority);
    } else if (sortOrder === "Title") {
      return ticketsArray.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    }
    return ticketsArray; 
  };

  useEffect(() => {
    if (ticket.length > 0) {
      const sortedTickets = sortTickets([...ticket], order); 
      setTicket(sortedTickets); 
    }
  }, [order]); 

  return (
    <div className="App">
      <Header parameter={{ setGroup, setOrder }} />
      <div className="blocks">
        {grouping?.[group?.toLowerCase()]?.map((data, index) => {
          return (
            <div key={index} className="inner_blocks">
              <Title
                icon={data.icon}
                name={data.name}
                count={
                  ticket.length > 0 && ticket?.filter(
                    (d) =>
                      (group?.toLowerCase() === "status" &&
                        d?.[group?.toLowerCase()] === data.name) ||
                      (group?.toLowerCase() !== "status" &&
                        d?.[group?.toLowerCase()] === data.id) ||
                      (group?.toLowerCase() === "user" &&
                        d?.["userId"] === data.id)
                  ).length
                }
              />

              <div>
                {ticket.length > 0 && ticket
                  ?.filter(
                    (d) =>
                      (group?.toLowerCase() === "status" &&
                        d?.[group?.toLowerCase()] === data.name) ||
                      (group?.toLowerCase() === "priority" &&
                        d?.[group?.toLowerCase()] === data.id) ||
                      (group?.toLowerCase() === "user" &&
                        d?.["userId"] === data.id)
                  )
                  .map((list, i) => (
                    <Card
                      key={i}
                      detail={list}
                      type={group}
                      status={
                        grouping.status.find((p) => p.name === list.status)
                          .icon
                      }
                      priority={
                        grouping.priority.find((p) => p.id === list.priority)
                          .icon
                      }
                      user={grouping.user.find(
                        (user) => user.id === list.userId
                      )}
                    />
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
