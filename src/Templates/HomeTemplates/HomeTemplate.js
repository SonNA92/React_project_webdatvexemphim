import { Route } from "react-router";
import Header from "../../Component/Header/Header";

// template giup hien thi 1 so component o 1 trang ma chung ta muon no hien thi

//props = {component:Home,path:'/home'}
export default function HomeTemplate(props) {
  return (
    <Route path={props.path} exact render={(propsRoute) => {
        return (
          <div>
            <Header />
            <props.component {...propsRoute} />
          </div>
        );
      }}
    />
  );
}
