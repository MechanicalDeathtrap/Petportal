import { Link } from "react-router-dom";
import style from "./successful-created-project.module.sass"
import { SuccessfulCreatedProjectIcon } from "./icons/successful-created-project-icon.tsx";

export const SuccessfulCreatedProject = () =>{
  return(
    <section className={style["successful-created-project"]}>
      <div>
        <div className={style["successful-created-project__logo"]}>
          <SuccessfulCreatedProjectIcon/>
        </div >
        <h2>Ваш проект опубликован</h2>
        <p>Вы можете найти его в разделе <Link to="/account/my-projects" className={style["successful-created-project__link"]}>Мои проекты</Link></p>
      </div>
    </section>
  )
}